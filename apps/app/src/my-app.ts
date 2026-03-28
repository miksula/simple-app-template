import { css, html, LitElement, nothing } from "lit";
import { type RouteContext, Router } from "@packages/router";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyApp extends LitElement {
  count: number = 0;
  private router = new Router();
  private currentPath = "/";
  private currentView = html`
    <p>Loading...</p>
  `;
  private userInput = "42";
  private tabInput = "profile";
  private loading = false;

  static override styles = css`
    :host {
      display: block;
      min-height: 100svh;
      background:
        radial-gradient(circle at 10% 10%, #e0f7ff 0%, transparent 40%),
        radial-gradient(circle at 90% 20%, #ffe8c8 0%, transparent 42%),
        #f8fafc;
      color: #1f2937;
      font-family: "DM Sans", "Segoe UI", sans-serif;
    }

    main {
      max-width: 920px;
      margin: 0 auto;
      padding: 2rem 1rem 3rem;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.5rem, 3vw, 2.2rem);
      letter-spacing: -0.03em;
    }

    p {
      margin: 0.5rem 0;
      line-height: 1.5;
    }

    .panel {
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid #d4d9e1;
      border-radius: 14px;
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(3px);
      padding: 1rem;
      margin-top: 1rem;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 0.9rem;
    }

    a,
    button {
      border-radius: 999px;
      border: 1px solid #cbd5e1;
      padding: 0.45rem 0.8rem;
      background: #fff;
      color: #1f2937;
      text-decoration: none;
      font: inherit;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
    }

    a:hover,
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
    }

    .controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.7rem;
      margin-top: 0.8rem;
      align-items: end;
    }

    label {
      display: grid;
      gap: 0.4rem;
      font-size: 0.9rem;
      color: #334155;
    }

    input {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 0.45rem 0.6rem;
      font: inherit;
      background: #fff;
    }

    .route-info {
      font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
      font-size: 0.84rem;
      color: #0f172a;
      background: #eef2f7;
      padding: 0.5rem 0.65rem;
      border-radius: 8px;
      margin-top: 0.7rem;
      overflow-x: auto;
    }

    .view {
      min-height: 200px;
    }

    .loading {
      color: #7c2d12;
      background: #ffedd5;
      border: 1px solid #fdba74;
      padding: 0.5rem 0.65rem;
      border-radius: 8px;
      margin-bottom: 0.6rem;
      display: inline-block;
    }

    .counter {
      margin-top: 0.8rem;
      background: #eef6ff;
      border-color: #b6d8ff;
    }
  `;

  static override get properties() {
    return {
      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
      currentPath: { type: String },
      userInput: { type: String },
      tabInput: { type: String },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.setupRoutes();
    this.router.onRouteCheck((path: string) => {
      this.currentPath = path;
      this.requestUpdate();
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.router.check();
  }

  private setupRoutes() {
    this.router
      .add("/", () => {
        this.loading = false;
        this.currentView = html`
          <h2>Home</h2>
          <p>This Lit app uses the router package with Navigation API under the hood.</p>
          <p>Try links, buttons, params, query strings, and an async route.</p>
        `;
      })
      .add("/users/:id", (context: RouteContext) => {
        this.loading = false;
        const { id } = context.param() as { id: string };
        const { tab } = context.search() as { tab?: string };
        this.currentView = html`
          <h2>User Profile</h2>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Tab:</strong> ${tab || "overview"}</p>
          <p>
            URL params come from <code>context.param()</code> and query from <code
            >context.search()</code>.
          </p>
        `;
      })
      .add("/search", (context: RouteContext) => {
        this.loading = false;
        const { q, sort } = context.search() as { q?: string; sort?: string };
        this.currentView = html`
          <h2>Search Route</h2>
          <p><strong>Query:</strong> ${q || "(empty)"}</p>
          <p><strong>Sort:</strong> ${sort || "relevance"}</p>
        `;
      })
      .addAsync("/posts/:id", async (context: RouteContext) => {
        this.loading = true;
        const { id } = context.param() as { id: string };
        this.currentView = html`
          <p>Preparing post ${id}...</p>
        `;
        this.requestUpdate();

        await new Promise((resolve) => setTimeout(resolve, 900));

        this.loading = false;
        this.currentView = html`
          <h2>Async Post</h2>
          <p>Loaded post <strong>${id}</strong> with an artificial delay.</p>
          <p>This demonstrates <code>addAsync()</code> route handlers.</p>
        `;
      })
      .add("/*", () => {
        this.loading = false;
        this.currentView = html`
          <h2>404</h2>
          <p>Route not found. Use the navigation controls to continue.</p>
        `;
      });
  }

  private onShellClick = (event: Event) => {
    const path = (event.composedPath() as EventTarget[]).find(
      (target) => target instanceof HTMLAnchorElement,
    ) as HTMLAnchorElement | undefined;

    if (!path) {
      return;
    }

    const href = path.getAttribute("href");
    if (!href || !href.startsWith("/")) {
      return;
    }

    event.preventDefault();
    this.router.navigate(href);
  };

  private goToUser = () => {
    const id = this.userInput.trim() || "42";
    const tab = this.tabInput.trim() || "overview";
    this.router.navigate(
      `/users/${encodeURIComponent(id)}?tab=${encodeURIComponent(tab)}`,
    );
  };

  private goToSearch = () => {
    const id = this.userInput.trim() || "router";
    this.router.navigate(`/search?q=${encodeURIComponent(id)}&sort=newest`);
  };

  override render() {
    return html`
      <main @click="${this.onShellClick}">
        <h1>Router Demo</h1>

        <section class="panel">
          <p>Navigation links:</p>
          <nav>
            <a href="/">Home</a>
            <a href="/users/7?tab=activity">User 7</a>
            <a href="/search?q=lit-router&sort=top">Search</a>
            <a href="/posts/3">Async Post 3</a>
            <a href="/nope">404</a>
          </nav>

          <div class="controls">
            <label>
              User ID
              <input
                .value="${this.userInput}"
                @input="${(e: Event) => {
                  this.userInput = (e.target as HTMLInputElement).value;
                }}"
              />
            </label>
            <label>
              User Tab
              <input
                .value="${this.tabInput}"
                @input="${(e: Event) => {
                  this.tabInput = (e.target as HTMLInputElement).value;
                }}"
              />
            </label>
            <button @click="${this.goToUser}">Navigate to /users/:id</button>
            <button @click="${this.goToSearch}">Navigate to /search</button>
          </div>

          <div class="route-info">Current route: ${this.currentPath ||
            "/"}</div>
        </section>

        <section class="panel view">
          ${this.loading
            ? html`
              <div class="loading">Loading async route...</div>
            `
            : nothing} ${this.currentView}
          <button class="counter" @click="${this._onClick}" part="button">
            Local counter: ${this.count}
          </button>
        </section>
      </main>
    `;
  }

  _onClick() {
    this.count++;
  }
}

customElements.define("my-app", MyApp);

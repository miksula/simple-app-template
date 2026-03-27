export default class Router {
  get(path: string, handler: () => void) {
    if (path == "/") {
      handler();
    }
  }
}


class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }
  
  start() {
    window.addEventListener("hashchange", this.render.bind(this));
    this.render()
  }
  
  render() {
    let component = this.activeRoute();
    this.node.innerHTML = "";
    if (component !== undefined) {
      // let pEl = document.createElement("p");
      // pEl.innerHTML = routeName;
      this.node.appendChild(component.render());
    }
  }
    
  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }
}

module.exports = Router

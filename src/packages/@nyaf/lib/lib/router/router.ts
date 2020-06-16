import { DomOp } from '../dom-operations';
import { Routes } from './routes';
import { Component } from '../../types/common';
import { RouteEventTarget } from './navigate.event';

const N_ROUTER_OUTLET_SEL = '[n-router-outlet]';
const N_LINK = 'n-link';
const N_LINK_SEL = `[${N_LINK}]`;

export class Router {

  private static _routerInstance: Router;
  private static _routes: Routes;
  public onRouterAction: RouteEventTarget;

  public static get instance(): Router {
    if (!this._routerInstance) {
      this._routerInstance = new Router();
    }
    return this._routerInstance;
  }

  public registerRouter(routes: Routes) {
    Router._routes = routes;
    // find the outlets after ready
    const outlets = document.querySelectorAll(N_ROUTER_OUTLET_SEL);
    // is completely voluntery
    if (outlets) {
      // prepare router events
      this.onRouterAction = new RouteEventTarget(routes);
      // handle history
      const onNavItemClick = (pathName: string, title?: string) => {
        if (title) {
          document.title = title;
        }
        window.history.pushState({ pathName }, pathName, window.location.origin + pathName);
      };
      window.addEventListener('hashchange', (event: HashChangeEvent) => {
        // Currently we suport hash location strategy only
        if (window.location.hash === event.oldURL.substring(event.oldURL.indexOf('#'))) {
          // we're already on that path and there is no additional action required
          event.preventDefault();
          return false;
        }
        let externalhashPath = event.newURL.substring(event.newURL.indexOf('#')); // (event. as any).path[0].location.hash || event.path[0].location.pathname;
        if (externalhashPath.endsWith('/')) {
          externalhashPath = externalhashPath.slice(0, -1);
        }
        const requestedRoute = externalhashPath ? externalhashPath.replace(/^#\//, '/') : '/';
        const activatedComponent = routes[requestedRoute] ? routes[requestedRoute].component : null;
        if (activatedComponent) {
          const title = routes[requestedRoute].data?.title;
          const outletName = routes[requestedRoute].outlet;
          const outlet = outletName
            ? document.querySelector(`[n-router-outlet="${outletName}"]`)
            : document.querySelector(N_ROUTER_OUTLET_SEL);
          onNavItemClick(externalhashPath, title);
          this.setRouterOutlet(activatedComponent, externalhashPath, outlet, routes[requestedRoute].forced);
        }
      });
      // listen for any click event and check n-link attribute
      document.addEventListener('click', e => {
        let target = <HTMLElement>e.target;
        let nLink = target.getAttribute(N_LINK);
        if (!nLink) {
          // walk up the tree to find next n-link
          const parents = DomOp.getParents(target, `a${N_LINK_SEL}`);
          if (parents && parents.length === 1) {
            target = parents[0];
            nLink = target.getAttribute(N_LINK);
          }
        }
        if (nLink) {
          // handle classes globally
          document.querySelectorAll(N_LINK_SEL).forEach(linkElement => linkElement.classList.remove(linkElement.getAttribute(N_LINK)));
          if (nLink !== 'true') {
            // empty n-link has true as value, that's not a class and we don't set this
            (<HTMLElement>target).classList.add(nLink);
          }
          // expect that n-link is on an anchor tag
          const pf = (<HTMLAnchorElement>target).href.split('#');
          let requestedRoute = '';
          let needFallback = false;
          let outletName = '';
          // fallback strategy
          do {
            if (pf.length !== 2) {
              needFallback = true;
              break;
            }
            requestedRoute = pf[1];
            if (!requestedRoute) {
              needFallback = true;
              break;
            }
            if (!routes[requestedRoute]) {
              needFallback = true;
              break;
            }
            outletName = routes[requestedRoute].outlet;
            break;
          } while (true);
          // only execute if useful, here we have a valid route
          if (!needFallback || (needFallback && routes['**'])) {
            const activatedComponent = routes[requestedRoute].component;
            const forced = routes[requestedRoute].forced;
            if (!requestedRoute.startsWith('#')) {
              requestedRoute = `#${requestedRoute}`;
            }
            onNavItemClick(requestedRoute);
            const outlet = outletName
              ? document.querySelector(`[n-router-outlet="${outletName}"]`)
              : document.querySelector(N_ROUTER_OUTLET_SEL);
            this.setRouterOutlet(activatedComponent, requestedRoute, outlet, forced);
          } else {
            console.warn(
              '[NYAF] A router link call has been executed,' +
              'but requested link is not properly configured: ' +
              (<HTMLAnchorElement>e.target).href
            );
          }
        }
      });
      // set default '/': { component: DemoComponent },
      if (routes) {
        const defaultRoute = routes['/'];
        if (defaultRoute) {
          const activatedComponent = defaultRoute.component;
          // default route goes always to default outlet
          onNavItemClick('/');
          const outlet = document.querySelector(N_ROUTER_OUTLET_SEL);
          this.setRouterOutlet(activatedComponent, '/', outlet, defaultRoute.forced);
        }
      }
    }
  }

  /**
   * Invoke a programmatic navigation to the given route. Falls back to default if route not found.
   * Throws an error if no default route.
   * @param requestedRoute String value of the route's name. Same as in the `href` attribute when defining links.
   * @param outletName The target. Can be omitted, if the default (main) router outlet is being adressed or the router configuration provides static outlets.
   */
  public navigateRoute(requestedRoute: string, outletName?: string) {
    const routes: Routes = Router._routes;
    let outlet: HTMLElement;
    let activatedComponent: Component = routes[requestedRoute]?.component;
    const forced = routes[requestedRoute]?.forced || false;
    if (!activatedComponent) {
      activatedComponent = routes['/']?.component;
    }
    if (!activatedComponent) {
      throw new Error('Route not found and no default route defined');
    }
    if (!outletName) {
      outletName = routes[requestedRoute].outlet;
    }
    outlet = outletName ? document.querySelector(`[n-router-outlet="${outletName}"]`) : document.querySelector(`[n-router-outlet]`);
    if (outlet) {
      this.setRouterOutlet(activatedComponent, requestedRoute, outlet, forced);
    } else {
      throw new Error('Outlet not found or route improper configured.');
    }
  }


  private setRouterOutlet(activatedComponent: Component, requestedRoute: string, outlet: Element, forced: boolean) {
    let event = new CustomEvent('navigate', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: requestedRoute
    });
    this.onRouterAction.dispatchEvent(event);
    if (!(outlet as any)['__activatedComponent__']) {
      Object.defineProperty(outlet, '__activatedComponent__', { enumerable: false, writable: true, configurable: false, value: '' });
    }
    if (forced || (outlet as any)['__activatedComponent__'] !== activatedComponent.selector) {
      (outlet as any)['__activatedComponent__'] = activatedComponent.selector;
      outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`;
      event = new CustomEvent('navigated', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: requestedRoute
      });
      this.onRouterAction.dispatchEvent(event);
    }
  }

}

import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRouteHandles = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['reuseRoute'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRouteHandles.set(<string>route.routeConfig?.path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean  {
    return !!route.routeConfig && !!this.storedRouteHandles.get(<string>route.routeConfig.path);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return <DetachedRouteHandle>this.storedRouteHandles.get(<string>route.routeConfig?.path);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

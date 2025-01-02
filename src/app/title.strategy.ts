import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class CustomTitleStrategy extends TitleStrategy {
  private title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.makeTitle(routerState.root);
    if (title) {
      this.title.setTitle(`AngularShoppingCart - ${title}`);
    }
  }

  private makeTitle(routerState: ActivatedRouteSnapshot): string | undefined {
    if (!routerState)
      return '';

    const sub = routerState.data ? this.getResolvedTitleForRoute(routerState) : undefined;
    if (sub) {
      return `${sub}`;
    }

    return this.makeTitle(routerState.children[0]);

  }
}

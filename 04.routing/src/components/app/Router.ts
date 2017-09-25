namespace vgl.retros {
    export class RouteDef {
        constructor(public url: string, public componentName: string, public routeParams?: any) { }
    }

    export interface IRouter {
        currentRoute: KnockoutObservable<RouteDef>;
        navigateToUrl: (url: string, title?: string, data?: any) => void;
    }

    export interface IRouterUrl{
        url: string;
        componentName: string;
        default?: boolean;
        params?: any
    }

    export class Router implements IRouter {
        private routes: RouteDef[] = [];
        private defaultUrl: string;
        private hyperlinkClickHandler: (evtObj: JQueryEventObject) => boolean;

        currentRoute = ko.observable<RouteDef>(null);

        constructor(routerUrls: IRouterUrl[],
            public spaHyperlinkInterceptor: ISpaHyperlinkInterceptor = new SpaHyperlinkInterceptor(),
            public crossroadsJsAdapter: ICrossroadsjsAdapter = new CrossroadsjsAdapter(),
            public historyjsAdapter: IHistoryjsAdapter = new HistoryjsAdapter()) {
                
            this.initialiseRoutes(routerUrls);
            this.activateThirdPartyLibraryHooks();
            this.loadComponentForCurrentDocumentLocation();
        }

        navigateToUrl = (url: string, title?: string, data?: any) => {
            this.historyjsAdapter.navigateToUrl(url, title || url, data);
        }

        dispose() {
            this.spaHyperlinkInterceptor.deactivateHyperlinksHandling(this.hyperlinkClickHandler);
        }

        private loadComponentForCurrentDocumentLocation() {
            this.crossroadsJsAdapter.parseCurrentUrl();
        }

        private initialiseRoutes(routerUrls: IRouterUrl[]) {
            _.forEach(routerUrls, (routerUrl) => {
                this.routes.push(new RouteDef(routerUrl.url, routerUrl.componentName, routerUrl.params));
                if(!this.defaultUrl && routerUrl.default && routerUrl.default === true) {
                    this.defaultUrl = routerUrl.url;
                }
            });
        }

        private activateThirdPartyLibraryHooks() {
            this.crossroadsJsAdapter.activateCrossroads(this.routes, this.onRouteMatched, this.onNoRouteMatched);
            this.historyjsAdapter.activateHistoryJs(this.onHistoryStateChanged, this.onHistoryPopState);
            this.hyperlinkClickHandler = this.spaHyperlinkInterceptor.createHyperlinkHandler(this.defaultUrl, this.navigateToUrl);
            this.spaHyperlinkInterceptor.activateHyperlinksHandling(this.hyperlinkClickHandler);
        }
        
        private onNoRouteMatched = () => {
            console.log("no route matched");
            this.navigateToUrl(this.defaultUrl);
        }

        private onRouteMatched = (routeDef: RouteDef) => {
            this.currentRoute(new RouteDef(routeDef.url, routeDef.componentName, routeDef.routeParams))
        }

        private onHistoryStateChanged = () => {
            this.crossroadsJsAdapter.parseCurrentUrl();
        }

        private onHistoryPopState = () => {
            this.crossroadsJsAdapter.parseCurrentUrl();
        }
    }
}
namespace vgl.retros {
    export interface IAppRouteParams {
        hub: SignalR.Hub.Proxy;
        router: IAppRouter;
        retroId?: string;
        query: any;
    }

    export class App {
        constructor(
            public hub: SignalR.Hub.Proxy,
            public appRouter: AppRouter = new AppRouter()
        ){}

        routeParams = ko.pureComputed<IAppRouteParams>(() => {

            let paramsFromRouter = this.appRouter.router.currentRoute().routeParams;

            let params: IAppRouteParams = {
                hub: this.hub,
                router: this.appRouter,
                query: {} // will get set by value from paramsFromRouter
            };

            $.extend(params, paramsFromRouter);

            return params;
        });
    }
}
namespace vgl.retros {
    export class AppUrls {
        static spaUrl = "/";
        static retroBaseUrl = "/retro";
        static retroUrl = `${AppUrls.retroBaseUrl}/:retroId:/`;
    }

    export interface IAppRouter {
        router: vgl.retros.IRouter;
        navigateToRetro: (retorId: string, retroName: string) => void;
    }

    export class AppRouter implements IAppRouter {
        router: vgl.retros.IRouter;

        constructor(router?: vgl.retros.IRouter) {
            this.router = router || new vgl.retros.Router(this.getRouterUrls());
        }

        private getRouterUrls(): vgl.retros.IRouterUrl[] {
            return [
                { url: AppUrls.spaUrl,      componentName: retrosVmComponentConfig.componentName, default: true },
                { url: AppUrls.retroUrl,    componentName: retroVmComponentConfig.componentName }
            ];
        }

        navigateToRetro(retroId: string, retroName: string) {
            this.router.navigateToUrl(`${AppUrls.retroBaseUrl}/${retroId}?retroName=${encodeURIComponent(retroName)}`);
        }
    }
}
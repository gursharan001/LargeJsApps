namespace vgl.retros {
    export let Historyjs: Historyjs = <any>History; // refer comment at top of Historyjs typings file
    
    export interface IHistoryjsAdapter{
        activateHistoryJs: (onStateChange: () => void, onPopState: () => void) => void;
        navigateToUrl: (url: string, title?: string, data?: any) => void;
    }

    export class HistoryjsAdapter implements IHistoryjsAdapter {
        activateHistoryJs(onStateChange: () => void, onPopState: () => void){
            Historyjs.Adapter.bind(window, "statechange", onStateChange);
            Historyjs.Adapter.bind(window, "popstate", onPopState);
        }

        navigateToUrl(url: string, title?: string, data?: any){
            Historyjs.pushState(data, title, url);
        }
    }
}
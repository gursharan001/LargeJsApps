namespace vgl.retros {
    export interface ISpaHyperlinkInterceptor {
        activateHyperlinksHandling: (handler: (eventObject: JQueryEventObject) => boolean) => void;
        deactivateHyperlinksHandling: (handler: (eventObject: JQueryEventObject) => boolean) => void;
        createHyperlinkHandler: (spaUrl: string, navigateToUrl: (url: string, title?: string, data?: any) => void) => ((eventObject: JQueryEventObject) => boolean);
    }
    export class SpaHyperlinkInterceptor implements ISpaHyperlinkInterceptor{

        activateHyperlinksHandling(handler: (eventObject: JQueryEventObject) => boolean) {
            $("body").on("click", "a", handler);
        }

        deactivateHyperlinksHandling(handler: (eventObject: JQueryEventObject) => boolean) {
            $("body").off("click", "a", handler);
        }

        createHyperlinkHandler = (spaUrl: string, navigateToUrl: (url: string, title?: string, data?: any) => void) => {
            return function(evtObj: JQueryEventObject) :boolean  {
                let urlPath = $(this).attr("href");
                if (!urlPath) return true;
                if (urlPath.substring(0, 1) == "#") {
                    return true;
                }
                if (urlPath.indexOf(spaUrl) === -1) {
                    return true;
                }
                evtObj.preventDefault();
                let title = $(this).text();
                navigateToUrl(urlPath, title, null);
                return false;
            }
        }
    }
}
namespace vgl.retros {
    export interface ICrossroadsjsAdapter {
        activateCrossroads : (routeDefs: RouteDef[], onRouteMatched: (routeDef: RouteDef) => void, onNoRouteMatched: () => void) => void;
        parseCurrentUrl : () => void;
    }

    export class CrossroadsjsAdapter implements ICrossroadsjsAdapter {
        constructor(public pal: IPal = new Pal()){}
        
        activateCrossroads(routeDefs: RouteDef[], onRouteMatched: (routeDef: RouteDef) => void, onNoRouteMatched: () => void){
            crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

            _.forEach(routeDefs, (routeDef) => {
                let r = crossroads.addRoute(`${routeDef.url}:?query:`);
                r.matched.add((params: any) => {
                    if (params.hasOwnProperty("?query")) {
                        params.query = params["?query"];
                        delete params["?query"];
                    }
                    onRouteMatched(new RouteDef(routeDef.url, routeDef.componentName, _.extend(params, routeDef.routeParams)))
                });
            });

            crossroads.bypassed.add(onNoRouteMatched);
        }

        parseCurrentUrl(){
            let location = this.pal.location();
            crossroads.parse(location.pathname + location.search)
        }
    }
}
namespace vgl.retros {
    export interface IPal {
        fetch(input: RequestInfo, init? :RequestInit):Promise<Response>;
    }
    export class Pal implements IPal {
        fetch(input: RequestInfo, init? :RequestInit){
            return window.fetch(input, init);
        }
    }
}
namespace vgl.retros {
    export class pal {
        fetch(input: RequestInfo, init? :RequestInit){
            return window.fetch(input, init);
        }
    }
}
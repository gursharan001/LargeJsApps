namespace vgl.retros {
    export class RetroInfoDto {
        constructor(public id: string, public name: string){}
    }

    export class RetrospectiveService {
        servicebase = "http://localhost:54187";

        getRetros() : JQueryPromise<RetroInfoDto[]>{
            return $.getJSON(`${this.servicebase}/retros`);
        }        
    }
}
namespace vgl.retros {
    export class RetroInfoDto {
        constructor(public id: string, public name: string){}
    }

    export class RetrospectiveService {
        servicebase = "http://localhost:54187";
        constructor(public pal = new vgl.retros.pal()){}

        getRetros() : Promise<RetroInfoDto[]>{
            return this.pal.fetch(`${this.servicebase}/retros`)
                .then(this.checkStatus)
                .then(this.parseJSON);
        }
        
        checkStatus = (response: Response) => {
            if (response.status >= 200 && response.status < 300) {
              return response;
            } else {
              var error = new Error(response.statusText);
              (<any>error).response = response;
              throw error;
            }
        }

        parseJSON = (response: Response) => {
            return response.json();
        }
    }
}
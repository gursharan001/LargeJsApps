namespace vgl.retros {

    export class RetrosVm {
        retros = ko.observableArray<RetroInfoDto>([]);
        constructor(public retrospectiveService: RetrospectiveService = new vgl.retros.RetrospectiveService()){
            this.retrospectiveService.getRetros()
                .then(dtos => {
                    this.retros(dtos);
                });
        }
    }
}
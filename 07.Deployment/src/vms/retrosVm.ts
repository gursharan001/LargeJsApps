namespace vgl.retros {

    export class retrosVm {
        retros = ko.observableArray<RetroInfoDto>([]);
        constructor(public retrospectiveService: RetrospectiveService = new vgl.retros.RetrospectiveService()){
            this.retrospectiveService.getRetros()
                .then(dtos => {
                    this.retros(dtos);
                });
        }
    }
}
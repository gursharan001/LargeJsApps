namespace vgl.retros {

    export class RetrosVm {
        retros = ko.observableArray<RetroInfoDto>([]);
        retroName = ko.observable<string>();

        constructor(
            public appRouter: IAppRouter,
            public retrospectiveService: RetrospectiveService = new vgl.retros.RetrospectiveService()){
            this.retrospectiveService.getRetros()
                .then(dtos => {
                    this.retros(dtos);
                });
        }

        canAddRetro = ko.pureComputed(() => {
            return this.retroName() !== null && this.retroName() !== undefined && this.retroName() != ""
        });

        addRetro = () => {
            this.retrospectiveService.addRetro(this.retroName())
                .then(retroId => {
                    this.retros.push(new RetroInfoDto(retroId, this.retroName()));
                    this.retroName(undefined);
                });
        }

        deleteRetro = (retroToDelete: RetroInfoDto) => {
            this.retrospectiveService.deleteRetro(retroToDelete.id, retroToDelete.name)
                .then(() => {
                    this.retros.remove(retroToDelete);
                })
        }

        editRetro = (retroToEdit: RetroInfoDto) => {
            this.appRouter.navigateToRetro(retroToEdit.id, retroToEdit.name);
        }
    }
}
namespace vgl.retros {
    export let retroVmComponentConfig: KnockoutComponentTypes.Config = {
        viewModel: (params: IAppRouteParams) => new RetroVm(params.retroId, params.query["retroName"], new RetrospectiveService()),
        template: retrosComponentTemplates.retroVm,
        componentName: "retro"
    }

    ko.components.register(retroVmComponentConfig.componentName, retroVmComponentConfig);
}
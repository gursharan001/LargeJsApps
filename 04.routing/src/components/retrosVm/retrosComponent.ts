namespace vgl.retros {
    export let retrosVmComponentConfig: KnockoutComponentTypes.Config = {
        viewModel: (params: IAppRouteParams) => new RetrosVm(params.router),
        template: retrosComponentTemplates.retrosVm,
        componentName: "retros"
    }

    ko.components.register(retrosVmComponentConfig.componentName, retrosVmComponentConfig);
}
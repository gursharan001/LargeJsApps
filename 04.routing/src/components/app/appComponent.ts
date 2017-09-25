namespace vgl.retros {
    export let appComponentConfig: KnockoutComponentTypes.Config = {
        viewModel: (params: any) => new App(params.hub),
        template: retrosComponentTemplates.appVm,
        componentName: 'app'
    }

    ko.components.register(appComponentConfig.componentName, appComponentConfig);
}
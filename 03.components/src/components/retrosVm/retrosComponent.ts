namespace vgl.retros {
    export let retrosVmComponentConfig: KnockoutComponentTypes.Config = {
        viewModel: () => new RetrosVm(),
        template: retrosComponentTemplates.retrosVm,
        componentName: "retros"
    }

    ko.components.register(retrosVmComponentConfig.componentName, retrosVmComponentConfig);
}
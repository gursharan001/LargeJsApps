var retrosComponentTemplates={"appVm":"<div> <!-- <div data-bind='component: {name: \"ad-hoc-quote-navbar\", params: routeParams()}'></div> --> <div id=\"page\" data-bind=\"component: { name: appRouter.router.currentRoute().componentName, params: routeParams() }\"> </div> </div>","retroVm":"<div> <div class=\"row\"> <div class=\"col m12\"> <div class=\"card-panel teal lighten-2\"> <span data-bind=\"text: retroName\"></span> </div> </div> </div> <div class=\"row\"> <div class=\"col m4\"> <div align=\"center\"><b>What went well</b></div> <div class=\"row\"> <div class=\"input-field col s9\"> <input type=\"text\" data-bind=\"textInput: wentWell\"> </div> <div class=\"input-field col s3\"> <a href=\"#\" data-bind=\"click: addWentWellComment\">Add</a> </div> </div> <!-- ko foreach: whatWentWell--> <div class=\"row\"> <div class=\"col s9\"> <span data-bind=\"text: comment\"></span> </div> <div class=\"col s3\"> <a href=\"#\" data-bind=\"click: $parent.removeWentWellComment\">Delete</a> </div> </div> <!-- /ko --> </div> <div class=\"col m4\"> <div align=\"center\"><b>What did not go well</b></div> <div class=\"row\"> <div class=\"input-field col s9\"> <input type=\"text\" data-bind=\"textInput: didNotGoWell\"> </div> <div class=\"input-field col s3\"> <a href=\"#\" data-bind=\"click: addDidNotGoWellComment\">Add</a> </div> </div> <!-- ko foreach: whatDidNotGoWell--> <div class=\"row\"> <div class=\"col s9\"> <span data-bind=\"text: comment\"></span> </div> <div class=\"col s3\"> <a href=\"#\" data-bind=\"click: $parent.removeDidNotGoWellComment\">Delete</a> </div> </div> <!-- /ko --> </div> <div class=\"col m4\"> <div align=\"center\"><b>Suggested Improvements</b></div> <div class=\"row\"> <div class=\"input-field col s9\"> <input type=\"text\" data-bind=\"textInput: suggestedImprovement\"> </div> <div class=\"input-field col s3\"> <a href=\"#\" data-bind=\"click: addSuggestedImprovementComment\">Add</a> </div> </div> <!-- ko foreach: suggestedImprovements--> <div class=\"row\"> <div class=\"col s9\"> <span data-bind=\"text: comment\"></span> </div> <div class=\"col s3\"> <a href=\"#\" data-bind=\"click: $parent.removeSuggestedImprovementComment\">Delete</a> </div> </div> <!-- /ko --> </div> </div> </div>","retrosVm":"<div> <div class=\"row\"></div> <div class=\"row\"> <form class=\"col s12\" data-bind=\"submit: addRetro\"> <div class=\"row\"> <div class=\"input-field col s6\"> <input type=\"text\" data-bind=\"textInput: retroName\" id=\"retroName\" placeholder=\"Retrospective Name\"> </div> <div class=\"col s6\"> <button class=\"btn waves-effect waves-light\" type=\"submit\" data-bind=\"enable: canAddRetro\">Create</a> </div> </div> </form> </div> <table class=\"bordered striped highlight\"> <thead> <tr> <th>Retrospective Id</th> <th>Retrospective Name</th> <th></th> </tr> </thead> <tbody> <!-- ko foreach: retros--> <tr> <td><span data-bind=\"text: $data.id\"></span></td> <td><a data-bind=\"text: $data.name, attr: {href: $parent.getEditRetroUrl($data)}\" href=\"#\"></a></td> <td><a data-bind=\"click: $parent.deleteRetro\" href=\"#\">Delete</a></td> </tr> <!-- /ko --> </tbody> </table> </div>"}
export default /*@ngInject*/ function (
    editableOptions,
    formlyConfig,
    formlyValidationMessages,
) {
  editableOptions.theme = "bs3";
  formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = "form.$submitted || fc.$touched";
  formlyValidationMessages.addStringMessage("required", "This field is required");
  formlyValidationMessages.addStringMessage("color", "This is not a valid colour");
  formlyValidationMessages.addStringMessage("url", "This is not a valid URL");

  formlyConfig.setWrapper({
    name: "horizontalBootstrapLabel",
    template: [
      '<label for="{{::id}}" class="col-sm-3 control-label">',
      '{{to.label}} {{!to.required ? "(optional)" : ""}}',
      "</label>",
      '<div class="col-sm-9">',
      "<formly-transclude></formly-transclude>",
      "</div>",
    ].join(" "),
  });

  formlyConfig.setWrapper({
    name: "horizontalBootstrapCheckbox",
    template: [
      '<div class="col-sm-offset-3 col-sm-9">',
      "<formly-transclude></formly-transclude>",
      "</div>",
    ].join(" "),
  });
  formlyConfig.setWrapper({
    name: "fullHorizontalBootstrapCheckbox",
    template: [
      '<div class="col-sm-12">',
      "<formly-transclude></formly-transclude>",
      "</div>",
    ].join(" "),
  });

  formlyConfig.setType({
    name: "horizontalInput",
    extends: "input",
    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"],
  });
  formlyConfig.setType({
    name: "horizontalTextarea",
    extends: "textarea",
    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"],
  });
  formlyConfig.setType({
    name: "horizontalSelect",
    extends: "select",
    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"],
  });

  formlyConfig.setType({
    name: "colorpicker",
    template: require("./common/forms/form-colorpicker.html"),
    extends: "input",
    wrapper: ["bootstrapLabel", "bootstrapHasError"],
  });
  formlyConfig.setType({
    name: "horizontalColorpicker",
    extends: "colorpicker",
    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"],
  });

  formlyConfig.setType({
    name: "horizontalCheckbox",
    extends: "checkbox",
    wrapper: ["horizontalBootstrapCheckbox", "bootstrapHasError"],
  });
  formlyConfig.setType({
    name: "fullHorizontalCheckbox",
    extends: "checkbox",
    wrapper: ["fullHorizontalBootstrapCheckbox", "bootstrapHasError"],
  });

  formlyConfig.setType({
    name: "upload",
    template: require("./common/forms/form-upload.html"),
    extends: "input",
    wrapper: ["bootstrapLabel", "bootstrapHasError"],
  });
  formlyConfig.setType({
    name: "horizontalUpload",
    extends: "upload",
    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"],
  });
}

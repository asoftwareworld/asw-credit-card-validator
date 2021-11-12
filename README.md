# ASW Credit Card Validator

[![npm version](https://badge.fury.io/js/%40asoftwareworld%2Fform-builder.svg)](https://www.npmjs.com/package/@asoftwareworld/form-builder)
[![Build status](https://circleci.com/gh/asoftwareworld/ASW-Form-Builder.svg?style=svg)](https://circleci.com/gh/asoftwareworld/ASW-Form-Builder)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/asoftwareworld/ASW-Form-Builder/blob/master/LICENSE)

`ASW Credit Card Validator` helps you with rapid development and designed web forms which includes several controls. The key feature of `Form Builder` is to make your content attractive and effective. We can customize our control at run time and preview the same before final submission.

`Form Builder` is compatible with the latest version of Angular and Angular Material. Only a few clicks can create an attractive web form and provide a JSON Schema to render all controls.

## [Live Demo](https://asoftwareworld.github.io/ASW-Form-Builder/#/)

## Installation
Below are some prerequisites before install `Form Builder`.

### Step 1: Install Angular Material
Install `Angular Material` by running the following command:

```html
ng add @angular/material
```

### Step 2: Install ASW Credit Card Validator
Install `Form Builder` to set up in the project by running the following command:
```html
npm install @asoftwareworld/form-builder
```

### Step 3: Import the component modules
Import the NgModule for each component you want to use:

```
import { FormBuilderModule, PreviewTemplateModule } from '@asoftwareworld/form-builder';
// ...

@NgModule({
  imports: [
    // shown passing global defaults (optional)
    FormBuilderModule,
    PreviewTemplateModule
    ...
  ]
  // ...
})
export class AppModule {}
```

## Add a selector to HTML
In your template, use the component selector:
```
<asw-form-builder (publishClick)="saveJsonData($event)"
                  (previewClick)="previewTemplate($event)"></asw-form-builder>
```
Preview Template, use the component selector in your HTML page:
```
<asw-preview-template [formContainer]="jsonData"></asw-preview-template>
```

Define in your component to get published event :

```
export class AppComponent {
  title = 'ASW Form Builder Demo';
  jsonData:any[]=[];
  
  // Publish Template
  saveJsonData(data: any){
    //.... 
    console.log(data);
    // do something
  }
  
  //Preview Template
  previewTemplate(data: any){
    this.jsonData = data;
  }
}
```
## Theme
Angular Material [more information](https://material.angular.io/components/categories) 
and Bootstrap [more information](https://getbootstrap.com/docs/4.0/getting-started/theming/)

## List of Controls available
| controls        | description                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Card            | Headings are defined with the `<h1> to <h6>` tags. Used as a title of the post, template and resume, etc.       |
| Card CVV        | The autocomplete is a normal text input enhanced by a panel of suggested relevant options as the user types.    |
| Card Date       | Enable native inputs to be used within a form field. The styles such as the underline, floating label.          |

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | 
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | 
| Latest ✔                                                                                 | Latest ✔                                                                                    | Latest ✔                                                                                 | Latest ✔                                                                              | Latest ✔                                                                                                                                                                                                    |
## [Report a bug](https://github.com/asoftwareworld/ASW-Form-Builder/issues)
We use GitHub Issues as the official bug tracker for the ASW Credit Card Validator. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the ASW Form Builder.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions
If you have questions or need help please email `asoftwareworld@gmail.com`

## License
[MIT](https://github.com/asoftwareworld/ASW-Form-Builder/blob/master/LICENSE)

## Social Media

Twitter: <https://twitter.com/asoftwareworld>

LinkedIn: <https://in.linkedin.com/company/asoftwareworld>

Facebook: <https://www.facebook.com/asoftwaresworld>

## Donate
<a href="https://paypal.me/asoftwareworld?locale.x=en_GB"><img src="blue.svg" height="40"></a>  
If you found value in `ASW Credit Card Validator` or a contributor helped you out of a jam, consider becoming a contributor yourself.

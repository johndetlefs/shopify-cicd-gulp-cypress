# Shopify CI/CD - Themekit, Gulp, Sass, ES6+, & Cypress

Author: John Detlefs

Website: [Johnny's School of Shopify Development](https://johnnysdevschool.com.au)

Version: 1.0.0

## Introduction

_Shopify - CI/CD_ is designed to be as close to a true CI/CD solution as is possible for a SAAS platform such as Shopify. It uses Themekit, Gulp, Sass, Javascript (ES6+), Babel, & Cypress.io for testing.

For a complete explainer video on how to use this repo please visit Johnny's School of Shopify Development's explainer video - [How To Set Up Your Shopify CI/CD Pipeline](https://johnnysdevschool.com.au/how-to-set-up-shopify-ci-cd-pipeline)

## Installation & Workflow

Clone this repo into your project root:

`git clone https://thisrepo.com`

Next, install all required npm packages:

`npm install`

Install Gulp globally:

`npm i -g gulp`

Install Themekit:

Instructions for installing Shopify's themekit can be found [here](https://shopify.dev/tools/theme-kit/getting-started).

A sample `config.example.yml` file has been provided - this should be modified with correct details and renamed to `config.yml`

**Note** - _Config files should never be commited to your repo - ensure all such config files have been added to `.gitignore`_

### Working with a new theme

All the files you need to get started have been included - as a bonus Bootstrap 4 has been imported into the Sass & JS files. Feel free to run with this, or remove as required (jQuery is also included as a requirement for Bootstrap 4)

For themekit to work you'll need to complete your `config.yml` details:

- first delete `themeid` from your `config.yml` file
- update the rest of the parameters in the `config.yml` file

Use themekit to create a new theme in your Shopify instance:

`theme new -n="My New Theme Name" --dir=shop`

You'll notice the files - `application.css.liquid` & `application.js` get added to the `assets` directory - these can be deleted.

Now you should be able to start working on your theme:
`npm run dev`

All changes will automatically be picked up by Gulp to be linted, concatenated, compiled, & minified, after which changes will be sent through to Shopify using Themekit - it's all automagic!

(Auto-browser-refesh isn't active yet, so you'll need to refresh your browser upon saving of files to see your changes)

### Modifying an already existing theme

Working with an already existing theme will require some modifications to your theme files, but overall the process is largely the same.

First, go into the `shop` directory and remove all folders _except_ for the `dev` directory.

To allow themekit to do it's job you'll need to complete your `config.yml` using the details from your Shopify store.

Next, use Themekit to download the correct theme for modification:
`theme get --dir=shop`

Lastly, you'll want to add the following code to `layout/theme.liquid` just before the `<\head>` tag

```liquid
{{ 'theme.min.css?c=12345' | asset_url | stylesheet_tag }}
{{ 'theme.min.js?c=12345' | asset_url | script_tag }}
```

Check to make sure you're not doubling up css & js files, and if you are, quickest and easiest is to rename the already existing files. If you prefer, you can modify the destination files in the `gulpfile.js` - just make sure to also modify the inclusion code above.

By default, the `assets` folder has been added to `.gitignore` - if you want to keep the whole theme in your repo, you'll need to remove this. Just be aware committing minified files to your repo can easily cause quite exciting merge conflicts (as in "cost me a day FML!! - type conflicts).

If Bootstrap causes issues, just remove the bootstrap import from the `theme.scss` file, as well as the bootstrap javascript directory from the `jsFiles` variable in `gulpfile.js`. If you're not using jQuery for anything other than Bootstrap, you might want to also remove the jQuery file path.

Due to the many many different ways themes can be built and developed, you may need to make further changes in order to make things work smoothly.

### Testing & Cypress.io

Due to the limitations of Shopify's "local development" experience, it's very difficult to do truly local unit testing - instead we use Cypress to run testing as required.

First, add both the shop url and theme id to your `cypress.json` file.

Then, to run testing at any time:
`npm run test`

Some basic demonstration tests have been included in the provided themefiles which can be built out or replaced. It is recommended you stick with the best-practice usage of `data-cy-yourelement` tags for testing.

More detailed instructions on Cypress and creating tests can be found [here](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)

### CI/CD Pipelines

These are still being built out, but the intention is to include Gitlab CI, Bitbucket Pipelines, & Github Actions allowing for automatic running of testing prior to allowing the merging of a pull request (PR).

### What is this, and how does it all work?

_Shopify - CI/CD_ is designed to be as close to a true CI/CD solution as is possible for a SAAS platform such as Shopify. It uses Themekit, Gulp, Sass, Javascript (ES6+), Babel, & Cypress for testing.

The "local" host is controlled by Shopify's [Theme Kit](https://shopify.github.io/themekit/ "Shopify Theme Kit GitHub page"), which acts as the middleware between your local setup and the Shopify servers. [Gulp.js](http://gulpjs.com/ "Gulp.js website") is used as the taskrunner for the linting & processing of [Sass](http://sass-lang.com/ "SASS website") & Javascript files.

The theme files sit in the `shop` directory, with developer specific files that need to be processes or moved living in the `dev` subdirectory.

Thanks to the magic of Gulp and associated plugins, you can use all modern Sass & Javascript (ES6+), which when modified will be linted, processed, minified, & then deposited in the `assets` folder. Cache busting has been included to ensure your changes can be seen while previewing your work.

Shopify requires a "flat" `assets` directory which can create a messy development experience, so inside the `dev` directory you will find `fonts` & `images` folders - upon modification all files in these folders will be copied over to the `assets` folder - Shopify is happy, and you get a cleaner organisational structure for your assets.

Unit & regression testing is handled by [Cypress.io](https://cypress.io "Cypress Testing Framework"), which can be run manually as well as automatically using the various CI/CD piplelines supplied (BitBucket Pipelines, Gitlab CI, and Github Actions) - **_NB: This is a work in progress!_**

### Credits

This setup has been inspired by the requirements of my development team while working on major enterprise client Shopify websites.

The creation has been built off the back of several great resources which have been mixed together, modified, and added to, in order to create what I hope to eventually be a comprehensive Shopify CI/CD experience, available to all. 🙂

- Jase Warner's "Shopify + Gulp" - [Git Repo](https://github.com/jasewarner/gulp-shopify) - [Personal Website](https://jase.io)
- Pixelcabin's "Building Integration Tests for Shopify Themes" - [Git Repo](https://github.com/pixelcabin/shopify_theme_integration_tests) - [Company Website](https://pixelcabin.io) - [Shopify Unite Video (Youtube)](http://bit.ly/pixelcabin-unite-gh)

### Technologies used

- [Cypress Testing Framework](https://cypress.io)
- [Gulp.js](http://gulpjs.com/ "Gulp.js website")
- [Theme Kit](https://shopify.github.io/themekit/ "Shopify Theme Kit GitHub page")
- [SASS / SCSS](http://sass-lang.com/ "SASS website")

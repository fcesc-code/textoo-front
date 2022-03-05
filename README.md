# TEXTOO

## Purpose

Textoo is a web application for teaching and learning languages. It is based on well established activities focused on language and aims to give them new
momentum by making dynamic activities for groups or individuals that can be both fun and educational. A specific focus is given to learning metrics and other
features that highlight focus the activity towards education rather than pure passtime gamification.

Although this code is public, it is subject to [creative commons license](https://github.com/fcesc-code/pre/blob/main/LICENSE.md). The project is also open for
contributions from July 2022.

This application is developed as the final project for the
[Web apps and sites development Master](https://estudis.uoc.edu/ca/masters-universitaris/desenvolupament-llocs-aplicacions-web/presentacio)
by [Universitat Oberta de Catalunya](http://uoc.edu). \

## Public web

The app can be accessed via following links:
_links to site_

## Public respository

A Git repository for the frontend can be found at [textoo](https://github.com/fcesc-code/textoo-front.git). The backend counterpart can be found at
[textoo](https://github.com/fcesc-code/textoo-back.git).
_deploy status badge_

## How to use this code

Download or clone the repository. Then, install the dependencies using `npm install`. To start the app in development mode run `npm run dev` and open your browser on
[localhost](http://localhost:4200). For further commands, see the commands section below.

Content lives inside the `src/` folder. If you do not want to change the configuration or are unsure about what you are doing, do not edit files outside the `src/` folder.

Always run the following commands during the development stage and for production builds. Please note that it is expected that all projects built with this boilerplate are compiled using `npm run build` before they are published.

### Commands

Main commands:
| Command | Description |
| --- | --- |
| `npm run dev` | Runs a local web server for development and opens the browser to display it. Automatically compiles styles and scripts whenever a file in `src/` is changed, and live reloads the browser. This is what _must be run_ on the development stage. |
| `npm run build` | Compiles and minifies and optimizes the files in the assets folder. The generated compiled and optimized files are located in the `dist/` folder. This is what _must be run_ before publishing the project. This is also the build command to be run by external deployment services such as Netlify. The publishable files are then located in the `dist/` folder. |
| `npm run clean` | Deletes the current `/dist` folder and cache folders. |
| `npm run lint` | Runs ESLint for javascript and html files, showing a report. If you are using VSCode, the extension for ESLint works too. |
| `npm run lintfix` | Runs ESLint aud automatically fixes the warnings and errors that can be fixed. |
| `npm run test` | Displays a success message if everything is working as expected. |
| `npm run twatch` | Runs jest in watch mode, so that tests are re-run if a file is modified. |
| `npm run tcoverage` | Runs jest and produces a coverage report. |
| `npm run tdev` | Runs jest in watch mode and produces a coverage report as well. |

## License

This application is developed under the creative commons license. Check out the details in the [LICENSE](https://github.com/fcesc-code/textoo-front/blob/main/LICENSE.md) :open_book:.

## Contributions

### Philosophy

This software is currently developed :construction: with educational purposes and is open source. The code is published in this public repository.

### :fire: Issues

Do you want to suggest :bulb: a new feature? Open an [issue](https://github.com/fcesc-code/textoo-front/issues).
Please, keep it short, descriptive and concise :smiley:

### Security

Check out the how to report a vulnerability in our supported versions in the [SECURITY](https://github.com/fcesc-code/textoo-front/blob/main/SECURITY.md) :open_book:.

## Development information

### Tech stack

- [Angular](https://angular.io/) framework
- [Angular CLI](https://angular.io/cli)
- [RxJS](https://rxjs.dev/guide/overview) library for reactive programming with Angular
- [Typescript](https://www.typescriptlang.org/)
- [Jasmine](https://jasmine.github.io/) test framework
- [Karma](https://karma-runner.github.io/) test runner
- [Protractor](https://www.protractortest.org/#/) e2e testing in Angular
- [sass](https://sass-lang.com/)
- [Github](https://github.com/)
- [GitHub Actions](https://github.com/features/actions) for automated testing in continuous delivery
- [GitHub native Dependabot](https://dependabot.com/) for security alerts
- [GitHub codeQL](https://github.com/github/codeql) for code scanning alerts
- [sonarqube](https://www.sonarqube.org/)
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es)
- [VSCode](https://code.visualstudio.com/)
- [ESLint](https://eslint.org/) for linting of html and javascript files
- [Stylelint](https://stylelint.io/) for linting sass files
- [Prettier](https://prettier.io/) as code formatter
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [PostCSS](https://www.npmjs.com/package/postcss)
- [PurgeCSS](https://purgecss.com/)
- [Tailwindcss](https://tailwindcss.com/) as a utility-first library
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/about) Windows Subsystem for Linux (ubuntu 20)
- [HTML](https://html.spec.whatwg.org/)
- [YAML](https://yaml.org/) for GitHub actions
- [markjs](https://markjs.io/) for markdown rendering
- [husky](https://www.npmjs.com/package/husky) to use git hooks for continuous integration

### VSCode extensions

- [Codemetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics) Computes complexity for JS and TS files
- [Errorlens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) Highlights errors and warnings in editor
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) Linting for JS and TS files in editor
- [Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) AI suggesting github code
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) To live open coverage html file while running dev server, for example
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) Linting for markdown files in editor
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) Formats code in editor
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) Sass syntax highlighter and formatter
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) Linting for sass/scss/css files in editor
- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Intellisense for Tailwind CSS
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-auto-rename-tag) Auto rename tag for html/xml files in editor

### Tools

- [Squoosh](https://squoosh.app/) Compress and export images
- [Trello](https://trello.com/) Used to manage the project with kanban boards

### Quality gate

Quality gate main indicators:

| parameter                                                                                                       | target   | current                    |
| --------------------------------------------------------------------------------------------------------------- | -------- | -------------------------- |
| **Web standards**                                                                                               |
| [HTML Validator](https://jigsaw.w3.org/css-validator/)                                                          | 0 errors | _under development_ errors |
| [css validator](https://jigsaw.w3.org/css-validator/)                                                           | 0 errors | _under development_ errors |
| **Unit testing**                                                                                                |
| [Jasmine](https://jasmine.github.io/) statements                                                                | > 70%    | _under development_        |
| [Jasmine](https://jasmine.github.io/) branches                                                                  | > 70%    | _under development_        |
| [Jasmine](https://jasmine.github.io/) lines                                                                     | > 70%    | _under development_        |
| [Jasmine](https://jasmine.github.io/) functions                                                                 | > 70%    | _under development_        |
| **Component testing**                                                                                           |
| Components                                                                                                      | > 70%    | _under development_        |
| **Integration testing**                                                                                         |
| API calls                                                                                                       | 100%     | _under development_        |
| **Quality**                                                                                                     |
| [Sonarqube](https://www.sonarqube.org/) bugs                                                                    | 0        | _under development_        |
| [Sonarqube](https://www.sonarqube.org/) code smells                                                             | 0        | _under development_        |
| [Sonarqube](https://www.sonarqube.org/) code duplication                                                        | < 10%    | _under development_%       |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) best practices metric                          | > 95/100 | _under development_/100    |
| **Security**                                                                                                    |
| [Dependabot security alerts](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/) | 0        | _under development_        |
| [CodeQL](https://github.com/github/codeql)                                                                      | 0        | _under development_        |
| [Sonarqube](https://www.sonarqube.org/) vulnerabilities                                                         | 0        | _under development_        |
| [Sonarqube](https://www.sonarqube.org/) security hotspots                                                       | 0        | _under development_        |
| **Linters**                                                                                                     |
| [ESLint](https://eslint.org/) errors (js)                                                                       | 0        | _under development_        |
| [Stylelint](https://stylelint.io/) errors (sass)                                                                | 0        | _under development_        |
| **Accessibility**                                                                                               |
| [WAVE](https://wave.webaim.org/) accessibility validator                                                        | 0        | _under development_ errors |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) accessibility metric                           | > 90/100 | _under development_/100    |
| **Performance**                                                                                                 |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) performance metric                             | > 90/100 | _under development_/100    |
| First contentful paint                                                                                          | not set  | _under development_        |
| Speed Index                                                                                                     | not set  | _under development_        |
| Largest contentful paint                                                                                        | not set  | _under development_        |
| Time to interactive                                                                                             | not set  | _under development_        |
| Total blocking time                                                                                             | not set  | _under development_        |
| Cumulative layout shift                                                                                         | not set  | _under development_        |
| bundle size                                                                                                     | < 500kB  | _under development_        |
| Lazy loading images                                                                                             | yes      | _under development_        |
| Lazy loading secondary scripts                                                                                  | yes      | _under development_        |
| Lazy loading angular modules                                                                                    | yes      | _under development_        |
| Progressive web app                                                                                             | yes      | _under development_        |
| **SEO**                                                                                                         |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) SEO metric                                     | > 90/100 | _under development_/100    |

_\* Warnings are not included in these metrics._

### Content

- [Pexels](https://www.pexels.com/)
- [Unsplash](https://unsplash.com/)
- [Google fonts](https://fonts.google.com/)

### Requirements

- [Node.js](http://nodejs.org/) >= 16.13.2

### Continuous delivery

Automated testing in every pull request or merge to the main branch.
Automated code scanning to measure code quality, pull requests cannot be merged if quality is not met.
Automated security alerts for the repository.

## Releases

Releases' schedule:
| Version | Planned date | Status | Content |
| ------- | ---------------- | ------------ | --------------- |
| 0.0.1 | 16th March 2022 | Scheduled | Initial version |
| 0.0.2 | 30th March 2022 | Planned | Additional activities |
| 0.1.0 | 13th April 2022 | Planned | User authentication |
| 0.1.1 | 25th April 2022 | Planned | Integration with backend |
| 0.2.0 | 4th May 2022 | Planned | UX improvements |
| 0.2.1 | 15th May 2022 | Planned | Results feature in synchronous mode |
| 0.2.2 | 25th May 2022 | Planned | Add educational metrics |
| 1.0.0 | 6th June 2022 | Planned | First app version for minimum viable product presentation |

### Version 0.0.1

1. ✔️ Initial version. Core functionality and libraries.

## Credits

Professor: César Pablo Córcoles Briongos.

Tutor: Carles Arnal Castello.

Wherever appropriate, credit is given to author as a comment in specific file.

## Author

Francesc Brugarolas, [Github repo](https://github.com/fcesc-code/)

March 2022.

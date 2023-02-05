# WorkoutTrackingApp

This app helps trainees to track exercises and meals they do.

## TODO before start development

- ✅typescript
- ✅Create components and directories beforehand using Atomic design
  - Define component name as well on figma
- ✅CI/CD for testing and deployment
- ✅Connection to Firebase for hosting and DB
- ✅Firebase for Auth
- Unit test using vitest and testing-library
- ✅tailwind-css
  - https://qiita.com/taai/items/32a4cdf15a49b63d8a6f
- ✅Daisy UI
- ✅production and local envs
- TDD
- Use StoryBook
- ✅Swagger with spotlight
- draw.io
- Dev-container
- ✅PWA
- Get a domain

## See the latest DEV environment

https://workout-app-5e81f.web.app/

## Design

https://www.figma.com/file/7vvfcNq19fBDlVO3i7IVnv/WorkoutApp?node-id=7%3A604&t=3VBsrBVIwm4r6Wpi-1
![Figma](./public/temp-pix/figma.png)

## Project Setup

```sh
git clone https://github.com/team-agile-div/toyota-wg3trip.git
npm ci
```

### Compile and Hot-Reload for Local Enviroment

```sh
npm run local
```

Also, you can do it by running a build task with `cmd + shift + b`

### Confirm on a mobile

Make sure to utilize the same Wifi as PC does

```sh
npm run local
```

1. Take a note the url coming after `Network: ...`
2. type the url including a port number on the address bar.

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

## API docs

The path is `/src/api/docs/openapi.yaml`

## Coding guide

### direcotry structure

Use Atomic design which helps developers to read code easily and also not to lose where to create component files and direcories.

#### Atoms

Represent the basic building blocks of a design system. An example is a button or a text style.

#### Molecules

A group of atoms working together as a unit. Molecules are tangible UI elements. For example, a button and text field can be grouped to create a search form.

##### Organisms

Atoms and molecules working together in a complex structure. A search field grouped with a navigation bar forms a header organism on a website.
Only this component can inherit from a same level of a organism component.

##### Templates

Page-level objects placing components into a layout that defines the content structure. For example, taking a header organism and placing it on a homepage template.

##### Pages

Instances of templates that represent the final product.

## Deploy

Run by [GitHub Actions](https://github.com/staqct/ssap-partner-portal-fo-frontend/actions)

## Style check and Build check

Run by [GitHub Actions](https://github.com/staqct/ssap-partner-portal-fo-frontend/actions)

# Fixtable-Ember

This addon provides an Ember-specific wrapper around the the [Fixtable](https://github.com/MyPureCloud/fixtable-core) library. Fixtable provides an easy way to create data grids with scrollable content and a fixed header/footer.

## Usage
Install this addon in your app using `npm install --save fixtable-ember`.

*Disclaimer: Although this is the intended installation mechanism, npm install actually won't work yet because this addon is currently under dev and hasn't been published to NPM. If you'd like to test this addon while it's still being developed, you can point directly to the Git repository in your package.json.*

This addon creates a new component that you can use in your templates: `fixtable-grid`

## Development / Contributing
### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit the dummy test app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

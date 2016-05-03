# Fixtable-Ember

This addon provides an Ember-specific wrapper around the the [Fixtable](https://github.com/MyPureCloud/fixtable-core) library. Fixtable provides an easy way to create data grids with scrollable content and a fixed header/footer.

## Usage

### Getting Started

Install this addon in your app using `npm install --save fixtable-ember`.

*Disclaimer: The command above actually won't work yet because this addon is currently still under development and hasn't yet been published to NPM. If you'd like to test this addon while it's still being developed, you can point directly to the Git repository in your package.json. To do that, use the command `npm install --save git://github.com/MyPureCloud/fixtable-ember.git#master`. This will install the addon at the current state of the master branch.*

This addon creates a new component that you can use in your templates: `fixtable-grid`

### Defining Columns

The `fixtable-grid` component expects to be passed a `columns` property, which should be a JavaScript array consisting of objects that have the following keys: `key`, `header`, and `width`.
* `key` (required) - Unique string identifier for the column.
* `header` (optional) - Text to show in the column header. If this isn't passed in, `key` will be shown in the header.
* `width` (optional) - Width of the column. Can be either a number (interpreted as pixels) or a string percentage (formatted like "50%"). If no width is passed in, the column will be sized automatically. Using a combination of pixel and percentage widths is not recommended.

Here's a simple example using just the key:
```javascript
[
  { key: 'name' },
  { key: 'address' }
]
```

Here's an example using `header` and a mixture of pixel widths and automatic sizing:
```javascript
[
  {
    key: 'name',
    header: 'Name',
    width: 150 // -> 150px
  },
  {
    key: 'address',
    header: 'Street Address'
  }
]
```

Here's an example using percentage width:
```javascript
[
  {
    key: 'name',
    width: '40%'
  },
  {
    key: 'address',
    width: '60%'
  }
]
```

### Defining Content
The component expects a `content` property to be passed in. This should be an array of objects.
* Each object element in the array represents a row of data.
* Each key/value pair in a row object represents a single cell of data. The key should match a key defined in `columns`, and the value represents the content for the column/row intersection.
* If there is no data for a given column, that key/value pair can be omitted from the row object.

For example, this is an example of content corresponding to the name and address columns defined in the examples above.
```javascript
[
  { name: 'Sherlock Holmes ', address: '221B Baker Street' },
  { name: 'Dudley Dursley', address: '4 Privet Drive' },
  { name: 'Hank Hill', address: '84 Rainey Street' },
  { name: 'Gandalf Stormcrow' }
]
```

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

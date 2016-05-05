# Fixtable-Ember

This addon provides an Ember-specific wrapper around the the [Fixtable](https://github.com/MyPureCloud/fixtable-core) library. Fixtable provides an easy way to create data grids with scrollable content and a fixed header/footer.

## Usage

### Getting Started

Install this addon in your app using `npm install --save fixtable-ember`.

*Disclaimer: The command above actually won't work yet because this addon is currently still under development and hasn't yet been published to NPM. If you'd like to test this addon while it's still being developed, you can point directly to the Git repository in your package.json. To do that, use the command `npm install --save git://github.com/MyPureCloud/fixtable-ember.git#master`. This will install the addon at the current state of the master branch.*

This addon creates a new component that you can use in your templates: `fixtable-grid`

Although it isn't strictly required, you should also include [Bootstrap 3](http://getbootstrap.com/getting-started/) in your project for optimal display.

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

### Adding Custom CSS Classes / Setting a Height

The primary feature of the Fixtable library is its ability to allow scrollable content with a fixed header and footer. To enable this feature, all you need to do is pass in a CSS class with a defined height through the `fixtableClass` property. The class (or classes, if you pass in a space-delimited class name string) specified in `fixtableClass` will be added to the Fixtable container element.

For example:
```css
.restrict-height {
  height: 400px;
}
```

At its core, the Fixtable is an HTML table element. If you want to customize the look of the Fixtable by adding CSS classes directly to the table element, you can do that with the `tableClass` property. For example, we might want to add the `table-hover` class to add Bootstrap's default styles when you hover over a row in the table.

```handlebars
{{fixtable-grid tableClass='table-hover'}}
```

By default, Fixtable already adds the `table` CSS class to the table element. As a result, you do **not** need to pass `table` to the `tableClass` property.

### Loading Indicator

If your data is being loaded asynchronously, you can show a loading indicator to make this clear to the user. Loading state can be toggled by binding to the `isLoading` property:

```handlebars
{{fixtable-grid isLoading=dataIsLoading}}
```

*In this example, `dataIsLoading` is assumed to be a property on the containing component or controller, indicating whether data has finished loading.*

While `isLoading` is true, a spinning 'loading' indicator will be shown in place of the grid content. When it becomes false, the loading indicator will be replaced with the actual data rows.

### Putting it All Together

In the examples above, we are making the following assumptions:
* We defined column definitions and grid content on our model as `columnDefs` and `dataRows` respectively
* We have a `restrict-height` CSS class that we want to apply to the Fixtable to limit its height
* We want to apply the `table-hover` class to the table element so that rows have a hover style
* We are indicating whether data has finished loading by binding the component's `isLoading` property to our `dataIsLoading` property

With those assumptions, our final markup for the `fixtable-grid` component ends up looking like this:
```handlebars
{{fixtable-grid columns=model.columnDefs content=model.dataRows fixtableClass='restrict-height' tableClass='table-hover' isLoading=dataIsLoading}}
```

### Pagination

#### Client Pagination

To enable client paging, set the `clientPaging` property to true. The Fixtable will then assume that all data has been loaded and is present in the `content` collection, and it will handle pagination logic internally.

```handlebars
{{fixtable-grid columns=model.columnDefs content=model.dataRows clientPaging=true}}
```

The Fixtable will now have a pagination footer that shows the current page and the total number of pages. Users will be able to go back or forward a page, jump to a specific page, and configure the page size. The possible options for page size are 25, 50, 100, 250, and 500 -- however, this will be limited based on the number of rows to remove superfluous options for smaller data sets. For example, if there are only 55 rows total, then the possible page sizes will be 25, 50, and 100. There's no need to show the 250 and 500 page size options since they will be functionally identical to a page size of 100.

#### Server Pagination

If it is set to true, the Fixtable will assume that pagination should *not* be handled on the client (or at least, not by the Fixtable itself), and will provide hooks to let the consumer know when the current page or the page size changes.

TODO - usage examples

TODO - what are the hooks for server paging?

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

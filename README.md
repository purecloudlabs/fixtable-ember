# Fixtable-Ember

[![npm](https://img.shields.io/npm/v/fixtable-ember.svg)](https://www.npmjs.com/package/fixtable-ember)
[![Build Status](https://travis-ci.org/MyPureCloud/fixtable-ember.svg?branch=master)](https://travis-ci.org/MyPureCloud/fixtable-ember)

This addon provides an Ember-specific wrapper around the the [Fixtable](https://github.com/MyPureCloud/fixtable-core) library. Fixtable provides an easy way to create data grids with scrollable content and a fixed header/footer. In addition, Fixtable-Ember provides enhanced functionality such as sorting, filtering, and pagination.

See a live demo here:
[http://purecloudlabs.github.io/fixtable-ember/](http://purecloudlabs.github.io/fixtable-ember/)

(Note: The source for the demo site linked above can be found in this repo's tests/dummy/app directory in the master branch.)

## Installation

### Getting Started

Navigate to the root directory of the project where you want to install this addon. Then, install this addon in your app using the following commands:
```
ember install fixtable-ember
```

This addon creates a new component that you can use in your templates: `fixtable-grid`

Although it isn't strictly required, we recommend including [Bootstrap 3](http://getbootstrap.com/getting-started/) in your project for optimal display.

### Nesting Addons

#### Ember-Engines

If you are using the `fixtable-ember` addon within an [Ember engine](https://github.com/dgeb/ember-engines), the `fixtable-ember` dependency must be under "dependencies" instead of "devDependencies" in the package.json file of your engine. Otherwise, the `fixtable-grid` component will fail to render.

## Basic Usage

### Defining Columns

The `fixtable-grid` component expects to be passed a `columns` property, which should be a JavaScript array consisting of objects that have the following keys: `key`, `header`, and `width`.
* `key` (required) - Unique string identifier for the column.
* `header` (optional) - Text to show in the column header. If this isn't passed in, `key` will be shown in the header.
* `width` (optional) - Width of the column. Can be either a number (interpreted as pixels) or a string percentage (formatted like "50%"). If no width is passed in, the column will be sized automatically. Using a combination of pixel and percentage widths is not recommended.
* `hideLabel` (optional) - If true, no column header will be shown for this column (even if the header property is specified).

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

The component expects a `content` property to be passed in. This should be an array of objects, either a native `Array` or one of Ember's Array-like objects (`Ember.ArrayProxy`, `DS.ManyArray`, or their subclasses).
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

The primary feature of the Fixtable library is its ability to allow scrollable content with a fixed header and footer. To enable this feature, all you need to do is pass in a CSS class with a defined height through the `fixtableClass` property.

The class (or classes, if you pass in a space-delimited class name string) specified in `fixtableClass` will be added to the Fixtable container element.

**Specifying a height for the Fixtable is required for optimal display.** If you do not specify a height, the table may appear to "collapse" when there are no data rows. (Note that height does not need to be specified as a fixed number of pixels; percentage-height is also fine as long as the parent element has a size.)

For example:
```handlebars
{{fixtable-grid fixtableClass='restrict-height'}}
```

```css
.restrict-height {
  height: 500px;
}
```

At its core, the Fixtable is an HTML table element. If you want to customize the look of the Fixtable by adding CSS classes directly to the table element, you can do that with the `tableClass` property. For example, we might want to add the `table-hover` class to add Bootstrap's default styles when you hover over a row in the table.

```handlebars
{{fixtable-grid tableClass='table-hover'}}
```

By default, Fixtable already adds the `table` CSS class to the table element. As a result, you do **not** need to pass `table` to the `tableClass` property.

You can also add custom CSS classes directly to the cell (`td`) elements for a given column. This should be done by specifying a `cellClass` for the column in the column definition. For example, let's say we want to add the "name" CSS class to every cell in the Name column. Our column definition would need to look like this:
```javascript
[
  {
    key: 'name',
    header: 'Name',
    cellClass: 'name'
  },
  {
    key: 'address',
    header: 'Street Address'
  }
]
```

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

## Advanced Usage

### Pagination

By default, the Fixtable grid assumes that its passed-in content represents **all** of the available content. However, if your content is split into multiple pages, there is built-in support for two different kinds of pagination: client-side and server-side.

#### Client-Side Pagination

To enable client paging, all you have to do is set the `clientPaging` property to true. The Fixtable will then assume that all data has been loaded and is present in the `content` collection, and it will handle pagination logic internally.

```handlebars
{{fixtable-grid columns=model.columnDefs content=model.dataRows clientPaging=true}}
```

With client paging turned on, the Fixtable will now limit the number of rows that are shown in the table at a time. Beneath the table, there will be a pagination footer that shows the current page and the total number of pages. The footer also lets users go back or forward a page, jump to a specific page, and configure the page size.

The possible options for page size are 25, 50, 100, 250, and 500 -- however, this will be limited based on the number of rows. For example, if there are only 55 rows total, then the possible page sizes will be 25, 50, and 100. There's no need to show the 250 and 500 page size options since they will be functionally identical to a page size of 100.

#### Server-Side Pagination

Enabling server paging takes a little more setup:
* First, set the `serverPaging` property to true.
* Bind the component's `totalRowsOnServer` property to a value representing the length of the dataset on the server. (The Fixtable needs this information to calculate how many pages there are.)
* Attach an action to the component's `onReloadContent` property. The action function will receive two parameters -- `page` (the current 1-indexed page number) and `pageSize` (the current page size) -- and is called whenever either the page or the page size changes.

Although the same pagination footer will be shown as with client-side pagination, the Fixtable will now assume that pagination should *not* be handled on the client (or at least, not by the Fixtable itself). Instead, it provides a hook named `onReloadContent` to let the consumer know when the current page or the page size changes. The consumer is expected to use this information to update the bound content of the `fixtable-grid` component.

Here's some sample markup:
``` handlebars
{{fixtable-grid columns=model.columnDefs content=model.pagedDataRows
  isLoading=serverPageIsLoading serverPaging=true totalRowsOnServer=model.totalRows
  onReloadContent=(action 'updatePage') }}
```

Notice that we've turned on server paging, set the total number of rows, and bound the `updatePage` action to the component's `onReloadContent` property. We've also set a property that lets us toggle the loading indicator.

In our controller, we might define `updatePage` something like this:
```javascript
actions: {
  updatePage(page, pageSize/*, filters*/) {
    this.set('serverPageIsLoading', true);

    this.store.query('rows', { page, pageSize )
      .then(rows => {
        this.set('serverPageIsLoading', false);
        this.set('model.pagedDataRows', rows);
      });
  }
}
```

In this example, first we are showing the loading indicator to let the user know that data is loading. Next, we request additional data from the server based on the updated `page` and `pageSize`. When we receive the data, we hide the loading indicator and set the new rows into the model property bound to the `fixtable-grid` component.

#### Custom Page Size

The default page size is 25 with the following default possible page sizes for the paginated table:
```
[ 25, 50, 100, 250, 500 ]
```

The user can switch between page sizes using the pagination footer at the bottom of the table. The page size options shown to the user will be restricted based on the number of data rows (e.g., if there are 53 rows, then the possible page sizes will be 25, 50, or 100) -- the goal is to only show as many page size options as necessary to display all of the data.

If you want to pass in different page size options, you can override the component's `pageSize`, `possiblePageSizes`, `currentPage` properties. The possible page sizes must be listed in ascending order.

### Custom Cell Components

You may want to render something more complicated into a cell than just a simple string value. For example, you might want to make each cell link out to another route, or you might want to embed a Handlebars template into a cell. You can do that by creating a custom cell component.

It's very easy to create a custom cell component -- all you have to do is specify a `component` for the column in the column definitions:

For example, here we have two regular columns and a third "profile" column that will render the `link-to-profile` component in each cell.

```javascript
[
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'address',
    header: 'Street Address'
  },
  {
    key: 'profile',
    header: 'Profile',
    component: 'link-to-profile'
  }
]
```

Custom cell components will automatically be provided with three properties:

* `columnDef` - the column definition
* `dataRow` - the object from the `content` array represented by this row
* `rowExpanded` - a boolean value indicating whether or not the row is expanded (more on this in the [Row Expansion](#row-expansion) section below)

For example, the Handlebars markup for the example `link-to-profile` component could look like this:
```handlebars
{{#link-to 'profile' dataRow.name}}Go to profile for {{dataRow.name}}{{/link-to}}
```

This would render a link to the "profile" route in each row, passing the "name" property as a parameter.

#### Bubbling Actions from Custom Cell components

If you have a custom cell component defined, you may want to allow the consumer of the fixtable-grid to handle actions raised by that cell component. To facilitate that, a `bubbleAction` function is set on the custom component, which can be called like this from the cell component's JavaScript:

```javascript
this.bubbleAction(myActionName[, args]);
```

The action with name `myActionName` will bubble up to the consumer of the `fixtable-grid` component. That consumer should set an action handler on the `fixtable-grid`:

```handlebars
{{fixtable-grid columns=columnDefs content=dataRows myActionName=(action 'myActionHandler')}}
```

Where `myActionName` is replaced with the actual name of the action bubbling up, and `myActionHandler` is some action defined on the parent of the `fixtable-grid`.

Alternatively, you skip calling `this.bubbleAction` in the cell component's JavaScript by directly using `bubbleAction` as an action in the markup of the component:

```handlebars
<button type="button" {{action bubbleAction 'myActionName' optionalArg1 optionalArg2}}>
  Do My Action
</button>
```

This will directly bubble the action with name `myActionName` to the parent of the `fixtable-grid` component, passing along any additional arguments that follow the action name.

### Additional Custom Components

#### Footer Component

You can supply your own `footerComponent` which will be rendered in place of the default `fixtable-footer` component. The following properties will be made available to your custom footer:

* `currentPage` - integer value of the currently selected page (starting at 1)
* `totalRows` - integer value of the total number of rows; if you're using server-side paging, this will be equal to `totalRowsOnServer`, otherwise it's the number of rows in the current filtered content array
* `totalPages` - integer value of the number of available pages given the current `pageSize` and `totalRows`
* `selectedDataRows` - array of the currently selected row objects
* `pageSize` - integer value of the number of items in each page
* `pageSizeOptions` - array of integers which can optionally be used to provide the user an affordance for changing `pageSize`
* `isLoading` - boolean value to indicate when a new page is being loaded (it's up to your `onReloadContent` method to update this value)
* `goToNextPage` - action which your component may invoke to increment the currentPage
* `goToPreviousPage` - action which your component may invoke to decrement the currentPage
* `bubbleAction` - action which your component may invoke to bubble actions up to the consumer of the fixtable-grid (this works the same as custom cell components; see [Bubbling Actions from Custom Cell components](#bubbling-actions-from-custom-cell-components) above)

#### Empty State Component

You can supply your own `emptyStateComponent` which will be rendered in place of the default `fixtable-empty-state` component when the content array is empty. You can also supply an object using the `emptyStateComponentValues` property with dynamic values to be passed along to your component as `values`.

The default empty state component simply shows a message, centered vertically and horizontally within Fixtable. This message defaults to "No data available", but you can override it by using the `emptyStateComponentValues` property to set an object with a `nullMessage` property. For example:

```
{{fixtable-grid emptyStateComponentValues={nullMessage: "Nothing to see here!"}}}
```

### Filtering

Fixtable supports filtering the displayed rows, either by search text or by selected option. To set this up, add a filter property to the column definition.

For example, this adds a search-type filter to the name column:
```javascript
[
  {
    key: 'name',
    header: 'Name',
    filter: {
      type: 'search'
    }
  },
  {
    key: 'address',
    header: 'Street Address'
  }
]
```

Similar to how pagination is handled, the implementation of filtering depends on whether all of the Fixtable's content is present on the client.

#### Client-Side Filtering

As long as `serverPaging` is not set to true, the Fixtable can handle the filtering logic internally. Adding a filter type to the column definition, as described above, will show a filter field in the column header. Typing into the search field (or selecting a filter option) will automatically filter the visible data rows.

#### Server-Side Filtering

Server-side filtering presents the same user interface as client-side filtering, but the content is not automatically filtered (because the Fixtable cannot assume that all data is present on the client). Server-side filtering is active whenever the `serverPaging` property is set to true. In other words, if you're using server-side pagination, you also need to use server-side filtering.

Server-side filtering uses the same `onReloadContent` event as server-side pagination, so you don't need to define a separate function or property. The third parameter passed to the function (after `page` and `pageSize`) will be `filters`, an object where the key/value pairs link column keys to filter text. For example:
```javascript
{
  name: 'smith',
  address: ''
}
```
If the value is null or empty, that means that there is no filter applied to that column.

After requesting and receiving the updated data from the server, you should also update the value of `totalRowsOnServer` so that it reflects the total number of *filtered* rows on the server. Otherwise, there may be additional "blank" pages in the Fixtable, because the number of pages shown is determined by `totalRowsOnServer`.

Do note that it's possible for changing the filters to simultaneously change the current page. (The Fixtable automatically jumps to the first page if new filters are applied.) If this happens, the `onReloadContent` function will still only be invoked a single time. As a result, you should likely always include both filter and pagination information in your server request.

#### Types of Filters

There are two types of filters: search filters and select filters. Search-type filters discriminate rows based on the text typed into the filter field, excluding any row that does not include the searched-for text as a substring (case-insensitive).

You can specify a search-type filter in the column definitions as follows:

```javascript
[
  {
    key: 'name',
    header: 'Name',
    filter: {
      type: 'search'
    }
  }
]
```

Select-type filters discriminate rows based on a discretely selected option, where the row's value for that column must be equal to the selected filter option (again, case-insensitive). A label may be optionally provided for each option to have control over the text shown in the select-type filter dialog. The options for a select-type filter may be specified as follows:

```javascript
[
  {
    key: 'grade',
    header: 'Letter Grade',
    filter: {
      type: 'select',
      selectOptions: [
        { value: 'A', label: 'The letter A' },
        { value: 'B' },
        { value: 'C', label: 'The letter C' },
        { value: 'D' },
        { value: 'F' },
      ]
    }
  }
]
```

If you prefer not to specify the possible select options in the column definitions, you can simply set the `automaticOptions` flag to true in the `filter` object of the column definition. This will cause the select options to be automatically generated from the values that are present in the data.

```javascript
[
  {
    key: 'grade',
    header: 'Letter Grade',
    filter: {
      type: 'select',
      automaticOptions: true
    }
  }
]
```

Automatic filtering should not be used if server-side pagination is turned on, because Fixtable will not be able to determine all of the possible filter options without all of the data loaded onto the client. (Automatic filtering can be used with client-side pagination, however.) Note that the generated options will be unique and case-insensitive.

#### Filter Debouncing

To avoid rapid and unnecessary filtering as the user types, especially in the case where filtering happens on the server and requires AJAX calls, the Fixtable automatically debounces filtering by 500ms. In other words, the filter will not be applied until 500ms after the user stops typing into a filter field. This can be configured by setting the component's `filterDebounce` property, if desired. (The property should be set to a number representing the debounce time in milliseconds.)

For example, this lengthens the debounce time to a full second.
```handlebars
{{fixtable-grid columns=model.columnDefs content=model.dataRows filterDebounce=1000}}
```

#### Manual Filter Application

By default, the Fixtable will automatically filter itself as the user types into filter fields -- with a short debounce interval, as described above. However, real-time filtering can be disabled entirely. This may be useful in workflows where you want to reduce traffic to the server, or where the user wants to enter filters in multiple fields before seeing the filtered results.

To disable real-time filtering, simply set the `realtimeFiltering` property to `false`. The Fixtable will automatically show Apply and Clear buttons that apply or clear the entered filters, respectively.

#### Filter Placeholder Text

You can specify placeholder text for search- and select-type filters by setting the value of the `placeholder` property within the `filter` object of the column definition.

```javascript
[
  {
    key: 'name',
    header: 'Name',
    filter: {
      type: 'search',
      placeholder: 'name search'
    }
  }
]
```

If the filter is search-type, the `placeholder` attribute of the `<input>` element will be set to the placeholder value. If the filter is select-type, the text of the first `<option>` of the `<select>` element will be set to the placeholder value.

#### Custom Filter Components

You may want to render something other than a search field or select list for the filter. To do so, specify the component to render by providing
the name in the `component` property of the `filter` object.

For example, given that a component named "checkbox-filter" exists:

```javascript
[
  {
    key: 'name',
    header: 'Name',
    filter: {
      component: 'checkbox-filter'
    }
  }
]
```

If both `component` and `type` are specified, `component` will take precedence and `type` will be ignored.

The components will have access to two properties: `columnDef` and `filter`. These properties represent the column definition and the filter value for
that column, respectively. Setting the `filter` property in the component will invoke the `onReloadContent` action or cause the manual
filter buttons to display based on the value of the `realtimeFiltering`.

```handlebars
{{!-- checkbox-filter.hbs --}}
<div class="checkbox">
  <label>
    {{input type="checkbox" checked=filter}} Check if awesome
  <label>
</div>
```

If you are using client-side filtering, then you should also provide a custom filter function along with your custom component. Set the custom filter function as the `filterFunction` property of your column definition's `filter` object.

When invoked, `filterFunction` will be passed a data row and the current filter value for that column. It should return true if the given row passes the filter, and false otherwise.

```javascript
[
  {
    key: 'name',
    header: 'Name',
    filter: {
      component: 'checkbox-filter',
      filterFunction(rowData, filterValue) {
        return rowData.name === 'Roland Deschain';        
      }
    }
  }
]
```

#### Filter Caveats

Columns that have a custom cell component can be filtered, but only if the data rows defined in `content` have values corresponding to the column using the custom cell component. The filtering will be based on the data in `content`, not on what's rendered by the custom cell component.


### Sorting

Fixtable has built-in support for column sorting.

To enable sorting for a given column, just add `sortable: true` to the column definition.

For example, in the column definitions below, the name column is sortable:
```javascript
[
  {
    key: 'name',
    header: 'Name',
    sortable: true
  },
  {
    key: 'address',
    header: 'Street Address'
  }
]
```

Clicking on the header of a sortable column will sort it in ascending order. Clicking on the column header again will toggle ascending/descending. Clicking on another column header will switch to sorting by the new column in ascending order.

To specify a default sort column or sort order, you can bind to the `sortBy` and `sortAscending` properties of the `fixtable-grid` component, respectively. (`sortAscending` defaults to true, so you can omit this property if that's what you want.) `sortBy` should be a column key, and `sortAscending` should be a boolean.

For example, this is how we might sort by ID in descending order:
```handlebars
{{fixtable-grid columns=model.columnDefs content=model.dataRows sortBy=(mut sortKey) sortAscending=(mut ascending)}}
```

In the owning component or controller:
```javascript
sortKey: 'id',
ascending: false,
```

Note that you should use the `mut` helper to indicate that the `fixtable-grid` is allowed to mutate the value. Because the Fixtable needs to change these values depending on user actions, you should not use literal string and boolean values for these properties.

#### Client-Side Sorting

As long as `serverPaging` is not turned on, Fixtable can handle the sorting logic on its own, under the assumption that all of the table data is already loaded on the client. Specifying the `sortable` key in the column definition is enough to enable client-side sorting.

There are also some additional features that can be used to customize sorting on the client. **By default, sorting is done in lexicographical order, using JavaScript's [String.prototype.localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) function.** If you want to sort using some other means, you can specify a custom sort function using the `sortFunction` key of the column definition.

For example, this column definition represents an ID column that is sorted numerically.
```javascript
{
  key: 'id',
  header: 'ID',
  sortable: true,
  sortFunction: (x, y) => x - y
}
```

When specifying a custom sort function, note that the intended sort direction is assumed to be ascending. When the column is sorted in descending order, the same function will be invoked, but the parameter order will be reversed. The sort function should expect to receive two parameters, corresponding to two cell values for the rows being compared. (In the example above, `x` and `y` would be ID values.) In your sort function, don't forget to consider the possibility of null or undefined cell values.

#### Server-Side Sorting

When server paging is turned on, Fixtable cannot implement sorting on the client because it doesn't have enough information. Instead, the same `onReloadContent` action used for filtering and pagination will be invoked. The fourth parameter of the passed-in function will be a `sortInfo` object that contains `key` and `ascending` properties. `key` corresponds to the key of the column that should be sorted, and `ascending` is a boolean that indicates whether the sort should be ascending or descending. The `sortInfo` parameter will be null if no sort column is specified.

For example, `sortInfo` would look like this if we wanted to sort by ID, ascending:
```javascript
{
  key: 'id',
  ascending: true
}
```

Similarly to server-side pagination and filtering, the Fixtable will take care of notifying its consumer whenever the table needs to be sorted, but actually sorting the table's bound data is the responsibility of the consumer.

#### Sorting Caveats

Currently, you can only sort by a single column at a time. (In other words, there is no concept of primary/secondary sort column.)

Also, just like with filtering, sorting is based on what's defined in `content`, not on the actual markup rendered in the cell. Keep this in mind when using sorting with custom cell components.

### External Filters

You may want to implement UI for filtering data outside of Fixtable itself. Perhaps in a sibling component that allows for more complex controls than can comfortably fit in a column header.

To support this use case, Fixtable allows for an `externalFilters` property to be set. It will then monitor this value for changes and trigger your `onReloadContent` callback to refresh the table content. The current value of `externalFilters` will be passed to your callback as the fifth parameter.

Fixtable does not prescribe any particular format for your external filters, so you are free to implement whatever data structure works best for your needs. This, however, means you may need to use `notifyPropertyChange()` when your external filters are updated, to explicitly notify Fixtable of the change.

Note: `serverPaging` must be enabled.

### onReloadContent

Let's recap `onReloadContent`, since it can be triggered by several different kinds of content updates. This property of the `fixtable-grid` should be set to an action on the owning controller or component. The bound action will be called whenever the table is paged, sorted, or filtered, or when any external filters are changed. (This is true regardless of whether client paging or server paging is active, but obviously it's more important for server paging.) The action will be invoked with the following parameters:

* `page` (Number) - The current 1-indexed page number.
* `pageSize` (Number) - The maximum number of rows shown on a single page.
* `filters` (Object) - Object where the key/value pairs map column keys to filter text.
* `sortInfo` (Object) - Object with a string `key` property representing the column to sort by, and a boolean `ascending` property indicating the sort direction. If the table is unsorted, `sortInfo` will be null.
* `externalFilters` (Object) - The current value of your `externalFilters` property; this is completely outside of Fixtable's control.

### Row Selection

Fixtable has built-in support for selecting rows. If you set the `rowSelection` property to true, the `fixtable-grid` will render a leftmost column of checkboxes that can be used to select individual rows. In the header for the checkbox column, there will also be a checkbox that can be used to toggle selection for all of the visible rows.

Selected rows will automatically have the `active` CSS class applied to them. This will give them a default selected style if you have Bootstrap pulled in, but you can also override those styles as desired.

When rows are selected, any kind of content reload (i.e., anything that would trigger `onReloadContent` -- sorting, paging, or filtering) will clear the selected rows. (This is true regardless of whether the Fixtable is using client paging, server paging, or no paging at all.)

Consumers should keep track of which rows are selected by subscribing to `onSelectionChanged`. Note that whenever the `onReloadContent` handler is called, the `onSelectionChanged` handler will also be invoked immediately afterwards, informing the listener that the selected rows have been cleared out.

`onSelectionChanged` should be bound to an action on the owning controller or component. The bound action will be called whenever a row is selected or deselected. It receives the following parameter:

* `selectedDataRows` (Object) - The selected data rows.

### Row Clicking
For simple row click interaction without showing the row checkbox `onRowClick` should be bound to an action on the owning controller or component.  The bound action will be called whenever the row is clicked.  It receives the following parameter:
* `clickedRow` (Object) the data object for the row that was clicked.

### Row Expansion

Fixtable has built-in support for expandable rows, for cases where you may desire to show more information than can comfortably fit on a single row. When a row is "expanded," a second, full-width table row is displayed beneath the normal row. In this expanded space, Fixtable will render whatever custom component you specify in the `expandedRowComponent` property. This component will receive the same `dataRow` binding as any custom cell component in the main row (see [Custom Cell Components](#custom-cell-components) above).

To allow for toggling rows between expanded and collapsed state, you should include a component in one of your column definitions that toggles the `rowExpanded` property. Fixtable includes a simple component, `fixtable-row-toggle`, that you can use for this purpose. You can also make a custom component if you need additional logic or prefer a different design. It's also noteworthy that any custom cell component can read and write the `rowExpanded` property, so you can toggle or react to this value in multiple columns if needed.

Because "expanded" rows are actually rendered as two table rows, Fixtable takes some steps to ensure you can still style them as desired. For one thing, any border between the two rows will be removed by default to maintain the illusion of a single row (this can, naturally, be overridden in your own CSS). Fixtable also applies some helpful CSS classes to each row element:

* `fixtable-row-primary` - the primary, multi-column row (rendered from your column definition)
* `fixtable-row-secondary` - the second, full-width column that renders your `expandedRowComponent`
* `expanded` - present on both row elements when the dataRow is expanded
* `hover` - present on both row elements when the user's cursor is hovering over _either_ row element (you should use this class rather than relying on the `:hover` pseudo-class if you want to use hover styles with expanded rows)
* `active` - present on both row elements if the row is selected (see [Row Selection](#row-selection) above)

### Debugging

Fixtable-Ember utilizes the core [Fixtable](https://github.com/MyPureCloud/fixtable-core) library to handle the low-level DOM manipulation required for the fixed-header effect, ensuring Fixtable is styled to match your application's tables, etc. If you notice rendering issues, they're likely to originate in this core library and not Fixtable-Ember itself. If you set the `debugMode` property to `true` on your `fixtable-grid` component, it will enable debug logs on its internal `Fixtable` object which may be helpful in diagnosing issues.

## Development / Contributing

### Installation

* `git clone` this repository
* `node v12` is recommended. 
* `npm install`

### Running

* `ember server`
* Visit the dummy test app at http://localhost:4200/fixtable-ember/. The trailing slash seems to be required.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

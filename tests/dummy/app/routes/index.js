import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model = {
      columnDefs: [
        {
          key: 'id',
          header: 'ID',
          width: 50,
          sortable: true
        },
        {
          key: 'name',
          header: 'Name',
          width: 200,
          cellClass: 'name',
          sortable: true
        },
        {
          key: 'address',
          header: 'Address',
          sortable: true
        },
        {
          key: 'alignment',
          header: 'Alignment',
          sortable: true
        },
        {
          key: 'username',
          header: 'Username',
          component: 'user-name',
          cellClass: 'monospace'
        }
      ],
      dataRows: [
        { name: 'Sherlock Holmes', address: '221B Baker Street', alignment: 'Good' },
        { name: 'Dudley Dursley', address: '4 Privet Drive', alignment: 'Evil' },
        { name: 'Hank Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Good' },
        { name: 'Peggy Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Evil' },
        { name: 'Bobby Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Good' },
        { name: 'Gandalf Stormcrow', alignment: 'Good' },
        { name: 'Sauron', address: 'Mordor', alignment: 'Evil' },
        { name: 'Morgoth', address: 'Thangorodrim', alignment: 'Evil' },
        { name: 'Manwe', address: 'Valinor', alignment: 'Good' },
        { name: 'Homer Simpson', address: 'Springfield, Illinois', alignment: 'Neutral' },
        { name: 'Marge Simpson', address: 'Springfield, Illinois', alignment: 'Good' },
        { name: 'Bart Simpson', address: 'Springfield, Illinois', alignment: 'Evil' },
        { name: 'Lisa Simpson', address: 'Springfield, Illinois', alignment: 'Good' },
        { name: 'Maggie Simpson', address: 'Springfield, Illinois', alignment: 'Neutral' },
        { name: 'Abe Simpson', address: 'Springfield, Illinois', alignment: 'Neutral' },
        { name: 'Mr. Burns', address: 'Burns Manor', alignment: 'Evil' },
        { name: 'Waylon Smithers', address: 'Burns Manor', alignment: 'Neutral' },
        { name: 'Moe Szyslak', address: 'Moe\'s Tavern', alignment: 'Neutral' },
        { name: 'Darth Revan', alignment: 'Evil' },
        { name: 'Spongebob Squarepants', address: 'A Pineapple Under the Sea', alignment: 'Good' },
        { name: 'Fitzwilliam Darcy', address: 'Pemberley', alignment: 'Good' },
        { name: 'Nessie', address: 'Loch Ness', alignment: 'Evil' },
        { name: 'The Cat in the Hat', alignment: 'Neutral' },
        { name: 'Freyja', address: 'Folkvangr', alignment: 'Good' },
        { name: 'Odin', address: 'Valhalla', alignment: 'Good' },
        { name: 'Nidhogg', address: 'Yggdrasil', alignment: 'Neutral' },
        { name: 'Jormungandr', address: 'Midgard', alignment: 'Neutral' },
        { name: 'Jor-El', address: 'Krypton', alignment: 'Good' },
        { name: 'Oliver Twist', alignment: 'Good' },
        { name: 'Artemis Fowl', address: 'Fowl Manor', alignment: 'Neutral' },
        { name: 'Roland Deschain', alignment: 'Neutral' },
        { name: 'Han Solo', address: 'Coruscant', alignment: 'Good' },
        { name: 'Chewbacca', address: 'Kashyyyk', alignment: 'Good' },
        { name: 'Sheev Palpatine', address: 'Naboo', alignment: 'Evil' },
        { name: 'Luke Skywalker', address: 'Tatooine', alignment: 'Good' },
        { name: 'Darth Vader', address: 'Death Star', alignment: 'Evil' },
        { name: 'Owen Lars', address: 'Tatooine', alignment: 'Good' },
        { name: 'Beru Lars', address: 'Tatooine', alignment: 'Good' },
        { name: 'Lando Calrissian', address: 'Cloud City', alignment: 'Neutral' },
        { name: 'Bib Fortuna', address: 'Jabba\'s Palace', alignment: 'Evil' },
        { name: 'Yoda', address: 'Dagobah', alignment: 'Good' },
        { name: 'Arthur Pendragon', address: 'Camelot', alignment: 'Good' },
        { name: 'Myrddin Emrys', address: 'Sacred Grove of Bel', alignment: 'Good' },
        { name: 'Sir Lancelot', address: 'Camelot', alignment: 'Good' },
        { name: 'The Ghost of Christmas Past', alignment: 'Good' },
        { name: 'The Ghost of Christmas Present', alignment: 'Good' },
        { name: 'The Ghost of Christmas Future', alignment: 'Good' },
        { name: 'The Grinch', address: 'Cliff Overlooking Whoville', alignment: 'Evil' },
        { name: 'Tony Stark', address: 'Stark Tower / Columbus Circle / New York, NY 10019', alignment: 'Good' },
        { name: 'Daredevil', address: 'Hell\'s Kitchen', alignment: 'Good' },
        { name: 'Dr. Strange', address: 'Sanctum Santorum', alignment: 'Good' },
        { name: 'Reed Richards', address: 'The Baxter Building', alignment: 'Good' }
      ]
    };
    model.dataRows.forEach((row, idx) => row.id = (idx + 1));

    // server paging/filtering
    model.pagedDataRows = model.dataRows.slice(0, 25);
    model.filteredDataRows = model.dataRows;

    // server paging + manual filter application
    model.manualFilterDataRows = model.dataRows;
    model.manualFilterVisibleRows = model.dataRows.slice(0, 25);

    // create a version of the column defs that includes filters
    model.filteredColumnDefs = JSON.parse(JSON.stringify(model.columnDefs));
    model.filteredColumnDefs[1].filter = { type: 'search' }; // name
    model.filteredColumnDefs[2].filter = { type: 'search' }; // address
    model.filteredColumnDefs[3].filter = { // alignment
      type: 'select',
      selectOptions: [
        { value: 'Good' },
        { value: 'Evil' },
        { value: 'Neutral' }
      ]
    };

    // create a version of the filtered column defs that includes automaticOptions
    model.clientColumnDefs = JSON.parse(JSON.stringify(model.filteredColumnDefs));
    model.clientColumnDefs[3].filter = { // alignment
      type: 'select',
      automaticOptions: true,
    };

    // add a custom ID sorting function to both versions of the column defs
    var sortFunc = (x, y) => x - y;
    model.columnDefs[0].sortFunction = sortFunc;
    model.filteredColumnDefs[0].sortFunction = sortFunc;
    model.clientColumnDefs[0].sortFunction = sortFunc;

    return model;
  },
});

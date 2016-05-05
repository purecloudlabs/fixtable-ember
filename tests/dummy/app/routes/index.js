import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model = {
      columnDefs: [
        { key: 'id', header: 'ID', width: 50 },
        { key: 'name', header: 'Name', width: 200 },
        { key: 'address', header: 'Address' }
      ],
      dataRows: [
        { name: 'Sherlock Holmes ', address: '221B Baker Street' },
        { name: 'Dudley Dursley', address: '4 Privet Drive' },
        { name: 'Hank Hill', address: '84 Rainey Street / Arlen, TX' },
        { name: 'Peggy Hill', address: '84 Rainey Street / Arlen, TX' },
        { name: 'Bobby Hill', address: '84 Rainey Street / Arlen, TX' },
        { name: 'Gandalf Stormcrow' },
        { name: 'Sauron', address: 'Mordor' },
        { name: 'Morgoth', address: 'Thangorodrim' },
        { name: 'Manwe', address: 'Valinor' },
        { name: 'Homer Simpson', address: 'Springfield, Illinois' },
        { name: 'Marge Simpson', address: 'Springfield, Illinois' },
        { name: 'Bart Simpson', address: 'Springfield, Illinois' },
        { name: 'Lisa Simpson', address: 'Springfield, Illinois' },
        { name: 'Maggie Simpson', address: 'Springfield, Illinois' },
        { name: 'Abe Simpson', address: 'Springfield, Illinois' },
        { name: 'Mr. Burns', address: 'Burns Manor' },
        { name: 'Waylon Smithers', address: 'Burns Manor' },
        { name: 'Moe Szyslak', address: 'Moe\'s Tavern' },
        { name: 'Darth Revan' },
        { name: 'Spongebob Squarepants', address: 'A Pineapple Under the Sea' },
        { name: 'Fitzwilliam Darcy', address: 'Pemberley' },
        { name: 'Nessie', address: 'Loch Ness' },
        { name: 'The Cat in the Hat' },
        { name: 'Freyja', address: 'Folkvangr' },
        { name: 'Odin', address: 'Valhalla' },
        { name: 'Nidhogg', address: 'Yggdrasil' },
        { name: 'Jormungandr', address: 'Midgard' },
        { name: 'Jor-El', address: 'Krypton' },
        { name: 'Oliver Twist' },
        { name: 'Artemis Fowl', address: 'Fowl Manor' },
        { name: 'Roland Deschain' },
        { name: 'Han Solo', address: 'Coruscant' },
        { name: 'Chewbacca', address: 'Kashyyyk' },
        { name: 'Sheev Palpatine', address: 'Naboo' },
        { name: 'Luke Skywalker', address: 'Tatooine' },
        { name: 'Darth Vader', address: 'Death Star' },
        { name: 'Owen Lars', address: 'Tatooine' },
        { name: 'Beru Lars', address: 'Tatooine' },
        { name: 'Lando Calrissian', address: 'Cloud City' },
        { name: 'Bib Fortuna', address: 'Jabba\'s Palace' },
        { name: 'Yoda', address: 'Dagobah' },
        { name: 'Arthur Pendragon', address: 'Camelot' },
        { name: 'Myrddin Emrys', address: 'Sacred Grove of Bel' },
        { name: 'Sir Lancelot', address: 'Camelot' },
        { name: 'The Ghost of Christmas Past' },
        { name: 'The Ghost of Christmas Present' },
        { name: 'The Ghost of Christmas Future' },
        { name: 'The Grinch', address: 'Cliff Overlooking Whoville' },
        { name: 'Tony Stark', address: 'Stark Tower / Columbus Circle / New York, NY 10019' },
        { name: 'Daredevil', address: 'Hell\'s Kitchen' },
        { name: 'Dr. Strange', address: 'Sanctum Santorum' },
        { name: 'Reed Richards', address: 'The Baxter Building' }
      ]
    };
    model.dataRows.forEach((row, idx) => row.id = (idx + 1));
    model.pagedDataRows = model.dataRows.slice(0, 25);
    return model;
  },
});

import Ember from 'ember';

export default Ember.Service.extend({
  // returns a raw array of data that can be used to mimic an API response
  getRawData() {
    let dataRows = [
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
      { name: 'Reed Richards', address: 'The Baxter Building', alignment: 'Good' },
      { name: 'James Tiberius Kirk', address: 'USS Enterprise', alignment: 'Good' }
    ];
    dataRows.forEach((row, idx) => row.id = (idx + 1));
    return dataRows;
  },

  getObservableData() {
    let rawData = this.getRawData();
    let observable = Ember.A();
    rawData.forEach(dataRow => {
      let observableRow = Ember.Object.create();
      for (var key in dataRow) {
        if (dataRow.hasOwnProperty(key)) {
          observableRow.set(key, dataRow[key]);
        }
      }
      observable.pushObject(observableRow);
    });
    return observable;
  }
});

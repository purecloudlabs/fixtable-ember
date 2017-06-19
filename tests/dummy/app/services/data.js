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
      { name: 'James Tiberius Kirk', address: 'USS Enterprise', alignment: 'Good' },
      { name: 'Tyrion Lannister', address: 'House Lannister', alignment: 'Good' },
      { name: 'Jaime Lannister', address: 'House Lannister', alignment: 'Good' },
      { name: 'Cersei Lannister', address: 'House Lannister', alignment: 'Evil' },
      { name: 'Daenerys Targaryen', address: 'House Targaryen', alignment: 'Neutral' },
      { name: 'Jon Snow', address: 'Nights Watch', alignment: 'Good' },
      { name: 'Petyr Baelish', address: 'Kings Landing', alignment: 'Evil' },
      { name: 'Davos Seaworth', address: 'House Baratheon', alignment: 'Neutral' },
      { name: 'Melisandre', address: 'House Baratheon', alignment: 'Evil' },
      { name: 'Sansa Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Arya Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Ellaria Sand', address: 'House Martell', alignment: 'Evil' },
      { name: 'Missandei', address: 'Meereen', alignment: 'Good' },
      { name: 'Varys', address: 'Kings Landing', alignment: 'Neutral' },
      { name: 'Sandor Clegane', address: 'Westeros', alignment: 'Neutral' },
      { name: 'Tormund Giantsbane', address: 'North of the Wall', alignment: 'Neutral' },
      { name: 'Bran Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Samwell Tarly', address: 'Nights Watch', alignment: 'Good' },
      { name: 'Daario Naharis', address: 'Slavers Bay', alignment: 'Neutral' },
      { name: 'Theon Greyjoy', address: 'House Greyjoy', alignment: 'Neutral' },
      { name: 'Bron', address: 'Kings Landing', alignment: 'Neutral' },
      { name: 'Jaqen Hghar', address: 'Braavos', alignment: 'Neutral' },
      { name: 'Brienne', address: 'House Tarth', alignment: 'Good' },
      { name: 'Tommen Baratheon', address: 'House Baratheon', alignment: 'Neutral' },
      { name: 'Margaery Tyrell', address: 'House Tyrell', alignment: 'Good' },
      { name: 'The High Sparrow', address: 'Kings Landing', alignment: 'Neutral' },
      { name: 'Ramsay Bolton', address: 'House Bolton', alignment: 'Evil' },
      { name: 'Roose Bolton', address: 'House Bolton', alignment: 'Evil' },
      { name: 'Stannis Baratheon', address: 'House Baratheon', alignment: 'Neutral' },
      { name: 'Tywin Lannister', address: 'House Lannister', alignment: 'Evil' },
      { name: 'Joffrey Baratheon', address: 'House Baratheon', alignment: 'Evil' },
      { name: 'Catelyn Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Robb Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Talisa Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Jeor Mormont', address: 'Nights Watch', alignment: 'Good' },
      { name: 'Ned Stark', address: 'House Stark', alignment: 'Good' },
      { name: 'Robert Baratheon', address: 'House Baratheon', alignment: 'Neutral' },
      { name: 'Khal Drogo', address: 'Dothraki', alignment: 'Neutral' }
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

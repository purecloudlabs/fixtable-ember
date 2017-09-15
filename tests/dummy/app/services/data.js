import Ember from 'ember';

export default Ember.Service.extend({
  // returns a raw array of data that can be used to mimic an API response
  getRawData() {
    let dataRows = [
      { name: 'Sherlock Holmes', address: '221B Baker Street', alignment: 'Good', extended_details:
        { avatar: 'sherlock.jpg', biography: 'Sherlock Holmes is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a "consulting detective" in the stories, Holmes is known for his proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.' }
      },
      { name: 'Dudley Dursley', address: '4 Privet Drive', alignment: 'Evil' },
      { name: 'Hank Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Good' },
      { name: 'Peggy Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Evil' },
      { name: 'Bobby Hill', address: '84 Rainey Street / Arlen, TX', alignment: 'Good' },
      { name: 'Gandalf Stormcrow', alignment: 'Good', extended_details:
        { avatar: 'gandalf.jpg', biography: 'Gandalf  is a fictional character and one of the protagonists in J. R. R. Tolkien\'s novels The Hobbit and The Lord of the Rings. He is a wizard, member of the Istari order, as well as leader of the Fellowship of the Ring and the army of the West. In The Lord of the Rings, he is initially known as Gandalf the Grey, but returns from death as Gandalf the White.' }
      },
      { name: 'Sauron', address: 'Mordor', alignment: 'Evil' },
      { name: 'Morgoth', address: 'Thangorodrim', alignment: 'Evil' },
      { name: 'Manwe', address: 'Valinor', alignment: 'Good' },
      { name: 'Homer Simpson', address: 'Springfield, Illinois', alignment: 'Neutral', extended_details:
        { avatar: 'homer.jpg', biography: 'Homer Jay Simpson is a fictional character and the main protagonist of the American animated television series The Simpsons as the patriarch of the eponymous family. He is voiced by Dan Castellaneta and first appeared on television, along with the rest of his family, in The Tracey Ullman Show short "Good Night" on April 19, 1987. Homer was created and designed by cartoonist Matt Groening while he was waiting in the lobby of James L. Brooks\' office. Groening had been called to pitch a series of shorts based on his comic strip Life in Hell but instead decided to create a new set of characters. He named the character after his father, Homer Groening. After appearing for three seasons on The Tracey Ullman Show, the Simpson family got their own series on Fox that debuted December 17, 1989.' }
      },
      { name: 'Marge Simpson', address: 'Springfield, Illinois', alignment: 'Good' },
      { name: 'Bart Simpson', address: 'Springfield, Illinois', alignment: 'Evil' },
      { name: 'Lisa Simpson', address: 'Springfield, Illinois', alignment: 'Good', extended_details:
        { avatar: 'lisa.jpg', biography: 'Lisa Marie Simpson is a fictional character in the animated television series The Simpsons. She is the middle child and most intelligent of the Simpson family. Voiced by Yeardley Smith, Lisa first appeared on television in The Tracey Ullman Show short "Good Night" on April 19, 1987. Cartoonist Matt Groening created and designed her while waiting to meet James L. Brooks. Groening had been invited to pitch a series of shorts based on his comic Life in Hell, but instead decided to create a new set of characters. He named the elder Simpson daughter after his younger sister Lisa Groening. After appearing on The Tracey Ullman Show for three years, the Simpson family were moved to their own series on Fox, which debuted on December 17, 1989.' }
      },
      { name: 'Maggie Simpson', address: 'Springfield, Illinois', alignment: 'Neutral' },
      { name: 'Abe Simpson', address: 'Springfield, Illinois', alignment: 'Neutral' },
      { name: 'Mr. Burns', address: 'Burns Manor', alignment: 'Evil' },
      { name: 'Waylon Smithers', address: 'Burns Manor', alignment: 'Neutral' },
      { name: 'Moe Szyslak', address: 'Moe\'s Tavern', alignment: 'Neutral' },
      { name: 'Darth Revan', alignment: 'Evil' },
      { name: 'Spongebob Squarepants', address: 'A Pineapple Under the Sea', alignment: 'Good', extended_details:
        { avatar: 'spongebob.jpg', biography: 'SpongeBob SquarePants is the titular character and protagonist of the American animated television series of the same name. He is voiced by actor and comedian Tom Kenny and first appeared on television in the series\' pilot episode on May 1, 1999.' }
      },
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
      { name: 'Tyrion Lannister', address: 'House Lannister', alignment: 'Good', extended_details:
        { avatar: 'tyrion.jpg', biography: 'Tyrion Lannister (also referred to as "the Imp" or "the Halfman") is a fictional character in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin and its television adaptation Game of Thrones. Based on an idea that came to Martin while writing the 1981 novel Windhaven, Tyrion has been called one of the author\'s finest creations and most popular characters by The New York Times. Martin has named the character as his favorite in the series.' }
      },
      { name: 'Jaime Lannister', address: 'House Lannister', alignment: 'Good' },
      { name: 'Cersei Lannister', address: 'House Lannister', alignment: 'Evil', extended_details:
        { avatar: 'cersei.png', biography: 'Cersei Lannister is a fictional character in the A Song of Ice and Fire series of fantasy novels by American author George R. R. Martin, and its television adaptation Game of Thrones, where she is portrayed by Lena Headey. In the novels, she is a point of view character.' }
      },
      { name: 'Daenerys Targaryen', address: 'House Targaryen', alignment: 'Neutral' },
      { name: 'Jon Snow', address: 'Nights Watch', alignment: 'Good', extended_details:
        { avatar: 'jon.jpg', biography: 'Jon Snow is a fictional character in the A Song of Ice and Fire series of fantasy novels by American author George R. R. Martin, and its television adaptation Game of Thrones. He is a prominent point of view character in the novels, and has been called one of the author\'s "finest creations" and most popular characters by The New York Times. Jon is a main character in the TV series, and his storyline in the 2015 season 5 finale generated a strong reaction among viewers. Speculation about the character\'s parentage has also been a popular topic of discussion among fans of both the books and the TV series.' }
      },
      { name: 'Petyr Baelish', address: 'Kings Landing', alignment: 'Evil' },
      { name: 'Davos Seaworth', address: 'House Baratheon', alignment: 'Neutral' },
      { name: 'Melisandre', address: 'House Baratheon', alignment: 'Evil' },
      { name: 'Sansa Stark', address: 'House Stark', alignment: 'Good', extended_details:
        { avatar: 'sansa.jpg', biography: 'Sansa Stark is a fictional character created by American author George R. R. Martin. She is a prominent character in Martin\'s award-winning A Song of Ice and Fire series.' }
      },
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

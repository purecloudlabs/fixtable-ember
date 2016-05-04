import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      columnDefs: [
        { key: 'name', header: 'Name', width: 200 },
        { key: 'address', header: 'Address' }
      ],
      dataRows: [
        { name: 'Sherlock Holmes ', address: '221B Baker Street' },
        { name: 'Dudley Dursley', address: '4 Privet Drive' },
        { name: 'Hank Hill', address: '84 Rainey Street' },
        { name: 'Gandalf Stormcrow' },
        { name: 'Sauron', address: 'Mordor' },
        { name: 'Morgoth', address: 'Thangorodrim' },
        { name: 'Manwe', address: 'Valinor' },
        { name: 'Homer Simpson', address: 'Springfield, Illinois' },
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
        { name: 'Han Solo', address: 'Coruscant' }
      ]
    };
  }
});

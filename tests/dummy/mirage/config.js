export default function() {
  this.namespace = 'api';

  // handles requests from .findAll and .query on dummy app character model
  this.get('/characters', (schema, request) => {

    // start with all characters (loaded via fixture)
    let characters = schema.characters.all();

    // get all filters received via query string
    let filters = {};
    let filterParams = ['name', 'address', 'alignment'];
    filterParams.forEach(function (filterParam) {
      if (request.queryParams[filterParam]) {
        filters[filterParam] = request.queryParams[filterParam];
      }
    });

    // loop through filters and apply each
    for (let property in filters) {
      let value = filters[property];
      characters = characters.filter(function (character) {
        let characterValue = character[property];
        if (characterValue) {
          return characterValue.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        } else {
          return false;
        }
      });
    }

    let total = characters.length;

    // page data, if requested
    let pageSize = request.queryParams.pageSize;
    let pageNumber = request.queryParams.pageNumber;
    if (pageSize && pageNumber) {
      let startIndex = (pageNumber - 1) * pageSize;
      let endIndex = startIndex + parseInt(pageSize);
      characters = characters.slice(startIndex, endIndex);
    }

    let json = this.serializerOrRegistry.serialize(characters, request);
    json.meta = {total};
    return json;
  });

}

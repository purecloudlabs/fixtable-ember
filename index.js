/* jshint node: true */
'use strict';

module.exports = {
  name: 'fixtable-ember',

  included(app) {
    this._super.included(app);

    var fixtablePath = app.bowerDirectory + '/fixtable/dist/';
    ['fixtable.min.css', 'fixtable.min.js']
      .forEach(fileName => this.app.import(fixtablePath + fileName));
  }
};

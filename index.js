/* jshint node: true */
'use strict';

const fs = require('fs');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

function importFixtable(app) {
  let fixtablePath = path.join(app.bowerDirectory, 'fixtable/dist/');
  app.import({
    development: path.join(fixtablePath, 'fixtable.css'),
    production: path.join(fixtablePath, 'fixtable.min.css')
  });
  app.import({
    development: path.join(fixtablePath, 'fixtable.js'),
    production: path.join(fixtablePath, 'fixtable.min.js')
  });
}

module.exports = {
  name: 'fixtable-ember',

  isDevelopingAddon() {
      return true;
  },

  included(parent) {
    this._super.included.apply(this, arguments);

    // Find the top-level app if this is nested within other addons
    while (parent.app) {
      parent = parent.app;
    }

    let fontAwesomeToImport = fs.readdirSync(`${this.nodeModulesPath}/font-awesome/fonts`);
    fontAwesomeToImport.forEach((fontFileName) => {
      parent.import(path.join('vendor', 'fonts', fontFileName));
    });

    importFixtable(parent);

    parent.import('vendor/styles/fixtable-ember.css');
    parent.import('vendor/styles/font-awesome.css');
  },

  treeForVendor(tree) {
    let treesToMerge = [];
    if (tree) {
      treesToMerge.push(tree);
    }

    let fontAwesomeFunnel = new Funnel(`${this.nodeModulesPath}/font-awesome`, {
      srcDir: 'fonts',
      destDir: 'fonts'
    });
    treesToMerge.push(fontAwesomeFunnel);

    let fontAwesomeCssFunnel = new Funnel(`${this.nodeModulesPath}/font-awesome`, {
      srcDir: 'css',
      files:['font-awesome.css'],
      destDir: 'styles'
    });

    treesToMerge.push(fontAwesomeCssFunnel);

    return mergeTrees(treesToMerge, { overwrite: true });
  }

};

/* jshint node: true */
'use strict';

const fs = require('fs');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'fixtable-ember',

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

    let fixtablePath = path.join(this.nodeModulesPath, 'fixtable/dist/');

    parent.import({
      development: path.join(fixtablePath, 'fixtable.js'),
      production: path.join(fixtablePath, 'fixtable.min.js')
    });

    parent.import('vendor/styles/fixtable-ember.css');
    parent.import('vendor/styles/font-awesome.css');
    parent.import('vendor/styles/fixtable.css');
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

    let fixtableCssFunnel = new Funnel(`${this.nodeModulesPath}/fixtable`, {
      srcDir: 'dist',
      files: ['fixtable.css'],
      destDir: 'styles'
    });
    treesToMerge.push(fixtableCssFunnel);

    return mergeTrees(treesToMerge, { overwrite: true });
  }

};

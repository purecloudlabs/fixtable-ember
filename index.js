/* eslint-env node */
'use strict';

const fs = require('fs');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'fixtable-ember',

  included() {
    this._super.included.apply(this, arguments);

    let fontAwesomeToImport = fs.readdirSync(`${this.nodeModulesPath}/font-awesome/fonts`);
    fontAwesomeToImport.forEach((fontFileName) => {
      this.import(path.join('vendor', 'fonts', fontFileName));
    });

    this.import(path.join(this.nodeModulesPath, 'fixtable/dist/fixtable.js'));

    this.import('vendor/styles/fixtable-ember.css');
    this.import('vendor/styles/font-awesome.css');
    this.import('vendor/styles/fixtable.css');
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

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
    let fa = path.dirname(require.resolve('font-awesome/fonts/FontAwesome.otf'));
    let fontAwesomeToImport = fs.readdirSync(fa);
    fontAwesomeToImport.forEach((fontFileName) => {
      this.import(path.join('vendor', 'fonts', fontFileName));
    });

    this.import(require.resolve('fixtable/dist/fixtable.js'));
    this.import('vendor/styles/fixtable-ember.css');
    this.import('vendor/styles/font-awesome.css');
    this.import('vendor/styles/fixtable.css');
  },

  treeForVendor(tree) {
    let treesToMerge = [];
    if (tree) {
      treesToMerge.push(tree);
    }

    let fontAwesomeFunnel = new Funnel(path.dirname(require.resolve('font-awesome/fonts/FontAwesome.otf')), {
      destDir: 'fonts'
    });
    treesToMerge.push(fontAwesomeFunnel);

    let fontAwesomeCssFunnel = new Funnel(path.dirname(require.resolve('font-awesome/css/font-awesome.css')), {
      files:['font-awesome.css'],
      destDir: 'styles'
    });
    treesToMerge.push(fontAwesomeCssFunnel);

    let fixtableCssFunnel = new Funnel(path.dirname(require.resolve('fixtable/dist/fixtable.js')), {
      files: ['fixtable.css'],
      destDir: 'styles'
    });
    treesToMerge.push(fixtableCssFunnel);

    return mergeTrees(treesToMerge, { overwrite: true });
  },

  isDevelopingAddon() {
    return false;
  }

};

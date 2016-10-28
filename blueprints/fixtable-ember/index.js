module.exports = {
  normalizeEntityName: function() {},

  afterInstall() {
    return this.addBowerPackageToProject('fixtable');
  }
};

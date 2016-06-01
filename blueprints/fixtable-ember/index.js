module.exports = {
  normalizeEntityName: function() {},

  afterInstall() {
    return this.addBowerPackageToProject('font-awesome')
      .then(() => this.addBowerPackageToProject('fixtable'));
  }
};

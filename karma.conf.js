module.exports = function(config) {
  config.set({
    basePath: './build-spec',
     files: ['*.js'],
     reporters: ['progress'],
    frameworks: ['jasmine']
  });
};

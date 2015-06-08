module.exports = function(config) {
  config.set({
    basePath: './build-spec',
     files: ['*.js'],
      frameworks: ['jasmine'],
      reporters: ['mocha'],
      plugins: [
          'karma-jasmine',
          'karma-mocha-reporter'
      ]
  });
};

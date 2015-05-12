/*
Build a bundled app.js file using browserify
*/
module.exports = function(grunt) {

  var async = require("async");
  var browserify = require("browserify");
  var exorcist = require("exorcist");
  var babel = require("babelify");
  var fs = require("fs");

  var bundles = [
    { src: "./src/js/main.js", dest: "build/app.js" },
    { src: "./src/js/widget.js", dest: "build/widget.js" }
  ];

  grunt.registerTask("bundle", "Build app.js using browserify", function(mode) {
    //run in dev mode unless otherwise specified
    mode = mode || "dev";
    var done = this.async();

    async.each(bundles, function(config, c) {

      var b = browserify({ debug: mode == "dev" });
      b.transform(babel);

      //make sure build/ exists
      grunt.file.mkdir("build");
      var output = fs.createWriteStream(config.dest);

      b.add(config.src);
      var assembly = b.bundle();
      if (mode == "dev") {
        //output sourcemap
        assembly = assembly.pipe(exorcist(config.dest + ".map"));
      }
      assembly.pipe(output).on("finish", function() {
        c();
      });

    }, done);

  });

};

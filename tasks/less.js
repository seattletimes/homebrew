/*

Run the LESS compiler against seed.less and output to style.css.

*/

var async = require("async");

module.exports = function(grunt) {

  var less = require("less");
  
  var options = {
    paths: ["src/css"],
    filename: "seed.less"
  };
  
  grunt.registerTask("less", function() {
    
    var done = this.async();

    var seeds = [
      { src: "src/css/seed.less", dest: "build/style.css" },
      { src: "src/css/widget.less", dest: "build/widget.css" }
    ];
    
    async.each(seeds, function(config, c) {
      console.log("Building %s...", config.src);
      var seed = grunt.file.read(config.src);
    
      less.render(seed, options, function(err, result) {
        if (err) {
          grunt.fail.fatal(err.message + " - " + err.filename + ":" + err.line);
        } else {
          grunt.file.write(config.dest, result.css);
        }
        c();
      });
    }, done);
    
  });

};
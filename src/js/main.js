//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");

var dot = require("dot");
dot.templateSettings.varname = "data";
dot.templateSettings.selfcontained = true;
dot.templateSettings.evaluate = /<%([\s\S]+?)%>/g;
dot.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

var template = dot.template(require("./_dots.html"));

var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
var html = template({
  sections: sections.map(function(section) {
    var title = section.querySelector("h1, h2, h3");
    return {
      title: title ? title.innerHTML : ""
    };
  })
});

// console.log(html);
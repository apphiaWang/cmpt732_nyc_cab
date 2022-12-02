// const dependencies = ['https://code.jquery.com/jquery-3.6.0.min.js',
// "https://cdn.jsdelivr.net/npm/d3-dsv@3"];
// dependencies.forEach(src => {
//   const script = document.createElement('script');
//   script.src = src;
//   document.getElementsByTagName('head')[0].appendChild(script);
// })

(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);

document.addEventListener("DOMContentLoaded", () => {  

    if ($('#heatmap-00').length) {
      drawHeatmap("heatmap-00");
    }
    if ($('#bar-00').length) {
      drawBarTip("bar-00", "yellow");
    }
    if ($('#bar-01').length) {
      drawBarTip("bar-01", "green");
    }
    if ($('#line-00').length) {
      drawLineTip("line-00");
    }

});

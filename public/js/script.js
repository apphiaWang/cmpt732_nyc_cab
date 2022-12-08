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
// initialize url
if (!window.myUrl) {
  const url = window.location.href;
  window.myUrl = url.split("/").slice(0,4).join("/");
}
document.addEventListener("DOMContentLoaded", () => {
    if ($('#heatmap-00').length) {
      drawHeatmap("heatmap-00");
    }
    if ($('#heatmap-01').length) {
      drawHeatmap("heatmap-01", "max_amount");
    }
    if ($('#heatmap-10').length) {
      drawHeatmap("heatmap-10", "count");
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

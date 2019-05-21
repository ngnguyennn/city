// credit http://jsfiddle.net/bu7rd/

// Global variables
var globals = {
  diameter: 150,
  layers: 10,
  thickness: 15
};
var moment = { ids: ['a', 'b', 'c'], id: 'a'} ;

// Verify that the mouse event wasn't triggered by a descendant.
function verifyMouseEvent(e, elem) {
  e = e || window.event;
  var related = e.relatedTarget || e.toElement;

  while (
    related != undefined &&
    related != elem &&
    related.nodeName != "BODY"
  ) {
    related = related.parentNode;
  }
  return related != elem;
}

// Create the spotlight
function createSpotlight() {
  $(".spotlight")
    .width(globals.diameter + "px")
    .height(globals.diameter + "px");

  for (var i = 0; i < globals.layers; i++) {
    var layerDiameter = globals.diameter + i * globals.thickness * 2;
    var opacity = 1 - i / globals.layers;

    $(".spotlight").append('<div class="layer' + i + '"></div>');

    $(".spotlight .layer" + i)
      .width(layerDiameter + "px")
      .height(layerDiameter + "px")
      .css({
        borderRadius: (layerDiameter >> 1) + "px",
        opacity: opacity,
        zIndex: globals.layers - i
      });
  }
}

function mouseMoveHandler(e) {
  var center = { x: e.pageX - this.offsetLeft, y: e.pageY - this.offsetTop };
  var x = center.x - (globals.diameter >> 1);
  var y = center.y - (globals.diameter >> 1);

  for (var i = 0; i < globals.layers; i++) {
    var offset = i * globals.thickness;
    $("#" + e.currentTarget.id + " .spotlight .layer" + i).css({
      left: -offset + "px",
      top: -offset + "px",
      backgroundPosition: -(x - offset) + "px " + -(y - offset) + "px"
    });
  }
  $("#" + e.currentTarget.id + " .spotlight")
    .css({ left: x + "px", top: y + "px" })
    .show();
}

function mouseOutHandler(e) {
  if (!verifyMouseEvent(e, this)) return;
  $("#" + e.currentTarget.id + " .spotlight").hide();
}

function changeSlide(e, index) {
  
}

$(document).ready(function() {
  createSpotlight();
  $(".content").mousemove(mouseMoveHandler);
  $(".content").mouseout(mouseOutHandler);
  
  $("#on-hover")[0].style.display = "block";
  $("#side-to-side")[0].style.display = "none";

  $("#oh-btn").click(function(e) {
    $("#on-hover")[0].style.display = "block";
    $("#side-to-side")[0].style.display = "none";
  });
  $("#s2s-btn").click(function(e) {
    $("#on-hover")[0].style.display = "none";
    $("#side-to-side")[0].style.display = "block";
  });
});

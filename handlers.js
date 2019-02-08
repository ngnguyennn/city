// credit http://jsfiddle.net/bu7rd/

// Global variables
var spotlightDiameter = 60;
var numSpotlightLayers = 6;
var spotlightLayerThickness = 14;

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
    .width(spotlightDiameter + "px")
    .height(spotlightDiameter + "px");

  for (var i = 0; i < numSpotlightLayers; i++) {
    var layerDiameter = spotlightDiameter + i * spotlightLayerThickness * 2;
    var opacity = 1 - i / numSpotlightLayers;

    $(".spotlight").append('<div class="layer' + i + '"></div>');

    $(".spotlight .layer" + i)
      .width(layerDiameter + "px")
      .height(layerDiameter + "px")
      .css({
        borderRadius: (layerDiameter >> 1) + "px",
        opacity: opacity,
        zIndex: numSpotlightLayers - i
      });
  }
}

function mouseMoveHandler(e) {
  var center = { x: e.pageX - this.offsetLeft, y: e.pageY - this.offsetTop };
  var x = center.x - (spotlightDiameter >> 1);
  var y = center.y - (spotlightDiameter >> 1);

  for (var i = 0; i < numSpotlightLayers; i++) {
    var offset = i * spotlightLayerThickness;
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

$(document).ready(function() {
  createSpotlight();
  $(".content").mousemove(mouseMoveHandler);
  $(".content").mouseout(mouseOutHandler);
});

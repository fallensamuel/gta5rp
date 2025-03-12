/*var browser = new Vue(
{
      el: "#renderedBrowser",
      data: { render: true }
});*/

const safeZone = {
    update: function(screenWidht, screenHeight, safeZoneSize) {

        var savezoneDiv = document.getElementById("safezone");
        safeZoneSize = (((1.0 - safeZoneSize) * 0.5) * 100.0);

        savezoneDiv.style.right = savezoneDiv.style.left = ((screenWidht / 100) * safeZoneSize) + "px";
        savezoneDiv.style.top = savezoneDiv.style.bottom = ((screenHeight / 100) * safeZoneSize) + "px";
    }
}

function scaling() {
  let defaultHeight = 1080;
  let currentHeight = window.innerHeight;
  let scaleCoefficient = currentHeight / defaultHeight;
  document.documentElement.style.setProperty('--scale-coefficient', scaleCoefficient);
  $(window).trigger( "onscaled" );
}
window.onload = () => {
  scaling();
};
window.onresize = () => {
  scaling();
};

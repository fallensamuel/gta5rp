module.exports = {
    Init: () => {
        createDrivingSchoolMarker();
    }
}

function createDrivingSchoolMarker() {
    var pos = new mp.Vector3(228.45, 373.37, 106.11-1);
    var marker = mp.markers.new(1, pos, 1, {
        color: [187, 255, 0, 70],
        visible: false
    });

    var blip = mp.blips.new(545, pos, {
        color: 26,
        name: "Автошкола",
        shortRange: 10,
        scale: 1
    });
    marker.blip = blip;

    //для стриминга
    var colshape = mp.colshapes.newCircle(pos.x, pos.y, 60);
    colshape.marker = marker;
    marker.showColshape = colshape;

    //для отловки события входа
    var colshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 2);
    colshape.drivingSchool = marker;
    marker.colshape = colshape;
    colshape.menuName = `enter_driving_school`;
}

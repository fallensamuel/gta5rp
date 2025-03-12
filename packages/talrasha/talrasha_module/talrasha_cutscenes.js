module.exports = {
    Init: () => {
        mp.cutscenes = {};
        DB.Handle.query("SELECT * FROM talrasha_cutscene", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                result[i].points = [];
                mp.cutscenes[result[i].id] = result[i];
                initCutsceneUtils(result[i]);
            }
			console.log(`\x1b[32m[DONE]\x1b[0m "Cutscenes" package has been loaded: \x1b[33m${i}\x1b[0m.`);

            DB.Handle.query("SELECT * FROM talrasha_cutscene_point", (e, result) => {
                for (var i = 0; i < result.length; i++) {
                    var point = result[i];
                    point.startPosition = JSON.parse(result[i].startPosition);
                    point.endPosition = JSON.parse(result[i].endPosition);
                    point.startRotation = JSON.parse(result[i].startRotation);
                    point.endRotation = JSON.parse(result[i].endRotation);

                    var cutscene = mp.cutscenes[point.cutsceneId];
                    cutscene.points.push(point);
                }
            });
        });
    }
}

function initCutsceneUtils(cutscene) {
    cutscene.setName = (name) => {
        cutscene.name = name;
        DB.Handle.query("UPDATE talrasha_cutscene SET name=? WHERE id=?", [cutscene.name, cutscene.id]);
    };
    cutscene.setFinalText = (text) => {
        cutscene.finalText = text;
        DB.Handle.query("UPDATE talrasha_cutscene SET finalText=? WHERE id=?", [cutscene.finalText, cutscene.id]);
    };
    cutscene.setPointText = (index, text) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.text = text;
        DB.Handle.query("UPDATE talrasha_cutscene_point SET text=? WHERE id=?", [p.text, p.id]);
    };
    cutscene.setPointSpeed = (index, speed) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.speed = Math.clamp(speed, 1, 50);
        DB.Handle.query("UPDATE talrasha_cutscene_point SET speed=? WHERE id=?", [p.speed, p.id]);
    };
    cutscene.setPointStartPositon = (index, pos) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.startPosition = pos;
        DB.Handle.query("UPDATE talrasha_cutscene_point SET startPosition=? WHERE id=?", [JSON.stringify(p.startPosition), p.id]);
    };
    cutscene.setPointEndPositon = (index, pos) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.endPosition = pos;
        DB.Handle.query("UPDATE talrasha_cutscene_point SET endPosition=? WHERE id=?", [JSON.stringify(p.endPosition), p.id]);
    };
    cutscene.setPointStartRotation = (index, rot) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.startRotation = rot;
        DB.Handle.query("UPDATE talrasha_cutscene_point SET startRotation=? WHERE id=?", [JSON.stringify(p.startRotation), p.id]);
    };
    cutscene.setPointEndRotation = (index, rot) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        p.endRotation = rot;
        DB.Handle.query("UPDATE talrasha_cutscene_point SET endRotation=? WHERE id=?", [JSON.stringify(p.endRotation), p.id]);
    };
    cutscene.addPoint = (speed, text) => {
        speed = Math.clamp(speed, 1, 50);
        DB.Handle.query("INSERT INTO talrasha_cutscene_point (speed,text,cutsceneId) VALUES (?,?,?)",
            [speed, text, cutscene.id], (e, result) => {
                var point = {
                    id: result.insertId,
                    startPosition: new mp.Vector3(0, 0, 0),
                    endPosition: new mp.Vector3(0, 0, 0),
                    startRotation: new mp.Vector3(0, 0, 0),
                    endRotation: new mp.Vector3(0, 0, 0),
                    speed: speed,
                    text: text,
                    cutsceneId: cutscene.id
                };
                cutscene.points.push(point);
            });
    };
    cutscene.deletePoint = (index) => {
        index = Math.clamp(index, 0, cutscene.points.length - 1);
        var p = cutscene.points[index];
        if (!p) return;
        DB.Handle.query("DELETE FROM talrasha_cutscene_point WHERE id=?", p.id);
        cutscene.points.splice(index, 1);
    };
}

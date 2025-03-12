module.exports = {
    Init: () => {
        DB.Handle.query("SELECT * FROM talrasha_job", (e, result) => {
            for (var i = 0; i < result.length; i++) {
                result[i].sqlId = result[i].id;
                delete result[i].id;

                initJobUtils(result[i]);
            }

            mp.jobs = result;
			console.log(`\x1b[32m[DONE]\x1b[0m "Jobs" package has been loaded: \x1b[33m${i}\x1b[0m.`);

            initJobsUtils();
        });
    }
}

function initJobsUtils() {
    mp.jobs.getBySqlId = (sqlId) => {
        for (var i = 0; i < mp.jobs.length; i++) {
            if (mp.jobs[i].sqlId == sqlId) return mp.jobs[i];
        }
        return null;
    };
}

function initJobUtils(job) {
    job.setName = (name) => {
        job.name = name;
        DB.Handle.query("UPDATE talrasha_job SET name=? WHERE id=?", [job.name, job.sqlId]);
    };
    job.setLevel = (level) => {
        job.level = Math.clamp(level, 1, 200);
        DB.Handle.query("UPDATE talrasha_job SET level=? WHERE id=?", [job.level, job.sqlId]);
    };
}

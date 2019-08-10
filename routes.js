'use strict';

const appRouter = function(app) {

    const apiVersion = 'v1';

    app.get("/" + apiVersion + "/jukeboxes/:settingId", function(req, res) {
        const optional_params = {
            "model": "*",
            "offset": 0,
            "limit": 20
        }
        // Check for optional parameters
        if (req.query.model) {
            optional_params.model = req.query.model;
        }
        if (req.query.offset) {
            const offset = parseInt(req.query.offset);
            if (offset === offset) {
                optional_params.offset = offset;
            } else {
                // NaN
                return res.send({"status": "error", "message": "offset not numeric"});
            }
        }
        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            if (limit === limit) {
                optional_params.limit = limit;
            } else {
                // NaN
                return res.send({"status": "error", "message": "limit not numeric"});
            }
        }
        return res.send(optional_params);
    });
}

module.exports = appRouter;

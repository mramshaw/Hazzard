'use strict';

const results = require('./jukeboxes.js');

const appRouter = function(app) {

    const apiVersion = 'v1';

    app.get('/' + apiVersion + '/jukeboxes/:settingId', function(req, res) {

        const optional_params = {
            'model': '*',
            'offset': 0,
            'limit': 20
        }

        // Check optional parameters

        if (req.query.model) {
            optional_params.model = req.query.model;
        }

        if (req.query.offset) {
            const offset = parseInt(req.query.offset);
            if (offset === offset) {
                optional_params.offset = offset;
            } else {
                // NaN
                return res.send({'status': 'error', 'message': 'offset not numeric'});
            }
        }

        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            if (limit === limit) {
                if (limit < 1) {
                    return res.send({'status': 'error', 'message': 'limit must be 1 or greater'});
                } else {
                    optional_params.limit = limit;
                }
            } else {
                // NaN
                return res.send({'status': 'error', 'message': 'limit not numeric'});
            }
        }

        // Optional parameters are okay

        results(req.params.settingId, optional_params.model, optional_params.offset, optional_params.limit, function(err, jukeboxes) {
            if (typeof err !== 'undefined' && err) {
                if (err.message && err.message === 'setting not found') {
                    return res.status(404).send(err);
                } else {
                    console.error('routes.js, appRouter, error: ' + err);
                    return res.send(err);
                }
            } else {
                return res.send(jukeboxes);
            }
        });
    });
}

module.exports = appRouter;

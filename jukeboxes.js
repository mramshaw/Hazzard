'use strict';

const superagent = require('superagent');

const getMatchingJukes = function(settingId, model, offset, limit, callback) {

    // Start with requested setting

    const settingUrl = 'http://my-json-server.typicode.com/touchtunes/tech-assignment/settings';

    (async () => {
        try {
            // This could probably be cached except that we don't know how often it's updated
            const res = await superagent.get(settingUrl);
            let matched = false;
            for (const i in res.body.settings) {    
                if (res.body.settings[i].id === settingId) {
                    matched = true;
                    getJukes(res.body.settings[i].requires, model, offset, limit, function(err, jukeboxes) {
                        if (typeof err !== 'undefined' && err) { 
                            callback(err, null);
                            return
                        } else {
                            callback(null, jukeboxes);
                            return
                        }
                    });
                    break;
                }
            }
            if (!matched) {
                // Short-circuit processing
                callback({'status': 'error', 'message': 'setting not found'}, null);
                return;
            }
        } catch (err) {
            callback(err, null);
            return;
        }
    })();
}

const getJukes = function(requirements, model, offset, limit, callback) {

    // Check for matching jukeboxes

    const matchingJukes = [];

    let matchingCount = 0;

    let jukesUrl = 'http://my-json-server.typicode.com/touchtunes/tech-assignment/jukes';

    if (model === '*') {
        // Wildcard
    } else {
        jukesUrl = jukesUrl + '?model=' + model;
    }

    (async () => {
        try {
            const res = await superagent.get(jukesUrl)
            for (const i in res.body) {    

                if (matchingJukes.length === limit) {
                    // Limit matched, short-circuiting
                    break;
                }

                if (requirements.length > 0) {
                    if (res.body[i].components.length < requirements.length) {
                        // Skip
                    } else {
                        let requirementMatches = 0;
                        const itemComponents = res.body[i].components;
                        for (const j in requirements) {
                            spliced: for (const k in itemComponents) {
                                const comp = itemComponents[k];
                                if (comp.name === requirements[j]) {
                                    itemComponents.splice(k, 1);
                                    requirementMatches += 1;
                                    break spliced;
                                }
                            }
                        }
                        if (requirementMatches === requirements.length) {
                            if (matchingCount < offset) {
                                // ignore
                            } else {
                                matchingJukes.push(res.body[i]);
                            }
                            matchingCount += 1;
                        }
                    }

                } else { // No requirements, everything matches

                    if (matchingCount < offset) {
                        // ignore
                    } else {
                        matchingJukes.push(res.body[i]);
                    }
                    matchingCount += 1;
                }
            }

            return callback(null, matchingJukes);

        } catch (err) {
            callback(err, null);
            return;
        }
    })();
}

module.exports = getMatchingJukes;

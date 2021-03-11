var Works = require('../models/workModel');

function getWorks(res) {
    Works.find(function(err, data) {
        if (err) res.status(500).json(err);
        else res.json(data);
    });
};

module.exports = function(app) {
    app.get('/api/works', function(req, res) {
        getWorks(res);
    });

    // app.get('/api/todo/:id', function(req, res) {
    //     Works.findById({__id: req.params.id, function(err, data) {
    //         if (err) return res.status(500).json(err);
    //         else res.json(data);
    //     }});
    // });

    app.post('/api/work', function(req, res) {
        var work = {
            text: req.body.text,
            status: req.body.status
        };

        Works.create(work, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });

    app.put('/api/work', function(req, res) {
        if (!req.body._id) {
            res.status(500).send('ID is required!!!');
        }
        Works.update({_id: req.body._id}, {
            text: req.body.text,
            status: req.body.status
        }, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });

    app.delete('/api/work/:id', function(req, res) {
        Works.remove({_id: req.params.id}, function(err, data) {
            if (err) return res.status(500).json(err);
            else getWorks(res);
        });
    });
}
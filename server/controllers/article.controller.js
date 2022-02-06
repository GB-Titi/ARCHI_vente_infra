const Articles = require("../models/article.model.js");

exports.findAll = (req, res) => {
    const label = req.query.label;

    Articles.getAll(label, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Fail to retreive Articles."
            });
        else res.send(data);
    });
};
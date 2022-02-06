module.exports = app => {
    const articles = require('../controllers/article.controller.js')
    var router = require("express").Router();

    // Retrieve all Articles
    router.get("/", articles.findAll);
    app.use('/api/articles', router);

}
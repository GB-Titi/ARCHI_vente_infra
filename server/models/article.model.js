const sql = require("./db.js");

const Article = function (article) {
    this.id = article.id;
    this.label = article.label;
    this.ref = article.ref;
    this.price = article.price;
    this.img = article.img;
};

Article.getAll = (title, result) => {
    let query = "SELECT * FROM products";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("articles: ", res);
        result(null, res);
    });
};

module.exports = Article;

const connection = require("../config/db");
class IndexController {
  showHome = (req, res) => {
    let sql = "SELECT * FROM collector WHERE collector_isdeleted = 0";
    connection.query(sql, (err, result) => {
      res.render("index", { result, title: "Coleccionalia" });
    });
  };
}

module.exports = new IndexController();

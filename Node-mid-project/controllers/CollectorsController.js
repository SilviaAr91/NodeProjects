const connection = require("../config/db");
const bcrypt = require("bcrypt");

class CollectorsController {
  getAllItemsFromCollector = (req, res) => {
    const id = req.params.id;
    let sql = `SELECT i.*, c.collector_id AS col_id, c.name AS collector_name, c.col_description, c.email, c.phone_number, c.profile_pic FROM item as i RIGHT JOIN collector AS c ON c.collector_id = i.collector_id WHERE c.collector_id=${id};`;
    connection.query(sql, (err, result) => {
      console.log(result);
      res.render("collector", {
        result,
        title: `Colección de ${result[0].collector_name}`,
      });
    });
  };
  showFormAddCollector = (req, res) => {
    res.render("collectorsRegistration", { title: "Registro" });
  };
  addCollector = (req, res) => {
    const {
      name,
      main_interest,
      phone_number,
      email,
      password,
      col_description,
    } = req.body;
    if (
      name == "" ||
      phone_number == "" ||
      main_interest == "" ||
      email == "" ||
      password == ""
    ) {
      return res.render("collectorsRegistration", {
        message: "Debes rellenar todos los campos",
      });
    }
    let img = "default.jpg";
    if (req.file != undefined) {
      img = req.file.filename;
    }

    let salt = 10;
    bcrypt.hash(password, salt, (err, hash) => {
      let sql = `INSERT INTO collector (name, main_interest,phone_number, email, password, col_description, profile_pic) 
    VALUES ("${name}", "${main_interest}", "${phone_number}",  "${email}", "${hash}", "${col_description}", "${img}")`;
      connection.query(sql, (err, result) => {
        console.log(result);
        if (err) {
          if (err.errno == 1062) {
            res.render("collectorsRegistration", {
              title: "Formulario de Registro",
              message: "Email usado, usa otro por favor",
            });
          } else {
            res.render("collectorsRegistration", {
              title: "Formulario de Registro",
              message: "Error en DB",
            });
          }
        }
        res.redirect(`http://localhost:3000#miembros`);
      });
    });
  };
  showLogin = (req, res) => {
    res.render("login", { title: "Inicio de sesión" });
  };
  login = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM collector WHERE email="${email}" AND collector_isdeleted=0`;
    if (email == "" || password == "") {
      return res.render("login", {
        message: "debes rellenar todos los datos",
      });
    }

    connection.query(sql, [email], (err, result) => {
      console.log(result);
      if (err) throw err;
      if (result.length > 0) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            res.redirect(`/collector/${result[0].collector_id}`);
          } else {
            res.render("login", {
              message: "credenciales incorrectas",
            });
          }
        });
      } else {
        res.render("login", {
          message: "credenciales incorrectas",
        });
      }
    });
  };
}

module.exports = new CollectorsController();

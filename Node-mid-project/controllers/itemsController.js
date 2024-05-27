const connection = require("../config/db");

class ItemsController {
  addItem(req, res) {
    const collector_id = req.params.id;
    console.log(collector_id);

    const { name, acquisition_date, description } = req.body;
    let sql;

    if (req.file) {
      sql = `INSERT INTO item (name, acquisition_date, description, collector_id, img) 
             VALUES ("${name}", "${acquisition_date}", "${description}", ${collector_id}, "${req.file.filename}")`;
    } else {
      sql = `INSERT INTO item (name, acquisition_date, description, collector_id) 
             VALUES ("${name}", "${acquisition_date}", "${description}", ${collector_id})`;
    }

    connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error al insertar el elemento:", err);
        return res.status(500).send("Error interno del servidor");
      }
      res.redirect(`/collector/${collector_id}`);
    });
  }

  showEditItem(req, res) {
    const { collectorId, itemId } = req.params;
    let sql = `SELECT * FROM item WHERE item_id = ${itemId} AND collector_id = ${collectorId} AND item_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.error("Error al obtener el elemento:", err);
        return res.status(500).send("Error interno del servidor");
      }
      res.render("formEditItem", { collectorId: collectorId, result: result });
    });
  }

  editItem(req, res) {
    const { collectorId, itemId } = req.params;
    const { name, acquisition_date, description } = req.body;

    console.log(itemId); // Agregar esta línea para imprimir itemId en la consola

    // Consulta SQL para actualizar el elemento en la base de datos
    let sql = `UPDATE item SET name = "${name}", acquisition_date = "${acquisition_date}", description = "${description}" where item_id =${itemId}  AND item_isdeleted = 0`;

    // Ejecutar la consulta de actualización
    connection.query(sql, (err, result) => {
      // Si hay un error, lanzarlo
      if (err) {
        console.error("Error al editar el elemento:", err);
        return res.status(500).send("Error interno del servidor");
      }

      // Redireccionar a la página de detalles del elemento
      res.redirect(`/collector/${collectorId}`);
    });
  }
  deleteItem = (req, res) => {
    const { itemId, collectorId } = req.params;
    let sql = `DELETE from item WHERE item_id = ${itemId}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/collector/${collectorId}`);
    });
  };
  searchItem = (req, res) => {
    const { q } = req.query;

    const sql = `SELECT * FROM item WHERE LOWER(name) LIKE LOWER('%${q}%')`;

    connection.query(sql, (err, results) => {
      console.log(results);
      if (err) {
        console.error(err);
        return res.status(500).send("Error al realizar la búsqueda");
      }
      res.render("searchResults", {
        results: results,
        title: "resultados de Búsqueda",
      });
    });
  };
}
module.exports = new ItemsController();

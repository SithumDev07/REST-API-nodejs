const sql = require("./db.js");

const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Created tutorial", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Tutorial", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Tutorial.findAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log("Tutorials", res);
    result(null, res);
  });
};

module.exports = Tutorial;

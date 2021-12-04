const Tutorial = require("../model/tutorial.model");

exports.create = (req, res) => {
  //* Validate Request
  if (!req.body) {
    res.status(404).send({
      message: "Content Cannot be empty",
    });
  }

  //* Create Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  //* Save data in the databasae
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured during the operation",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByID = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tutorial not found for id: ${req.params.id}`,
        });
      }
    } else res.send(data);
  });
};

exports.getAll = (req, res) => {
  const title = req.query.title;
  Tutorial.findAll(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    } else res.send(data);
  });
};

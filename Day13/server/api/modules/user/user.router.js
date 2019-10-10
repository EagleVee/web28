const express = require("express");
const router = express.Router();
const service = require("./user.service");

router.get("/", async function(req, res) {
  try {
    const data = await service.find(req.query);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.get("/:id", async function(req, res) {
  try {
    const data = await service.findById(req.params.id);
    res.status(200).send({
      data: data
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.post("/", async function(req, res) {
  try {
    const data = await service.create(req.body);
    res.status(200).send({
      data: data
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.put("/:id", async function(req, res) {
  try {
    const data = await service.update(req.params.id, req.body);
    res.status(200).send({
      data: data
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.delete("/:id", async function(req, res) {
  try {
    const data = await service.find(req.params.id);
    res.status(200).send({
      data: data
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
});

router.post("/mass-create", async function(req, res) {
  try {
    for (let i = 0; i < 100; i++) {
      const data = await service.create({
        name: `User${i}`,
        email: `nnavu${i}@gmail.com`
      });
    }
    res.end("OK");
  } catch (err) {}
});

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("./userController");

// CREATE
router.post("/", controller.create);

// READ ALL
router.get("/", controller.list);

// READ BY ID
router.get("/:id", controller.getById);

// UPDATE
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.remove);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getSingleItem,
  deleteItem,
  deleteAllItems,
  updateItem,
} = require("../controllers/trackerControllers");

// Get all items
router.get("/", getItems);

// Create a new item
router.post("/", createItem);

// Get a specific item
router.get("/:id", getSingleItem);

// DELETE a specific item
router.delete("/:id", deleteItem);

// DELETE ALL
router.delete("/delete-all", deleteAllItems);

// PATCH a specific item
router.patch("/:id", updateItem);

module.exports = router;

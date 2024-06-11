const Tracker = require("../models/trackerModel");
const mongoose = require("mongoose");

// Get all items
const getItems = async (req, res) => {
  const items = await Tracker.find({}).sort({ createdAt: -1 });
  res.status(200).json(items);
};

// Get specific item
const getSingleItem = async (req, res) => {
  const { id } = req.params;

  // this method checks if the id that we got is valid in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const item = await Tracker.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

// Post item
const createItem = async (req, res) => {
  const { itemName, protein, fat, calories, carbs } = req.body;

  let emptyFields = [];

  if (!itemName) {
    emptyFields.push("Item Name");
  }
  if (!protein) {
    emptyFields.push("Protein");
  }
  if (!calories) {
    emptyFields.push("Calories");
  }
  if (!fat) {
    emptyFields.push("Fat");
  }
  if (!carbs) {
    emptyFields.push("Carbs");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const tracker = await Tracker.create({
      itemName,
      protein,
      fat,
      calories,
      carbs,
    });
    res.status(200).json(tracker);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  // this method checks if the id that we got is valid in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const item = await Tracker.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

// DELETE ALL items
const deleteAllItems = async (req, res) => {
  try {
    await Tracker.deleteMany({});
    res.status(200).json({ message: "All workouts deleted" });
  } catch (error) {
    res.status(404).json({ error: "Failed to delete all workouts" });
  }
};

// Update item
const updateItem = async (req, res) => {
  const { id } = req.params;

  // this method checks if the id that we got is valid in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  // 1st param - checks the id
  // 2nd param - what is being updated
  const item = await Tracker.findOneAndUpdate(
    { _id: id },
    {
      //  req.body is an object of the data we send to the server
      // spread the req.body to all updates to all the data sent
      ...req.body,
    }
  );

  if (!item) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
module.exports = {
  createItem,
  getItems,
  getSingleItem,
  deleteItem,
  deleteAllItems,
  updateItem,
};

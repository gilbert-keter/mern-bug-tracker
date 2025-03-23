const Bug = require("../models/Bug");
const { validateBugData } = require("../utils/validation");

// Get all bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({});
    res.status(200).json({ success: true, count: bugs.length, data: bugs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get single bug
const getBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ success: false, error: "Bug not found" });
    }

    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Create new bug
const createBug = async (req, res) => {
  try {
    // Validate bug data
    const { isValid, error } = validateBugData(req.body);

    if (!isValid) {
      return res.status(400).json({ success: false, error });
    }

    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Update bug
const updateBug = async (req, res) => {
  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ success: false, error: "Bug not found" });
    }

    bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Delete bug
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ success: false, error: "Bug not found" });
    }

    await bug.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = {
  getAllBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
};

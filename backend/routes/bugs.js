const express = require("express");
const router = express.Router();
const {
  getAllBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");

router.route("/").get(getAllBugs).post(createBug);
router.route("/:id").get(getBug).patch(updateBug).delete(deleteBug);

module.exports = router;

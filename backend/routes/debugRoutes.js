const express = require("express");
const router = express.Router();

// Route with intentional error for debugging practice
router.get("/error", (req, res) => {
  // Intentional error - trying to access property of undefined
  const user = undefined;
  const username = user.name; // This will throw an error

  res.status(200).json({ success: true, data: username });
});

// Route with memory leak for debugging practice
router.get("/memory-leak", (req, res) => {
  // Intentional memory leak - creating a large array
  const bigArray = [];
  const iterations = 1000000;

  for (let i = 0; i < iterations; i++) {
    bigArray.push({
      index: i,
      data: "This is a memory leak example".repeat(100),
    });
  }

  res.status(200).json({ success: true, message: "Memory leak triggered" });
});

// Route with async error for debugging practice
router.get("/async-error", (req, res) => {
  // Promise without proper error handling
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Async error example"));
    }, 100);
  }).then((data) => {
    res.status(200).json({ success: true, data });
  });
  // Missing .catch() handler
});

module.exports = router;

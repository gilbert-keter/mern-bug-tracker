const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const Bug = require("../models/Bug");

let mongoServer;

// Set up MongoDB Memory Server before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Clear the database between tests
beforeEach(async () => {
  await Bug.deleteMany({});
});

// Close connection and server after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Bug API Routes", () => {
  const sampleBug = {
    title: "Test Bug",
    description: "This is a test bug",
    status: "open",
    severity: "medium",
    createdBy: "Test User",
  };

  describe("GET /api/bugs", () => {
    test("should return all bugs", async () => {
      await Bug.create(sampleBug);

      const response = await request(app).get("/api/bugs");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].title).toBe(sampleBug.title);
    });
  });

  describe("POST /api/bugs", () => {
    test("should create a new bug", async () => {
      const response = await request(app).post("/api/bugs").send(sampleBug);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(sampleBug.title);

      // Verify the bug was saved to the database
      const bugs = await Bug.find({});
      expect(bugs.length).toBe(1);
    });

    test("should return 400 if validation fails", async () => {
      const response = await request(app)
        .post("/api/bugs")
        .send({ title: "Test Bug" }); // Missing required fields

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/bugs/:id", () => {
    test("should return a single bug", async () => {
      const bug = await Bug.create(sampleBug);

      const response = await request(app).get(`/api/bugs/${bug._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(sampleBug.title);
    });

    test("should return 404 if bug not found", async () => {
      const response = await request(app).get(
        `/api/bugs/${mongoose.Types.ObjectId()}`
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PATCH /api/bugs/:id", () => {
    test("should update a bug", async () => {
      const bug = await Bug.create(sampleBug);

      const response = await request(app)
        .patch(`/api/bugs/${bug._id}`)
        .send({ status: "in-progress" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe("in-progress");
    });
  });

  describe("DELETE /api/bugs/:id", () => {
    test("should delete a bug", async () => {
      const bug = await Bug.create(sampleBug);

      const response = await request(app).delete(`/api/bugs/${bug._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify the bug was deleted from the database
      const result = await Bug.findById(bug._id);
      expect(result).toBeNull();
    });
  });
});

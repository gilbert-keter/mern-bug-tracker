const { validateBugData } = require("../utils/validation");

describe("Bug Validation Tests", () => {
  test("should validate a correct bug object", () => {
    const bugData = {
      title: "Test Bug",
      description: "This is a test bug",
      createdBy: "Test User",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(true);
  });

  test("should fail when title is missing", () => {
    const bugData = {
      description: "This is a test bug",
      createdBy: "Test User",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Title is required");
  });

  test("should fail when title is too long", () => {
    const bugData = {
      title: "A".repeat(101),
      description: "This is a test bug",
      createdBy: "Test User",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Title cannot be more than 100 characters");
  });

  test("should fail when description is missing", () => {
    const bugData = {
      title: "Test Bug",
      createdBy: "Test User",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Description is required");
  });

  test("should fail when description is too long", () => {
    const bugData = {
      title: "Test Bug",
      description: "A".repeat(501),
      createdBy: "Test User",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Description cannot be more than 500 characters");
  });

  test("should fail when createdBy is missing", () => {
    const bugData = {
      title: "Test Bug",
      description: "This is a test bug",
    };

    const result = validateBugData(bugData);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Creator name is required");
  });
});

const validateBugData = (data) => {
  const { title, description, createdBy } = data;

  if (!title || title.trim() === "") {
    return { isValid: false, error: "Title is required" };
  }

  if (title.length > 100) {
    return {
      isValid: false,
      error: "Title cannot be more than 100 characters",
    };
  }

  if (!description || description.trim() === "") {
    return { isValid: false, error: "Description is required" };
  }

  if (description.length > 500) {
    return {
      isValid: false,
      error: "Description cannot be more than 500 characters",
    };
  }

  if (!createdBy || createdBy.trim() === "") {
    return { isValid: false, error: "Creator name is required" };
  }

  return { isValid: true };
};

module.exports = { validateBugData };

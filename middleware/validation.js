const { failure } = require("../util/common");

const createValidation = (req, res, next) => {
  const requiredFields = [
    "title",
    "description",
    "price",
    "rating",
    "stock",
    "brand",
    "category",
  ];
  const missingFields = {};
  const invalidFields = {};

  for (const field of requiredFields) {
    if (!(field in req.body)) {
      missingFields[field] = "Field is missing";
    }
  }

  if ("price" in req.body && (isNaN(req.body.price) || req.body.price < 0)) {
    invalidFields.price = "Invalid price value";
  }

  if (
    "rating" in req.body &&
    (isNaN(req.body.rating) || req.body.rating < 0 || req.body.rating > 5)
  ) {
    invalidFields.rating = "Invalid rating value";
  }

  if ("stock" in req.body && (isNaN(req.body.stock) || req.body.stock <= 0)) {
    invalidFields.stock = "Stock must be more than 0";
  }

  if (
    Object.keys(missingFields).length > 0 ||
    Object.keys(invalidFields).length > 0
  ) {
    const errors = { ...missingFields, ...invalidFields };
    return res.status(400).send(failure("Validation errors", errors));
  }
  next();
};

const updateValidation = (req, res, next) => {
  const validFields = [
    "title",
    "description",
    "price",
    "rating",
    "stock",
    "brand",
    "category",
  ];
  const invalidFields = {};

  for (const field in req.body) {
    if (!validFields.includes(field)) {
      invalidFields[field] = "Invalid field for update";
    }
  }

  if ("price" in req.body && (isNaN(req.body.price) || req.body.price < 0)) {
    invalidFields.price = "Invalid price value";
  }

  if (
    "rating" in req.body &&
    (isNaN(req.body.rating) || req.body.rating < 0 || req.body.rating > 5)
  ) {
    invalidFields.rating = "Invalid rating value";
  }

  if ("stock" in req.body && (isNaN(req.body.stock) || req.body.stock <= 0)) {
    invalidFields.stock = "Stock must be a non-negative value";
  }

  if (Object.keys(invalidFields).length > 0) {
    return res.status(400).send(failure("Validation errors", invalidFields));
  }

  next();
};

module.exports = { createValidation, updateValidation };

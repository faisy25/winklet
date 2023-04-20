const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
    res.json({
      message: "Something went wrong",
      error: error.message,
      status: error.status
    });
  }
};

const newCatgeory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).send("Category input is required");
    }
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already exists");
    } else {
      const categoryCreated = await Category.create({
        name: category
      });
      res.status(201).send({ categoryCreated: categoryCreated });
    }
  } catch (error) {
    next(error);
    res.json({ message: "Something went wrong", error: error.message });
  }
};

const deleteCatgeory = async (req, res, next) => {
  try {
    if (req.params.category !== "Choose category") {
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category)
      }).orFail();

      await categoryExists.remove();
      res.json({ categoryDeleted: true });
    }
  } catch (error) {
    next(error);
    res.json({ message: "Something went wrong", error: error.message });
  }
};

const saveAttr = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body;
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All inputs are required");
  }
  try {
    const category = categoryChoosen.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();

    if (categoryExists.attrs.length > 0) {
      // if key exists in the database then add a value to the key
      let keyDoesNotExistsInDatabase = true;

      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = false;
          let copyAttributeValues = [...categoryExists.attrs[idx].value];
          copyAttributeValues.push(val);
          let newAttributeValues = [...new Set(copyAttributeValues)];

          //ensures unique value
          categoryExists.attrs[idx].value = newAttributeValues;
        }
      });

      if (keyDoesNotExistsInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      //push to array
      categoryExists.attrs.push({ key: key, value: [val] });
    }
    await categoryExists.save();

    let cat = await Category.find({}).sort({ name: "asc" });

    return res.status(201).json({ categoriesUpdated: cat });
  } catch (error) {
    next(error);
    res.json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { getCategories, newCatgeory, deleteCatgeory, saveAttr };

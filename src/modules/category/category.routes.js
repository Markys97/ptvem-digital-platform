const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Hello World from Categories Module!" });
});

router.post("/", categoryController.create); // CREATE
router.get("/", categoryController.getAll); // READ ALL

router.get("/:id", categoryController.getById);
// router.get('/code/:code', categoryController.getByCode);  READ BY CODE
// router.put('/:id', categoryController.update);            UPDATE
// router.delete('/:id', categoryController.delete);         DELETE

module.exports = router;

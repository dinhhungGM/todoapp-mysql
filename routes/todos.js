const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.getAllTodos);
router.post("/", todosController.createTodo);
router.put("/:id", todosController.updateToDo);
router.delete("/:id", todosController.deleteToDo);

module.exports = router
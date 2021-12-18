const TodoModel = require("../models/Todo.model");
module.exports = {
    getAllTodos: async (req, res) => {
        try {
            const todos = await TodoModel.findAll();
            res.status(200).json({
                message: "Todos retrieved successfully",
                todos,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving todos",
                error,
            });
        }
    },
    createTodo: async (req, res) => {
        const { title, description, status, userId } = req.body;
        try {
            const todo = await TodoModel.create({
                title,
                description,
                status,
                userId,
            });
            res.status(201).json({
                message: "Todo created successfully",
                todo,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating todo",
                error,
            });
        }
    },
    updateToDo: async (req, res) => {
        const { id, title, description, status, userId } = req.body;
        try {
            const todo = await TodoModel.update(
                {
                    title,
                    description,
                    status,
                    userId,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(200).json({
                message: "Todo updated successfully",
                todo,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating todo",
                error,
            });
        }
    },
    deleteToDo: async (req, res) => {
        const { id } = req.body;
        try {
            const todo = await TodoModel.destroy({
                where: {
                    id,
                },
            });
            res.status(200).json({
                message: "Todo deleted successfully",
                todo,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error deleting todo",
                error,
            });
        }
    }
}
import prisma from "../config/db.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user.id,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id },
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) return res.status(404).json({ message: "Task not found" });
        if (task.userId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, completed },
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) return res.status(404).json({ message: "Task not found" });

        // Allow deletion if owner or if admin (admin role check will be handled in routes as well, but extra safety here)
        if (task.userId !== req.user.id && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Not authorized to delete this task" });
        }

        await prisma.task.delete({ where: { id } });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

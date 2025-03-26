"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Create a new Task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, date, task, learned, conclusion } = req.body;
        const newTask = new Task_1.default({ title, date, task, learned, conclusion });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTask = createTask;
// Get all tasks
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find().sort({ date: -1 });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTasks = getAllTasks;
// Get a single task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTaskById = getTaskById;
// Update a Task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTask = updateTask;
// Delete a Task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield Task_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTask = deleteTask;

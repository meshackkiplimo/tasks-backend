import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

// Create a new Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, date, task, learned, conclusion } = req.body;
    const newTask: ITask = new Task({ title, date, task, learned, conclusion });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) 
        return 
    res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) 
        return 
    res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) 
        return 
    res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

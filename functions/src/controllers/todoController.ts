import { Request, RequestHandler, Response } from 'express';
import { db } from '../config/firebase';
import { Task } from '../models/task';
import * as admin from 'firebase-admin';

const taskCollection = db.collection('tasks');

export const createTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newTask: Task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await taskCollection.add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const getAllTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const snapshot = await taskCollection.get();
    const tasks: Task[] = [];
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() as Task });
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: 'Error getting tasks', error });
  }
};

export const getTaskById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const doc = await taskCollection.doc(taskId).get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json({ id: doc.id, ...doc.data() as Task });
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ message: 'Error getting task', error });
  }
};

export const updateTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const updatedTask: Partial<Task> = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    Object.keys(updatedTask).forEach((key) => {
      const typedKey = key as keyof Task;
      if (updatedTask[typedKey] === undefined) {
        delete updatedTask[typedKey];
      }
    });

    await taskCollection.doc(taskId).update(updatedTask);
    res.status(200).json({ id: taskId, ...updatedTask, message: 'Task updated successfully' });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await taskCollection.doc(taskId).delete();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

import { Request, RequestHandler, Response } from 'express';
import { db } from '../config/firebase';
import { User } from '../models/user';
import * as admin from 'firebase-admin';

const userCollection = db.collection('users');

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await userCollection.add(newUser);
    res.status(201).json({ id: docRef.id, ...newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const snapshot = await userCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() as User });
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: 'Error getting users', error });
  }
};

export const getUserById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const doc = await userCollection.doc(userId).get();

    if (!doc.exists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ id: doc.id, ...doc.data() as User });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: 'Error getting user', error });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser: Partial<User> = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    Object.keys(updatedUser).forEach((key) => {
      const typedKey = key as keyof User;
      if (updatedUser[typedKey] === undefined) {
        delete updatedUser[typedKey];
      }
    });

    await userCollection.doc(userId).update(updatedUser);
    res.status(200).json({ id: userId, ...updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userCollection.doc(userId).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

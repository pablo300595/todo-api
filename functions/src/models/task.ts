import * as admin from 'firebase-admin';

export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string
    createdAt?: admin.firestore.FieldValue;
    updatedAt?: admin.firestore.FieldValue;
}

import * as admin from 'firebase-admin';

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt?: admin.firestore.FieldValue;
    updatedAt?: admin.firestore.FieldValue;
}

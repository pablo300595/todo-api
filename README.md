# 📋 API de Gestión de Tareas (Firebase Cloud Functions v2)

Esta es una API RESTful para la gestión de tareas (CRUD - Crear, Leer, Actualizar y Eliminar), construida con **Node.js**, **TypeScript**, **Express.js** y **Firebase Cloud Functions v2**, utilizando **Firestore** como base de datos.

---

## 🚀 Despliegue y URL de la API

Esta API está desplegada en **Firebase Cloud Functions**.

- **URL base de la API**: `https://us-central1-mirva-todo.cloudfunctions.net`
  
---

## ✨ Funcionalidades

La API permite realizar las siguientes operaciones sobre la colección de tareas:

- **Crear tarea** → Añadir una nueva tarea.
- **Obtener todas las tareas** → Listar todas las tareas existentes.
- **Obtener tarea por ID** → Consultar una tarea específica mediante su ID.
- **Actualizar tarea** → Modificar los datos de una tarea existente.
- **Eliminar tarea** → Eliminar una tarea por ID.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **TypeScript**: Superset de JavaScript con tipado estático.
- **Express.js**: Framework para crear APIs REST.
- **Firebase Cloud Functions v2**: Plataforma serverless para ejecutar funciones en la nube.
- **Firebase Admin SDK**: Para interactuar con Firestore desde el backend.
- **Cloud Firestore**: Base de datos NoSQL de Firebase.

📂 Autenticación local
- **gcloud**: gcloud auth print-identity-token

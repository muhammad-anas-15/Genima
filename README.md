# 🎨 Genima - AI Image Generator SaaS

> *Transform your imagination into reality with AI-powered image generation.*

[**🚀 View Live Demo**](https://genima-client.vercel.app)

---

## 📖 Table of Contents

* [About the Project](#-about-the-project)
* [Key Features](#-key-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
* [API Reference](#-api-reference)
* [Contributing](#-contributing)
* [Contact](#-contact)
* [Project Structure](#-project-structure)

---

## 📄 About the Project

**Genima** is a full-stack SaaS application built with the **MERN stack** that allows users to generate high-quality images from text prompts using Artificial Intelligence.

The platform features a complete **authentication system**, a **credit-based usage model**, and **Stripe-powered payments**, all wrapped in a modern, responsive UI built with **React** and **Tailwind CSS**.

---

## ✨ Key Features

* **🤖 AI Text-to-Image Generation** – Convert natural language prompts into stunning AI-generated images.
* **🔐 Secure Authentication** – Login & Signup using JWT with HTTP-only cookies.
* **💳 Credit System & Payments** – Buy image credits securely via Stripe.
* **📱 Fully Responsive Design** – Optimized for desktop, tablet, and mobile.
* **⚡ High Performance Backend** – Serverless backend deployed on Vercel.
* **🎨 Modern UI/UX** – Clean, minimal interface using Tailwind CSS.

---

## 🛠 Tech Stack

| Layer          | Technologies                                                     |
| -------------- | ---------------------------------------------------------------- |
| **Frontend**   | React.js, Vite, Tailwind CSS, Context API, Axios, React Toastify |
| **Backend**    | Node.js, Express.js, MongoDB, Mongoose, JWT, Stripe API          |
| **Deployment** | Vercel (Client & Server)                                         |
| **Tools**      | Git, GitHub, Postman, VS Code                                    |

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* MongoDB Account

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/muhammad-anas-15/Genima.git
cd Genima
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

#### 4. Run the Project (Two Terminals)

**Terminal 1 – Backend**

```bash
cd server
npm run server
```

**Terminal 2 – Frontend**

```bash
cd client
npm run dev
```

#### 5. Access the Application

Open your browser and visit:

```
http://localhost:5173
```

---

## 📡 API Reference

Main backend API endpoints:

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/user/register`  | Register a new user           |
| POST   | `/api/user/login`     | Login an existing user        |
| GET    | `/api/user/credits`   | Get current user credits      |
| POST   | `/api/image/generate` | Generate image from prompt    |
| POST   | `/api/user/payment`   | Create Stripe payment session |

---

## 🤝 Contributing

Contributions are always welcome and appreciated.

1. Fork the project
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📬 Contact

**Muhammad Anas**

* GitHub: https://github.com/muhammad-anas-15
* Email: muhammadannas.2356@gmail.com

---

## 📂 Project Structure

This repository follows a **Monorepo** structure containing both client and server applications.

```bash
Genima/
├── client/              # React Frontend Application
│   ├── src/
│   │   ├── assets/      # Static assets (images, icons)
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global State (Auth, Credits)
│   │   ├── pages/       # App Pages (Home, BuyCredit, Result)
│   │   └── App.jsx      # Main App Component
│   └── ...
├── server/              # Node.js Backend Application
│   ├── config/          # Database & Service Configs
│   ├── controllers/     # Business Logic
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Routes
│   ├── middlewares/     # Auth & Error Handling
│   └── server.js        # Server Entry Point
└── README.md            # Project Documentation
```

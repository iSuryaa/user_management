# React Users Management App

A simple React application for user management with authentication, using **React**, **Redux**, **React Router v6**, and **Ant Design**.

---

## Features

- **Login / Logout** functionality with token-based authentication stored in `localStorage`.
- **Protected routes**:
  - `/users` accessible only if logged in.
  - `/` (login page) redirects to `/users` if already logged in.
- **Users page**:
  - Display a list of users.
  - Search users.
  - Create, update, and delete users.
- **Strict routing**: Any unknown routes automatically redirect to login (`/`).

---

## Tech Stack

- **Frontend:** React.js, Redux, React Router v6, Ant Design
- **API:** Axios (mock API)
- **State Management:** Redux (with actions, reducers, and async actions)
- **Styling:** Ant Design + custom CSS for responsiveness

---

## Installation

1. Clone the repository:

git clone https://github.com/iSuryaa/user_management.git
cd react-users-app

Install dependencies:
npm install

npm start

The app will be available at http://localhost:3000.

## Login Credentials

{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}

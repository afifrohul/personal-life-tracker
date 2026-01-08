<div align= "center">
<img src="/public/life tracker github cover.png" alt="banner" />
</div>

<div align="center">
<a href="https://github.com/afifrohul/personal-life-tracker" target="blank">
</a>


<h2> Project Name: Personal Life Tracker </h2>

[![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?logo=laravel&logoColor=white)](https://laravel.com/) [![Inertia.js](https://img.shields.io/badge/Inertia.js-155dfc?logo=inertia&logoColor=fff)](https://inertiajs.com/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](https://www.mysql.com/)

<!-- <img src ="./assets/bg-3.webp" width="80%"> -->

</div>

## 💡 Overview

**Personal Life Tracker** is an all-in-one self-management application designed to help track daily habits, mood, finances, journaling, and personal projects in a single unified system. 

This project was built to solve a personal problem: managing different aspects of life across multiple disconnected tools. By centralizing everything in one place, the app enables better self-reflection, consistency, and long-term personal growth.



## ✨ Features

- **🔐 User Authentication**  
Secure authentication system to ensure personalized and private life data.

- **📊 Dashboard Overview**  
  A central dashboard that provides a high-level overview of habits, moods, finances, tasks, and journal entries.

- **🧠 Habit Tracking**  
  Create and manage habits with daily tracking, progress visualization, and calendar views to monitor consistency.

- **😊 Mood Logging & Analytics**  
  Log daily moods with visual charts such as mood history and mood distribution to understand emotional patterns over time.

- **📝 Daily Journaling**  
  Write personal journal entries to reflect on thoughts, experiences, and daily activities.

- **📅 Daily Summary**  
  A summary view that aggregates daily habits, mood, journal entries, and financial activity in one place.

- **💰 Finance Tracking**  
  Track income and expenses with detailed records and visual insights to better manage personal finances.

- **📁 Project & Task Management**  
  Organize personal tasks and projects with structured task lists to improve productivity and focus.

- **📈 Data Visualization**  
  Interactive charts and analytics to provide insights into habits, moods, and financial behavior.

<!-- - **📱 Responsive Design**  
  Fully responsive interface built to work seamlessly across desktop and mobile devices. -->



## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

- **PHP** (v8.4 or higher) and **composer**
- **Node.js** (v22.x or higher) and **npm**.
- **MySQL** (or another supported SQL database).

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/afifrohul/personal-life-tracker
   cd personal-life-tracker
   ```

2. **Install dependencies:**

   ```bash
   composer install
   npm install
   ```

3. **Create .env file:**

   ```bash
   cp .env.example .env
   ```
4. **Generate APP KEY:**

   ```bash
   php artisan key:generate
   ```

5. **Migrate Database:**

   ```bash
   php artisan migrate --seed
   ```


## 📖 Usage

### ✔ Running the Website

- **Development mode:** `composer dev`
- **Production mode:** `npm run build && php artisan serve`

> Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the app in your browser. 

- **Login credentials:**
- Email address: user@example.com
- Password: password

> You can change your credentials on the [settings](http://127.0.0.1:8000/settings/) page later.


## 🤝 Contributing

We welcome contributions to this project. Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`).
3. **Make your changes** and commit them (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature-name`).
5. **Open a pull request**.

Please make sure to update tests as appropriate.

## 🐛 Issues

If you encounter any issues while using or setting up the project, please check the [Issues]() section to see if it has already been reported. If not, feel free to open a new issue detailing the problem.

When reporting an issue, please include:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.
- The environment in which the issue occurs (OS, browser, Node.js version, etc.).

## 📜 License

Distributed under the MIT License. See [License](/LICENSE) for more information.




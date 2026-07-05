# 🎓 SkillSphere — Online Learning Platform

A modern online learning platform where users can explore courses, view lessons, and enroll in skill-based programs like Web Development, Design, AI, and more. Built with the Next.js App Router, Tailwind CSS, and BetterAuth.

## 🔗 Live URL

> **Live Site:** https://b13-a8-skillsphere-app.vercel.app
> **GitHub Repo:** https://github.com/mdalaminmiah/b13-a8-skillsphere-app

## 🎯 Purpose

SkillSphere lets learners browse a catalog of premium courses, search and filter them, read full course details (behind a protected route), and manage their own profile — all wrapped in a polished, fully responsive dark UI.

## ✨ Key Features

- **Authentication (BetterAuth):** Email/password login & registration plus Google social login.
- **Protected Course Details:** Course details are only viewable when logged in; unauthenticated users are redirected to login and returned to the page after signing in.
- **My Profile:** View logged-in profile data with a dedicated **Update Information** page to edit name & photo (via BetterAuth `updateUser`).
- **All Courses Page:** Search courses by title plus category & difficulty filters.
- **Home Sections:** Hero banner, Popular Courses, Trending Courses (New Releases), Learning Tips, and Top Instructors.
- **Toast Notifications:** Feedback on every auth action with `react-hot-toast`.
- **Loaders, Not-Found page & no crashes on reload** across all routes.
- **Fully Responsive:** Mobile, tablet, and desktop.

## 🧩 Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4** + **DaisyUI**
- **BetterAuth** with **MongoDB** adapter

## 📦 NPM Packages Used

| Package | Purpose |
| --- | --- |
| `better-auth` / `@better-auth/mongo-adapter` | Authentication & sessions |
| `mongodb` | Database driver for the auth adapter |
| `framer-motion` / `motion` | Animations & transitions |
| `react-hook-form` | Form handling & validation |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon set |
| `tailwindcss` / `daisyui` | Styling |

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```bash
MONGO_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000   # set to your live URL in production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> In production, set `NEXT_PUBLIC_BETTER_AUTH_URL` to your deployed domain and add that domain as an authorized redirect URI in the Google OAuth console.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

```bash
npm run build
npm start
```

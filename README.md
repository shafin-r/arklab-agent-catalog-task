## Getting Started

Hello, I am Shafin Rahman, and this is my repository containing the source code for the take-home coding challenge that was assigned to me by ArkLab AI. This repository contains all of the deliverables of this task required by ArkLab AI.

## Key Features

As is detailed in the Google Docs file, I have implemented all of the core features of this task. These entail:

### AI Agent Listing Page

This page displays a list of AI agents in a responsive grid layout. I have used ShadCN's `Card`, `Badge`, `Label` components to display the following information for each AI Agent.

- Agent Name
- Description
- Status (e.g., "Active", "Beta", "Archived")
- Category (e.g., "Customer Service", "Marketing", "Development")
- Pricing Model (e.g., "Free Tier", "Subscription", "Per-Use")
- A placeholder image

### Server-Side Rendering (SSR) for initial data fetching

- I've implemented `SSR` or `Server-Side Rendering` so that initial data fetching is smooth every time the webpage is loaded. The implementation lies within a React Server Component `(app/page.tsx)`. This was farely easy to do for me as I'm quite familiar with javascript promises.
- I have also simulated a small network request with a wait time of 1000 ms so that it resembles what a real asynchronous operation would look like.

### Client-side Filtering & Search

- The first thing anyone would see upon loading the website would be the huge search bar with all its filtering options. I've implemented a dynamic client-side search and filtering system that allows users to find what they are looking for by searching with name or description.
- There are filters for every attribute (`Status`, `Category`, `Pricing Model`) with checkboxes that allow the users filter the search options with ease.
- There is also a `Clear All Filters` button that removes any filters on the search query.
- For this section, I used ShadCN's `Input`, `Button`, `Checkbox`, `Label` and `Card` components.

### User Experience (UX), Responsiveness & SEO

- The webpapge is fully responsive on all screens and provides a rather good looking user experience across different screen sizes.
- I used `Framer Motion` to implement some small animations like the cards floating up and the login window fading into the screen. I took some help from an LLM on this part since I'm not familiar with `Framer Motion` all that much and the animations are hard to nail the first time because of all the calculations. The result is a sleek looking user interface that would attract anyone.
- As for `SEO`, I used `Next`'s `Metadata` module to dynamically set the page `<title>` and `<meta name="description">` tags. I didn't use the `Head` component from `Next` because the `Metadata` module works better for Search Engine Optimization purposes due to being more dynamic.

### Google OAuth 2.0 Login (Optional Advanced Challenge)

- The optional challenge of this task was to implement a login feature using Google OAuth 2.0 flow. In the time I've been working on the frontend side of software engineering, I've had the opportunity to work with tons of systems where I had to integrate third-party services and APIs into them.
- As such, I had no challenge implementign a basic Google OAuth 2.0 login flow into this AI Agents Catalog. For this, I used the `next-auth` library and created a `Next.js` API route (`app/api/auth/[...nextauth]/route.ts`) that contains all of the logic for successfuly login.
- On the client-side, the website retrieves basic user information like (name, email, profile picture), which is managed using `Redux`
- I've also created a `ProtectedRoute.tsx` component that makes the AI Agent Catalog page only accessible to logged-in users.
- Using the `AuthHeader.tsx` component, the user can see the basic user information on the page, and also logout of the website at any time they want using the dedicated `Sign Out` button. This clears the user's session and logs the user out of the website.

## Setup

First, clone the repository and go into the directory:

```bash
git clone https://github.com/shafin-r/arklab-agent-catalog-task.git
cd arklab-agent-catalog-task
```

After cloning the repository, you have to add your own environment variables to your .env.local file.

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

After the environemnt variables are in place, you can go ahead and install all of the packages required for running this project by running this command:

```bash
npm install
```

After the installation is complete, you can go ahead and run:

```bash
npm run dev
```

This will launch the developmental server at `http://localhost:3000`

## Deployment on Vercel

This project is deployed at this Vercel URL.

```
https://arklab-ai-agents.vercel.app
```

- While deploying on vercel, I faced a couple of issues like unused variables, vercel not recognizing exports etc. Hence,the extra `chore` commits on this repository.
- However, they are all miniscule problems that I easily solved by refactoring code or removing unused variables.

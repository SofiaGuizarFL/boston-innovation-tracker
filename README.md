# 🏙️ Boston Company Innovation Tracker

> A full-stack web application that tracks and showcases Boston's technology ecosystem — from industry giants like HubSpot to emerging startups.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Capstone Steps](#capstone-steps)

---

## Project Overview

The **Boston Company Innovation Tracker** is a centralized dashboard where users can explore information about Boston-based technology companies, view detailed company profiles, and discover trends within the regional technology industry.

**Target Users:**
- Students researching technology companies
- Job seekers exploring Boston's tech industry
- Entrepreneurs studying the startup ecosystem
- General users interested in Boston business innovation

---

## Live Demo

🔗 **[Live App →](https://boston-innovation-tracker.onrender.com)**  
📁 **[GitHub Repository →](https://github.com/yourusername/boston-innovation-tracker)**

---

## Features

### Core Functionality
- ✅ **Company Directory** — Browse all Boston tech companies in a responsive grid
- ✅ **Search** — Full-text search across company names, descriptions, and tags
- ✅ **Filter** — Filter by industry, employee size
- ✅ **Sort** — Sort by name, newest, or oldest
- ✅ **Pagination** — Paginated results (12 per page)
- ✅ **Company Profiles** — Detailed individual pages for each company
- ✅ **CRUD Operations** — Create, Read, Update, Delete companies
- ✅ **Industry Pages** — Browse companies grouped by sector
- ✅ **Featured Companies** — Homepage spotlight section
- ✅ **Responsive Design** — Mobile and desktop optimized

### Technical Features
- RESTful API built with Next.js API Routes
- MongoDB + Mongoose for data persistence
- Server-side rendering (SSR) with `getServerSideProps`
- Environment variable configuration for secure credentials
- Logo integration via Clearbit API
- Graceful error handling and 404 page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18 |
| Styling | CSS3 (custom design system with CSS variables) |
| Backend | Node.js, Next.js API Routes |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| HTTP Client | Fetch API |
| Fonts | Google Fonts (Playfair Display, DM Sans) |
| Deployment | Render (backend), Vercel (frontend) |

---

## Project Structure

```
boston-innovation-tracker/
├── components/
│   ├── Layout.js          # Page wrapper with Navbar + Footer
│   ├── Navbar.js          # Sticky navigation bar
│   ├── CompanyCard.js     # Reusable company card component
│   └── Footer.js          # Site footer
│
├── lib/
│   ├── dbConnect.js       # MongoDB connection utility (singleton)
│   └── seed.js            # Database seed script (12 companies)
│
├── models/
│   ├── Company.js         # Mongoose Company schema/model
│   └── Industry.js        # Mongoose Industry schema/model
│
├── pages/
│   ├── _app.js            # Next.js app wrapper (global CSS)
│   ├── index.js           # Homepage (hero, stats, industries, featured)
│   ├── 404.js             # Custom 404 page
│   │
│   ├── api/companies/
│   │   ├── index.js       # GET all (filter/search/paginate), POST create
│   │   ├── [id].js        # GET one, PUT update, DELETE
│   │   ├── industries.js  # GET all industries with company counts
│   │   └── stats.js       # GET aggregated stats
│   │
│   ├── companies/
│   │   ├── index.js       # Company directory with filters
│   │   ├── new.js         # Add new company form
│   │   ├── [id].js        # Company detail page
│   │   └── [id]/edit.js   # Edit company form
│   │
│   ├── industries/
│   │   └── index.js       # Industry overview page
│   │
│   └── about/
│       └── index.js       # About / project info page
│
├── styles/
│   └── globals.css        # Global design system (CSS variables, utilities)
│
├── .env.local.example     # Environment variable template
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md
```

---

## Database Schema

### Company Collection

```js
{
  name: String,                  // Required
  headquarters_location: String, // Required — e.g. "Cambridge, MA"
  industry: String,              // Required — matches Industry.industry_name
  founded_year: Number,          // e.g. 2006
  employee_size: String,         // Enum: "1-10" | "11-50" | ... | "5000+"
  description: String,
  website_url: String,
  logo_url: String,              // Clearbit or custom URL
  tags: [String],                // e.g. ["CRM", "SaaS", "Marketing"]
  featured: Boolean,             // Shown on homepage
  createdAt: Date,               // Auto (Mongoose timestamps)
  updatedAt: Date,               // Auto
}
```

### Industry Collection

```js
{
  industry_name: String,  // Required, unique
  description: String,
  icon: String,           // Emoji icon — e.g. "💻"
}
```

---

## API Reference

### Companies

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/companies` | List companies (supports `?search=`, `?industry=`, `?employee_size=`, `?sort=`, `?page=`, `?limit=`) |
| `POST` | `/api/companies` | Create a new company |
| `GET` | `/api/companies/:id` | Get a single company |
| `PUT` | `/api/companies/:id` | Update a company |
| `DELETE` | `/api/companies/:id` | Delete a company |

### Industries & Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/companies/industries` | All industries with company counts |
| `GET` | `/api/companies/stats` | Aggregated stats (by industry, size, decade) |

**Example Response — GET /api/companies**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664abc...",
      "name": "HubSpot",
      "industry": "Software & SaaS",
      "headquarters_location": "Cambridge, MA",
      "founded_year": 2006,
      "employee_size": "5000+",
      "featured": true,
      "tags": ["CRM", "Marketing", "SaaS"]
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 12,
    "pages": 1
  }
}
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/boston-innovation-tracker.git
cd boston-innovation-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then edit .env.local and add your MongoDB connection string

# 4. Seed the database with sample data
node lib/seed.js

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/boston-tracker
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variable: `MONGODB_URI`
6. Deploy!

### Deploy to Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
# Add MONGODB_URI in Vercel dashboard → Settings → Environment Variables
```

---

## Capstone Steps Completed

| Step | Description | Status |
|------|-------------|--------|
| 1 | Project Ideas | ✅ |
| 2 | Final Project Proposal | ✅ |
| 3 | Frontend Planning | ✅ |
| 4 | Database Model Planning | ✅ |
| 5 | API Planning | ✅ |
| 6 | Build | ✅ |
| 7 | Documentation (this README) | ✅ |

---

## Screenshots

> Add screenshots of your live application here after deployment.

| Homepage | Company Directory | Company Detail |
|----------|------------------|----------------|
| ![Home](docs/home.png) | ![Directory](docs/directory.png) | ![Detail](docs/detail.png) |

---

## Future Enhancements (Stretch Goals)

- 📊 Data visualization — industry growth trends chart
- 🗺️ Interactive map of company headquarters
- 🔖 Bookmark / save favorite companies
- 💼 Integration with job listing APIs
- 🔐 User authentication for private bookmarks

---

## Author

Built as a Springboard Software Engineering Capstone Project.

---

*Boston — where innovation meets history.* 🦞

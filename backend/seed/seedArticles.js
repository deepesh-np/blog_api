
import Article from "../models/article.model.js";

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failure');
    console.log(error);

    process.exit(1);
  }



await Article.insertMany([
  {
    "title": "JWT Authentication in Express",
    "slug": "jwt-authentication-in-express",
    "bodyMarkdown": "This article explains how JWT authentication works in Express applications, including middleware and token validation.",
    "author": "69594b4f68c4c5665a5369bd",
    "isPublished": true,
    "likes": [],
    "likesCount": 5,
    "views": 120,
    "createdAt": "2026-01-01T10:15:00.000Z",
    "updatedAt": "2026-01-01T10:15:00.000Z"
  },
  {
    "title": "Understanding Middleware in Node.js",
    "slug": "understanding-middleware-in-nodejs",
    "bodyMarkdown": "Middleware functions in Node.js and Express allow you to intercept requests and responses.",
    "author": "69594b4f68c4c5665a5369bd",
    "isPublished": true,
    "likes": [],
    "likesCount": 2,
    "views": 65,
    "createdAt": "2026-01-02T08:30:00.000Z",
    "updatedAt": "2026-01-02T08:30:00.000Z"
  },
  {
    "title": "Draft: Building a Blog API",
    "slug": "draft-building-a-blog-api",
    "bodyMarkdown": "This is a draft article explaining the architecture of a blog backend.",
    "author": "69594b4f68c4c5665a5369bd",
    "isPublished": false,
    "likes": [],
    "likesCount": 0,
    "views": 0,
    "createdAt": "2026-01-02T12:00:00.000Z",
    "updatedAt": "2026-01-02T12:00:00.000Z"
  },
  //
  {
    "title": "REST API Design Best Practices",
    "slug": "rest-api-design-best-practices",
    "bodyMarkdown": "This article covers RESTful API design principles including resource naming, HTTP verbs, and status codes.",
    "author": "69594b4f68c4c5665a5369bd",
    "isPublished": true,
    "likes": [],
    "likesCount": 8,
    "views": 210,
    "createdAt": "2026-01-03T09:45:00.000Z",
    "updatedAt": "2026-01-03T09:45:00.000Z"
  },
  {
    "title": "Why Indexes Matter in MongoDB",
    "slug": "why-indexes-matter-in-mongodb",
    "bodyMarkdown": "Indexes in MongoDB drastically improve query performance and should be used wisely.",
    "author": "69594b4f68c4c5665a5369bd",
    "isPublished": true,
    "likes": [],
    "likesCount": 3,
    "views": 98,
    "createdAt": "2026-01-03T11:20:00.000Z",
    "updatedAt": "2026-01-03T11:20:00.000Z"
  }
]
);

console.log("🌱 Articles seeded");
process.exit();

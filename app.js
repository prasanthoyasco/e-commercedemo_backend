const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./Router/productRoutes");
const orderRoutes = require("./Router/orderRoutes");
const analyticsRoutes = require("./Router/analyticsRoutes");
const campaignRoutes = require("./Router/campaignRoutes");
const shiprocketRoutes = require("./Router/shiprocketRoutes");
const authRoutes = require("./Router/authRoutes")
const categoryRoutes = require("./Router/categoryRoutes");
const shippingAnalyticsRoutes = require("./Router/shippingAnalyticsRoutes");
const wishlistRoutes = require("./Router/wishlistRoutes");
const cartRoutes = require('./Router/cartRoutes');
const customerDetailsRoutes = require('./Router/customerDetailsRoutes');
const addressRoutes = require('./Router/addressRoutes');

const cors = require("cors")
const app = express();
require("dotenv").config();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware
const allowedOrigins = [
  process.env.DASHBOARD_URI, 
  process.env.FRONTEND_URI 
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api", require("./Router/searchRoutes"));
app.use('/api/auth', authRoutes);
app.use("/api/analytics", shippingAnalyticsRoutes);
app.use("/api/shiprocket", shiprocketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/customer-details', customerDetailsRoutes);
app.use('/api/address', addressRoutes);

module.exports = app;

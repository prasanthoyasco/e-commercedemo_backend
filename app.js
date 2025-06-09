const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./Router/productRoutes");
const orderRoutes = require("./Router/orderRoutes");
const analyticsRoutes = require("./Router/analyticsRoutes");
const campaignRoutes = require("./Router/campaignRoutes");
const shiprocketRoutes = require("./Router/shiprocketRoutes");
const authRoutes = require("./Router/authRoutes")
const shippingAnalyticsRoutes = require("./Router/shippingAnalyticsRoutes");
const cors = require("cors")
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.DASHBOARD_URI,
  credentials: true, // if using cookies or auth headers
}));
// Routes
app.use('/api/auth', authRoutes);
app.use("/api/analytics", shippingAnalyticsRoutes);
app.use("/api/shiprocket", shiprocketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);

module.exports = app;

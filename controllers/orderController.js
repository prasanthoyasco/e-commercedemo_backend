const Order = require("../Model/Order");
const dummyOrders = [
  {
    id: "ORD001",
    buyer: "Anita Sharma",
    location: "Mumbai, India",
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentDate: new Date("2025-06-01T10:45:00Z"),
    products: [
      { productId: "68440fe9a2af61c58f73f066", quantity: 1 },
      { productId: "68441069a2af61c58f73f07a", quantity: 2 }
    ],
    total: 60400
  },
  {
    id: "ORD002",
    buyer: "Ravi Verma",
    location: "Delhi, India",
    status: "Processing",
    paymentMethod: "UPI",
    paymentDate: new Date("2025-06-03T14:30:00Z"),
    products: [
      { productId: "68441012a2af61c58f73f06b", quantity: 1 },
      { productId: "6844105da2af61c58f73f077", quantity: 1 }
    ],
    total: 110000
  },
  {
    id: "ORD003",
    buyer: "Neha Kapoor",
    location: "Bangalore, India",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    products: [
      { productId: "6844108fa2af61c58f73f080", quantity: 1 }
    ],
    total: 195000
  },
  {
    id: "ORD004",
    buyer: "Vikram Sethi",
    location: "Chennai, India",
    status: "Cancelled",
    paymentMethod: "Net Banking",
    paymentDate: new Date("2025-06-05T09:00:00Z"),
    products: [
      { productId: "6844103aa2af61c58f73f071", quantity: 1 }
    ],
    total: 85000
  },
  {
    id: "ORD005",
    buyer: "Simran Kaur",
    location: "Pune, India",
    status: "Completed",
    paymentMethod: "Credit Card",
    paymentDate: new Date("2025-06-06T17:15:00Z"),
    products: [
      { productId: "6844102ba2af61c58f73f06e", quantity: 2 },
      { productId: "68441052a2af61c58f73f074", quantity: 1 }
    ],
    total: 177000
  }
];



exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

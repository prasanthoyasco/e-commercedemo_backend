const Product = require("../Model/ProductModel");
const Category = require("../Model/categoryModel");

exports.globalSearch = async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query || query.length < 2) {
      return res.status(400).json({ message: "Query must be at least 2 characters." });
    }

    const regex = new RegExp(query, "i"); // case-insensitive

    // Search in products
    const products = await Product.find({
      $or: [
        { name: regex },
        { category: regex },
        { subcategory: regex },
        { SKU: regex },
      ],
    })
      .select("name images price category stock status") // select only needed fields
      .limit(10)
      .lean();

    // Optional: Search in categories if it's a separate collection
    let categories = [];
    if (Category) {
      categories = await Category.find({ name: regex }).select("name image").limit(5).lean();
    }

    res.status(200).json({
      query,
      total: products.length + categories.length,
      products,
      categories,
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

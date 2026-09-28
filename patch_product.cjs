const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../server/controllers/productController.js');

let content = fs.readFileSync(targetFile, 'utf8');

// Normalize line endings to \n for easier comparison
let normalizedContent = content.replace(/\r\n/g, '\n');

const targetString = `export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate('category', 'name description status icon');

    // Filter active category products only if category exists and is active
    const activeProducts = products.filter(p => p.category && p.category.status === 'active');

    res.json({
      success: true,
      count: activeProducts.length,
      data: activeProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};`;

const replacementString = `export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    let queryCategory = categoryId;
    
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      const Category = (await import('../models/Category.js')).default;
      const matchedCategory = await Category.findOne({ name: new RegExp(\`^\${categoryId}$\`, 'i') }).select('_id');
      if (matchedCategory) {
        queryCategory = matchedCategory._id;
      } else {
        queryCategory = '000000000000000000000000';
      }
    }

    const products = await Product.find({ category: queryCategory }).populate('category', 'name description status icon');

    // Filter active category products only if category exists and is active
    const activeProducts = products.filter(p => p.category && p.category.status === 'active');

    res.json({
      success: true,
      count: activeProducts.length,
      data: activeProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};`;

if (normalizedContent.includes(targetString)) {
  // Use a replacer function to avoid JS string interpolation of $ characters (like $`)
  const newContent = normalizedContent.replace(targetString, () => replacementString);
  fs.writeFileSync(targetFile, newContent, 'utf8');
  console.log('Successfully patched getProductsByCategory');
} else {
  console.log('Could not find the target string. The file might have already been modified.');
}

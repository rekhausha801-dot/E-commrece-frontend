const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, '..', 'server');
const controllerPath = path.join(serverDir, 'controllers', 'adminReviewController.js');
const routesPath = path.join(serverDir, 'routes', 'adminReviewRoutes.js');

let controllerCode = fs.readFileSync(controllerPath, 'utf8');
if (!controllerCode.includes('getReviewStats')) {
  controllerCode += `
// @desc    Get review statistics for admin
// @route   GET /api/admin/reviews/stats
// @access  Private/Admin
export const getReviewStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments({});
    
    // Default stats if no reviews
    if (totalReviews === 0) {
      return res.json({
        success: true,
        data: {
          totalReviews: 0,
          avgRating: "0.0",
          verifiedCount: 0,
          positivePercent: 0,
          pendingCount: 0
        }
      });
    }

    const verifiedCount = await Review.countDocuments({ isVerifiedPurchase: true });
    const pendingCount = await Review.countDocuments({ status: 'Pending' });
    const positiveCount = await Review.countDocuments({ rating: { $gte: 4 } });
    
    const result = await Review.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    
    const avgRating = result.length > 0 ? result[0].avgRating.toFixed(1) : "0.0";
    const positivePercent = Math.round((positiveCount / totalReviews) * 100);

    res.json({
      success: true,
      data: {
        totalReviews,
        avgRating,
        verifiedCount,
        positivePercent,
        pendingCount
      }
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
`;
  fs.writeFileSync(controllerPath, controllerCode, 'utf8');
}

let routesCode = fs.readFileSync(routesPath, 'utf8');
if (!routesCode.includes('getReviewStats')) {
  routesCode = routesCode.replace(
    /import \{\s*getAllReviews,/s,
    "import {\n  getAllReviews,\n  getReviewStats,"
  );
  routesCode = routesCode.replace(
    /router\.route\('\/'\)\s*\.get\(getAllReviews\);/s,
    "router.route('/')\n  .get(getAllReviews);\n\nrouter.route('/stats')\n  .get(getReviewStats);"
  );
  fs.writeFileSync(routesPath, routesCode, 'utf8');
}

console.log('Successfully patched admin review controller and routes');

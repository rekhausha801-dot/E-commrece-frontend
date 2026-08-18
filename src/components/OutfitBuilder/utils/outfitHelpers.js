// Helper function to calculate total price of outfit
export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

// You can add more helper functions here (e.g., collision detection for canvas, validation, etc.)

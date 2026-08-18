import { animate } from "framer-motion";

export const handleFlyingCartAnimation = async (e, imgSelector = 'img', cardSelector = '.unified-product-card') => {
  const button = e.currentTarget;
  const card = button.closest(cardSelector) || document.querySelector('.pdp-image-section'); // Fallback for ProductDetail
  const img = card ? card.querySelector(imgSelector) : null;
  const basket = document.getElementById('navbar-cart-badge');
  
  if (img && basket) {
    // Temporarily disable the button to prevent spamming
    button.disabled = true;

    const from = img.getBoundingClientRect();
    const to = basket.getBoundingClientRect();

    // Create a flying clone of the image
    const clone = img.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = `${from.top}px`;
    clone.style.left = `${from.left}px`;
    clone.style.width = `${from.width}px`;
    clone.style.height = `${from.height}px`;
    clone.style.borderRadius = '12px';
    clone.style.zIndex = '999999';
    clone.style.pointerEvents = 'none';
    clone.style.objectFit = 'cover';
    clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    document.body.appendChild(clone);

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const FLY_SCALE = to.width / from.width;
    const duration = 0.55;

    // Create a ring element on the basket for the ripple effect
    const ring = document.createElement('div');
    ring.style.position = 'absolute';
    ring.style.inset = '-4px';
    ring.style.border = '2px solid #C89953';
    ring.style.borderRadius = '50%';
    ring.style.opacity = '0';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '0';
    if (basket.style.position !== 'absolute') basket.style.position = 'relative';
    basket.appendChild(ring);

    // Animate button press
    animate(button, { scale: [1, 0.95, 1] }, { duration: 0.2 });

    // Simulate a beautiful parabolic arc by mixing linear X with ease-in Y
    await Promise.all([
      animate(clone, { x: dx }, { duration, ease: "linear" }),
      animate(clone, { y: dy, scale: FLY_SCALE, opacity: [1, 1, 0] }, { duration, ease: "easeIn" })
    ]);

    // Remove the flying clone
    clone.remove();

    // Knock the basket with a spring bounce
    animate(basket, { y: [0, 6, -3, 0], scale: [1, 0.9, 1.1, 1] }, { type: "spring", stiffness: 400, damping: 10 });
    
    // Ripple the ring out
    animate(ring, { scale: [1, 2.5], opacity: [0.8, 0] }, { duration: 0.5, ease: "easeOut" }).then(() => ring.remove());
    
    button.disabled = false;
  }
};

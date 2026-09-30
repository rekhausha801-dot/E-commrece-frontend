require('dotenv').config({ path: '../server/.env' });
const mongoose = require('mongoose');

async function checkUrl(url) {
  if (!url || !url.includes('res.cloudinary.com')) return true;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status !== 404;
  } catch (e) {
    return false;
  }
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  const db = mongoose.connection.db;
  const products = db.collection('products');
  
  const docs = await products.find({}).toArray();
  let updatedCount = 0;
  
  for (let doc of docs) {
    let changed = false;
    
    // Check main images array
    if (doc.images && Array.isArray(doc.images)) {
      for (let i = 0; i < doc.images.length; i++) {
        let img = doc.images[i];
        let url = typeof img === 'string' ? img : (img.url || '');
        if (url && url.includes('res.cloudinary.com')) {
          let isValid = await checkUrl(url);
          if (!isValid) {
            changed = true;
            if (typeof img === 'string') {
              doc.images[i] = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image';
            } else {
              doc.images[i].url = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image';
            }
          }
        }
      }
    }
    
    if (doc.image && typeof doc.image === 'string' && doc.image.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.image);
      if (!isValid) { changed = true; doc.image = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    
    if (doc.coverImage && typeof doc.coverImage === 'string' && doc.coverImage.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.coverImage);
      if (!isValid) { changed = true; doc.coverImage = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    
    if (doc.gallery && Array.isArray(doc.gallery)) {
      for (let i = 0; i < doc.gallery.length; i++) {
        let img = doc.gallery[i];
        let url = typeof img === 'string' ? img : (img.url || '');
        if (url && url.includes('res.cloudinary.com')) {
          let isValid = await checkUrl(url);
          if (!isValid) {
            changed = true;
            if (typeof img === 'string') {
              doc.gallery[i] = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image';
            } else {
              doc.gallery[i].url = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image';
            }
          }
        }
      }
    }

    if (changed) {
      await products.updateOne(
        { _id: doc._id }, 
        { '$set': { 
            images: doc.images, 
            image: doc.image, 
            coverImage: doc.coverImage, 
            gallery: doc.gallery 
          } 
        }
      );
      updatedCount++;
      console.log('Fixed broken images in product:', doc.name || doc._id);
    }
  }
  
  const categories = db.collection('categories');
  const cats = await categories.find({}).toArray();
  for (let doc of cats) {
    let changed = false;
    if (doc.image && typeof doc.image === 'string' && doc.image.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.image);
      if (!isValid) { changed = true; doc.image = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    if (changed) {
      await categories.updateOne({ _id: doc._id }, { '$set': { image: doc.image } });
      updatedCount++;
      console.log('Fixed broken image in category:', doc.name || doc._id);
    }
  }

  const brands = db.collection('brands');
  const brnds = await brands.find({}).toArray();
  for (let doc of brnds) {
    let changed = false;
    if (doc.logo && typeof doc.logo === 'string' && doc.logo.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.logo);
      if (!isValid) { changed = true; doc.logo = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    if (changed) {
      await brands.updateOne({ _id: doc._id }, { '$set': { logo: doc.logo } });
      updatedCount++;
      console.log('Fixed broken image in brand:', doc.name || doc._id);
    }
  }
  
  const banners = db.collection('banners');
  const bns = await banners.find({}).toArray();
  for (let doc of bns) {
    let changed = false;
    if (doc.image && typeof doc.image === 'string' && doc.image.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.image);
      if (!isValid) { changed = true; doc.image = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    if (doc.mobileImage && typeof doc.mobileImage === 'string' && doc.mobileImage.includes('res.cloudinary.com')) {
      let isValid = await checkUrl(doc.mobileImage);
      if (!isValid) { changed = true; doc.mobileImage = 'https://placehold.co/400x500/eaeaea/8f7a5b?text=No+Image'; }
    }
    if (changed) {
      await banners.updateOne({ _id: doc._id }, { '$set': { image: doc.image, mobileImage: doc.mobileImage } });
      updatedCount++;
      console.log('Fixed broken image in banner:', doc.title || doc._id);
    }
  }

  console.log('Total fixed items: ' + updatedCount);
  process.exit(0);
})
.catch(err => { console.error(err); process.exit(1); });

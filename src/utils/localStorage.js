const OUTFIT_STORAGE_KEY = 'saved_outfits';
export const saveOutfit = (outfit) => {
  try {
    const existingOutfits = getSavedOutfits();
    const newOutfit = { ...outfit, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updatedOutfits = [newOutfit, ...existingOutfits];
    localStorage.setItem(OUTFIT_STORAGE_KEY, JSON.stringify(updatedOutfits));
    return newOutfit;
  } catch (error) { return null; }
};
export const getSavedOutfits = () => {
  try {
    const outfits = localStorage.getItem(OUTFIT_STORAGE_KEY);
    return outfits ? JSON.parse(outfits) : [];
  } catch (error) { return []; }
};
export const deleteSavedOutfit = (id) => {
  try {
    const existingOutfits = getSavedOutfits();
    const updatedOutfits = existingOutfits.filter(outfit => outfit.id !== id);
    localStorage.setItem(OUTFIT_STORAGE_KEY, JSON.stringify(updatedOutfits));
    return true;
  } catch (error) { return false; }
};

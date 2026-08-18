import React from 'react';
import { Route } from 'react-router-dom';
import OutfitBuilderPage from '../pages/OutfitBuilder/OutfitBuilderPage';

export const outfitBuilderRoutes = (
  <Route path="/outfit-builder" element={<OutfitBuilderPage />} />
);

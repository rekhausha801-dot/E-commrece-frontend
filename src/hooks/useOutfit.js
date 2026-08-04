import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useOutfit = () => {
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveHistory = useCallback((newItems) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newItems);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setItems(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setItems(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const addItem = useCallback((product) => {
    const newItem = {
      ...product,
      canvasId: uuidv4(),
      x: 50,
      y: 50,
      width: product.isAvatar ? 300 : 150,
      height: product.isAvatar ? 600 : 200,
      rotation: 0,
      zIndex: product.isAvatar ? 0 : items.length + 1, // avatars go to back by default
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const removeItem = useCallback((canvasId) => {
    const newItems = items.filter(item => item.canvasId !== canvasId);
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const updateItem = useCallback((canvasId, properties) => {
    const newItems = items.map(item =>
      item.canvasId === canvasId ? { ...item, ...properties } : item
    );
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const rotateItem = useCallback((canvasId) => {
    const newItems = items.map(item =>
      item.canvasId === canvasId ? { ...item, rotation: item.rotation + 15 } : item
    );
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const bringForward = useCallback((canvasId) => {
    const newItems = items.map(item => {
      if (item.canvasId === canvasId) return { ...item, zIndex: item.zIndex + 1 };
      return item;
    });
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const sendBackward = useCallback((canvasId) => {
    const newItems = items.map(item => {
      if (item.canvasId === canvasId) return { ...item, zIndex: Math.max(0, item.zIndex - 1) };
      return item;
    });
    setItems(newItems);
    saveHistory(newItems);
  }, [items, saveHistory]);

  const resetCanvas = useCallback(() => {
    setItems([]);
    saveHistory([]);
  }, [saveHistory]);

  return { items, setItems, addItem, removeItem, updateItem, rotateItem, bringForward, sendBackward, resetCanvas, undo, redo, canUndo: historyIndex > 0, canRedo: historyIndex < history.length - 1 };
};

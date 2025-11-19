import { getAllAssets, createAsset, markAssetReturned } from "../../models/MANAGER/assetsModel.js";

export const getAssets = async (req, res) => {
  try {
    const assets = await getAllAssets();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
};

export const addAsset = async (req, res) => {
  try {
    const newAsset = await createAsset(req.body);
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign asset" });
  }
};

export const returnAsset = async (req, res) => {
  try {
    const updated = await markAssetReturned(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to return asset" });
  }
};

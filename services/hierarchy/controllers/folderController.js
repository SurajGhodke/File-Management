// Get root-level folders for the authenticated user
const Folder = require("../models/Folder");

exports.getRootFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      parentFolder: null,
      createdBy: req.user.id,
    });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get folder content (subfolders and documents)
exports.getFolderContent = async (req, res) => {
  try {
    const { folderId } = req.params;
    const subfolders = await Folder.find({ parentFolder: folderId });
    res.json({ subfolders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new folder
exports.createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;
    const newFolder = new Folder({
      name,
      parentFolder: parentFolder || null,
      createdBy: req.user.id,
    });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update folder details
exports.updateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedFolder = await Folder.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(updatedFolder);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a folder
exports.deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.findByIdAndDelete(id);
    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

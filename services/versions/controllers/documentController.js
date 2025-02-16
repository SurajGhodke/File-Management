const Document = require("../models/Document");

// Get document details
exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate("folder");
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const { title, content, folder } = req.body;
    const newDocument = new Document({
      title,
      content,
      folder,
      createdBy: req.user.id,
      versions: [],
    });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new document version
exports.createVersion = async (req, res) => {
  try {
    const { versionNumber } = req.body;
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    const newVersion = {
      version: versionNumber,
      fileUrl: `https://storage.example.com/${document._id}_v${versionNumber}.pdf`,
      uploadedAt: new Date(),
    };
    document.versions.push(newVersion);
    await document.save();
    res.json(newVersion);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all versions of a document
exports.getDocumentVersions = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.json(document.versions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update document details
exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedDocument);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a document (including versions)
exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Filter documents by search query
exports.filterDocuments = async (req, res) => {
  try {
    console.log("here");
    const { search } = req.query;
    const documents = await Document.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    });

    const results = documents.map((doc) => ({
      id: doc._id,
      title: doc.title,
      folderPath: `Root/${doc.folder ? doc.folder.name : "Uncategorized"}`,
    }));
    res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get total document count for authenticated user
exports.getTotalDocuments = async (req, res) => {
  try {
    const count = await Document.countDocuments({ createdBy: req.user.id });
    res.json({ totalDocuments: count });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

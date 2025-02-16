const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authMiddleware = require("../../../middleware/authMiddleware");

// Document Routes
router.get("/:id", authMiddleware, documentController.getDocument);
router.post("", authMiddleware, documentController.createDocument);
router.post("/:id/version", authMiddleware, documentController.createVersion);
router.get(
  "/:id/versions",
  authMiddleware,
  documentController.getDocumentVersions
);
router.put("/:id", authMiddleware, documentController.updateDocument);
router.delete("/:id", authMiddleware, documentController.deleteDocument);

// Filter Documents
router.get("/other/filter", authMiddleware, documentController.filterDocuments);

// Get Total Document Count
router.get(
  "/other/total-documents",
  authMiddleware,
  documentController.getTotalDocuments
);
module.exports = router;

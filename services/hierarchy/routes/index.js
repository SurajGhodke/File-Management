const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const authMiddleware = require("../../../middleware/authMiddleware");

// Folder Routes
router.get("/viewstore", authMiddleware, folderController.getRootFolders);
router.get(
  "/viewstore/:folderId",
  authMiddleware,
  folderController.getFolderContent
);
router.post("/folders", authMiddleware, folderController.createFolder);
router.put("/folders/:id", authMiddleware, folderController.updateFolder);
router.delete("/folders/:id", authMiddleware, folderController.deleteFolder);

module.exports = router;

import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL USERS (PROTECTED) */
router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* UPDATE USER */
router.put("/:id", authMiddleware, async (req, res) => {
  const { username, email } = req.body;

  await User.findByIdAndUpdate(req.params.id, { username, email });
  res.json({ message: "User updated" });
});

/* DELETE USER */
router.delete("/:id", authMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;

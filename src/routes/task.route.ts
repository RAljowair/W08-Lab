import express from "express";
import {
  addTask,
  allTasks,
  deleteTask,
  updateById,
} from "../controllers/task.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/addTask", auth, addTask);

router.put("/:task_id", auth, updateById);

router.delete("/:task_id",auth, deleteTask);

router.get("/", auth, allTasks);

export default router;

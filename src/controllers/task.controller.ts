import { prisma } from "../config/db";
import { Response, Request } from "express";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { titel } = req.body;
    const { id } = res.locals.user;

    let task = await prisma.task.create({
      data: {
        titel: titel,
        user_id: id,
      },
    });
    if (task) {
      return res.status(200).json("Task added Successfully ✅");
    }
    throw "task is added before, try another email";
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.user.id;
    const id = req.params.task_id;

    let tasks = await prisma.task.updateMany({
      where: {
        id: id,
        user_id: user_id,
      },
      data: {
        titel: req.body.titel,
        isCompleted: req.body.isCompleted,
      },
    });
    if (tasks.count == 0) {
      return res.status(200).json("No Task Found to Update");
    }
    return res.status(200).json({ msg: "Task updated Successfully ✅" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    let tasks = await prisma.task.delete({
      where: {
        id: req.params.task_id,
      },
    });
    if (!tasks) {
      return res.status(200).json("No Task Found to Update");
    }
    return res.status(200).json({ msg: "Task Deleted Successfully ✅" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allTasks = async (req: Request, res: Response) => {
  try {
    let tasks = await prisma.task.findMany({
      where: {
        user_id: res.locals.user.id,
      },
      select: {
        titel: true,
        isCompleted: true,
      },
    });
    if (tasks.length == 0) {
      return res.status(200).json({ msg: "There is no tasks" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

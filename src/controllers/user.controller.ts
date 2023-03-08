import { prisma } from "../config/db";
import { Request, Application, Response } from "express";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const addUser = async (req: Request, res: Response) => {
  try {
    let hashedPass = await argon2.hash(req.body.password);
    let user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      },
    });
    if (user) {
      return res.status(200).json("User added Successfully ✅");
    }
    throw "User is added before, try another email";
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // let password = await argon2.hash(req.body.password);
    if (!user) {
      return res.status(400).json("User not found!");
    } else if (!(await argon2.verify(user.password, req.body.password))) {
      return res.status(400).json(`Wrong Password`);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.TOKEN_KEY as string,
        { expiresIn: "2h" }
      );
      return res
        .status(200)
        .json({ msg: `Welcome ${user.name} 👋🏼`, token: token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

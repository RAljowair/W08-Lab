import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface User {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ msg: "you are not authorize , please provide a vaild token" });
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY as string) as User;

    res.locals.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ msg: "you are not authorize , please provide a vaild token" });
  }
};

export default auth;

// import { Response, Request, Application, NextFunction } from "express";
// import * as jwt from "jsonwebtoken";

// interface User {
//   id: string;
// }

// const auth = (res: Response, req: Request, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(403).json("You are not authorizd");
//     }

//     const user = jwt.verify(token, process.env.TOKEN_KEY as string) as User;

//     console.log(user);
//     res.locals.user = user;

//     next();
//   } catch (error) {
//     return res.status(403).json("You are not authorizd");
//   }
// };

// export default auth;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = () => {
  try {
    prisma.$connect();
    console.log("prisma-class Database Connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB, prisma };

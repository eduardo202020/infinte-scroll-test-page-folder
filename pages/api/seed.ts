// const { PrismaClient, Post } = require("@prisma/client");
// const prisma = new PrismaClient();

// import prisma from "../../libs/prismadb";

const { lorem } = require("faker");
// import prisma from "../libs/prismadb";

// const prisma = require("../libs/prismadb.ts");

import type { NextApiRequest, NextApiResponse } from "next";
import type { Post } from "@prisma/client";
// const prisma = new PrismaClient();
import prisma from "@/libs/prismadb";

// type Post = {
//   id: string;
//   title: string;
//   createdAt: Date;
//   numero: number;
// };

interface Data {
  posts: Post[];
  nextId: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const postPromises: any[] = [];

    await prisma.post.deleteMany();
    //   const articulos = await prisma.post.findMany({});
    // articulos[0].

    new Array(50).fill(0).forEach((x, index) => {
      postPromises.push(
        prisma.post.create({
          data: {
            title: lorem.sentence(),
            order: index,
          },
        })
      );
    });

    const posts = await Promise.all(postPromises);
    console.log(posts);
    console.log({ data: "este es un mensaje v2" });
    return res.json({
      posts,
      nextId: "xxx",
    });
  }
}

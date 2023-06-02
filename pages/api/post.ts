// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";
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
    const limit = 5;
    const cursor = req.query.cursor ?? "";
    const cursorObj = cursor === "" ? undefined : { id: cursor as string };

    const posts = await prisma.post.findMany({
      skip: cursor !== "" ? 1 : 0,
      cursor: cursorObj,
      take: limit,
      orderBy: {
        order: "asc",
      },
    });

    // posts[0].

    return res.json({
      posts,
      nextId: posts.length === limit ? posts[limit - 1].id : undefined,
    });
  }
}

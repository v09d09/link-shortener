import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

type Data =
  | {
      count: number;
    }
  | { message: string };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    if (!req.body.slug || typeof req.body.slug != "string") {
      return res.status(400).json({ message: "No Slug!" });
    }
    const { slug } = req.body;

    const count = await prisma.shortLink.count({
      where: {
        slug,
      },
    });
    res.status(200).json({ count });
  } else {
    res.status(404).json({ message: "Not Found!" });
  }
};

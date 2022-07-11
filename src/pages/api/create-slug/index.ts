import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

type Data =
  | {
      slug: string;
    }
  | { message: string };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    if (
      !req.body.slug ||
      typeof req.body.slug != "string" ||
      !req.body.url ||
      typeof req.body.url != "string"
    ) {
      return res.status(400).json({ message: "No Url or Slug!" });
    }
    const { slug, url } = req.body;

    const link = await prisma.shortLink.create({
      data: {
        slug,
        url,
      },
    });

    res.status(200).json({ slug: link.slug });
  } else {
    res.status(404).json({ message: "Not Found!" });
  }
};

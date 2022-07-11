import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];
  // console.log(query);
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "no slug" }));
    return;
  }
  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "not found" }));
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json(data);
};

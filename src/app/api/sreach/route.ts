import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  console.log("Query received:", q); // Debug đầu vào

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: q?.toString() || "",
          mode: "insensitive", // Không phân biệt hoa thường
        },
      },
    });

    console.log("Users found:", users); // Debug kết quả truy vấn

    res.status(200).json(users);
  } catch (err) {
    console.error("Database query error:", err); // Log lỗi
    res.status(500).json({ error: "Lỗi truy vấn người dùng" });
  }
}

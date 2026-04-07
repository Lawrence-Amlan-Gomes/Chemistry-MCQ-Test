import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret",
    );

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    return Response.json({ user });
  } catch (error) {
    console.error("Token verification error:", error);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}

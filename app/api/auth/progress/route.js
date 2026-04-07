import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    // Get token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

    if (!token) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret",
    );

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate statistics
    const scores = user.scores || [];
    const totalTests = user.totalTests || 0;
    const averageScore = user.averageScore || 0;
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

    return Response.json({
      success: true,
      scores,
      stats: {
        totalTests,
        averageScore,
        highestScore,
        lowestScore,
      },
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return Response.json(
      { error: "Failed to fetch progress" },
      { status: 500 },
    );
  }
}

import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { score, totalQuestions } = await req.json();

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

    // Find user and update scores
    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate percentage score
    const percentageScore = Math.round((score / totalQuestions) * 100);

    // Update user scores array and stats
    user.scores.push(percentageScore);
    user.totalTests += 1;
    user.averageScore = Math.round(
      user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length,
    );

    await user.save();

    return Response.json({
      success: true,
      message: "Score saved successfully",
      percentageScore,
      averageScore: user.averageScore,
      totalTests: user.totalTests,
    });
  } catch (error) {
    console.error("Error saving score:", error);
    return Response.json({ error: "Failed to save score" }, { status: 500 });
  }
}

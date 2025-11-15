import { verifyJWT } from "@/lib/auth";
import User from "@/models/User";

export async function getUserFromToken(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = verifyJWT(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user || null;
  } catch {
    return null;
  }
}

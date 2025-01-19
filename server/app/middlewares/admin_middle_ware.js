const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dbConnection = require("../../config/db"); // Ensure the path to your DB config is correct

async function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    // Decode and verify the token
    const { userid } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user's role from the database
    const [user] = await dbConnection.query(
      "SELECT role FROM Users WHERE id = ?",
      [userid]
    );

    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Forbidden: User not found" });
    }

    const userRole = user[0].role;

    if (userRole !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Forbidden: Admin access required" });
    }

    // Attach user info to the request and proceed
    req.user = { userid, role: userRole };
    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Unauthorized: Invalid token" });
  }
}

module.exports = adminMiddleware;

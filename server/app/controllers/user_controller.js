const { StatusCodes } = require("http-status-codes");
const { query } = require("../../config/db");
const { genSalt, hash, compare } = require("bcrypt");

async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;
  if (!email || !password || !first_name || !last_name || !username) {
    console.log("here");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const [user] = await query(
      "SELECT username, id FROM Account WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user && user.length > 0) {
      console.log("here2");

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or username already registered" });
    }

    // Check if the password length is valid
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 7 characters" });
    }

    // Encrypt the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Insert new user into the database
    await query(
      "INSERT INTO Account (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

const { generateToken } = require("../../utils/token"); // Adjust the path as necessary

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const [user] = await query(
      "SELECT id, username, password FROM Account WHERE email = ?",
      [email]
    );

    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Compare the password
    const validPassword = await compare(password, user[0].password);

    if (!validPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate a token (assuming you have a function to generate tokens)
    const token = generateToken(user[0].id);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}
module.exports = { register, login };

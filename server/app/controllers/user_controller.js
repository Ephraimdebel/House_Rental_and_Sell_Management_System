const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../../config/db");
const { genSalt, hash, compare } = require("bcrypt");
const generateToken = require("../../utils/token"); // Ensure this path is correct
const jwt = require("jsonwebtoken");


async function register(req, res) {
  const { username, first_name, last_name, email, password } = req.body;

  // Check for required fields
  if (!email || !password || !first_name || !last_name || !username) {
    console.log("Missing fields in registration");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await dbConnection.query(
      "SELECT userName, email FROM Users WHERE userName = ? OR email = ?",
      [username, email]
    );

    if (existingUser && existingUser.length) {
      console.log(existingUser);
      console.log("User already exists");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or username already registered" });
    }

    // Check password length
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Encrypt the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Insert new user into the database
    await dbConnection.query(
      "INSERT INTO Users (UserName, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  // Check for required fields
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const [user] = await dbConnection.query(
      "SELECT id, userName, password FROM Users WHERE email = ?",
      [email]
    );

    if (!user || user.length === 0) {
      console.log("Invalid email or password - no user found");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const userData = user[0]; // Safely access the first result
    console.log("userdata",userData);

    // Compare the password
    const validPassword = await compare(password, userData.password);
    console.log(password, userData.password, validPassword);

    if (!validPassword) {
      // Fixed condition here
      console.log("Invalid email or password - password mismatch");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate a token
    // const token = generateToken(userData.id);

    const username = user[0].userName
    const userid = user[0].id
    const token =jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn:"1h"})

    return res.status(StatusCodes.OK).json({msg:"login success",token,username,userid})


    // return res
    //   .status(StatusCodes.OK)
    //   .json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ message: "valid user", username, userid });
}

module.exports = { register, login, checkUser };

const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../../config/db");
const bcrypt = require("bcrypt");
async function register(req, res) {
    const { username, first_name, last_name, email, password } = req.body;
    if (!email || !password || !first_name || !last_name || !username) {
      console.log("here");
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if the user already exists
      const [user] = await dbConnection.query(
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert new user into the database
      await dbConnection.query(
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

  module.exports = {
    register,
  };
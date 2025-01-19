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
    // Check if the user exists, including the 'role' field
    const [user] = await dbConnection.query(
      "SELECT id, userName, password, role FROM Users WHERE email = ?",
      [email]
    );

    if (!user || user.length === 0) {
      console.log("Invalid email or password - no user found");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const userData = user[0]; // Safely access the first result
    console.log("userdata", userData);

    // Compare the password
    const validPassword = await compare(password, userData.password);
    console.log(password, userData.password, validPassword);

    if (!validPassword) {
      console.log("Invalid email or password - password mismatch");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate a token with the user's role included
    const username = userData.userName;
    const userid = userData.id;
    const role = userData.role; // Get the role from the database

    const token = jwt.sign({ username, userid, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(StatusCodes.OK).json({ msg: "Login success", token, username, userid, role });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}





async function updateUserRoleToHost(req, res) {
  const { userId } = req.params;  // Assuming userId is passed in the URL parameters
console.log(userId)
  try {
    // Check if the user exists
    const [user] = await dbConnection.query(
      "SELECT id FROM Users WHERE id = ?",
      [userId]
    );

    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Update the user's role to 'host'
    await dbConnection.query(
      "UPDATE Users SET role = ? WHERE id = ?",
      ['host', userId]
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "User role updated to host successfully" });
  } catch (error) {
    console.error("Error updating user role to host:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function updateUserRoleToGuest(req, res) {
  const { userId } = req.params;  // Assuming userId is passed in the URL parameters

  try {
    // Check if the user exists
    const [user] = await dbConnection.query(
      "SELECT id FROM Users WHERE id = ?",
      [userId]
    );

    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Update the user's role to 'guest'
    await dbConnection.query(
      "UPDATE Users SET role = ? WHERE id = ?",
      ['guest', userId]
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "User role updated to guest successfully" });
  } catch (error) {
    console.error("Error updating user role to guest:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}


async function getAllUsers(req, res) {
  try {
    // Fetch all users from the database
    const [users] = await dbConnection.query(
      "SELECT id, userName, email, role FROM Users"
    );

    if (users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No users found" });
    }

    // Send back the list of users
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    // Check if the user exists
    const [user] = await dbConnection.query(
      "SELECT id FROM Users WHERE id = ?",
      [id]
    );

    if (user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Delete the user
    await dbConnection.query("DELETE FROM Users WHERE id = ?", [id]);

    return res
      .status(StatusCodes.OK)
      .json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
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

module.exports = { register, login, checkUser ,updateUserRoleToHost, updateUserRoleToGuest,getAllUsers,deleteUser};

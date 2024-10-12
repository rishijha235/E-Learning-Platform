const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    //

    console.log("In Auth Middleware");
    //if token is missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify token
    try {
      console.log("Before verify token ");
      console.log("TOken before verify", token);
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decode ", decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//Student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//Instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//Admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

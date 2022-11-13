const User = require("../../models/Admin/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

process.env.JWT_SECRET = "SECRET_KEY";

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({ message: "User already registered." });
    }

    const { name, role, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      hash_password,
      role,
    });
    newUser.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong!" });
      }
      if (data) {
        return res
          .status(201)
          .json({ message: "User registered successfully!", user: data });
      }
    });
  });
};

const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (error) return res.status(400).json({ error });
    if (!user && res.status(400).json({ message: "User not found." }));
    if ((user && user.role === "Admin") || user.role === "User") {
      const isPasswordValid = await user.authenticate(req.body.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        const { _id, email, role, name } = user;
        res.cookie("token", token, { expiresIn: "2d" });
        res.status(200).json({
          token,
          user: { _id, name, email, role },
        });
      } else {
        res.status(400).json({ message: "Invalid Password." });
      }
    } else {
      return res.status(400).json({ message: "User not found." });
    }
  });
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (userData) {
      userData.name = req.body.name;
      userData.email = req.body.email;
      userData.role = req.body.role;
    }

    const updatedUser = await userData.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  const userData = await User.find();
  res.json(userData);
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully!" });
};

module.exports = {
  signup,
  signin,
  signout,
  updateUser,
  getUsers,
  deleteUser,
};

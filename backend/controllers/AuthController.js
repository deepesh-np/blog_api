import { hashPassword, comparePassword } from '../services/hashService';
import { generateToken } from '../services/jwtService';
import User from '../models/user.model';

//Register:
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body; 

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await hashPassword(password);

    const user = new User({ name, username , email, passwordHash: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  }
   catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login:
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken({ id: user._id, email: user.email });

    res.json({ message: "Login successful!", token });
  }
   catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Protected profile route
exports.profile = (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
};
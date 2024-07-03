const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const login = async (req, res) => {
  try {
    const { email, password, brandName } = req.body // Extract email, password, and brandName from request body

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Search for the user by email
    const user = await User.findOne({ email })

    // If user not found  , return error
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password)

    // If password is invalid, return error
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Update the user's brandName if provided
    if (brandName) {
      user.brandName = brandName
      await user.save()
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '2h' },
    )

    // Respond with the token and brandName
    res.json({ token, brandName: user.brandName })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  login,
}
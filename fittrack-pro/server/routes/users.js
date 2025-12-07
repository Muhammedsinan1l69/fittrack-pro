const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/user.model');

// ==========================================
// 1. REGISTER ROUTE
// ==========================================
router.post('/register', async (req, res) => {
    try {
        // Check if user exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully!', userId: savedUser._id });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// ==========================================
// 2. LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
    console.log("--------------------------------");
    console.log("Login Attempt for:", req.body.email);
    
    try {
        // Find user
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            console.log("❌ Error: User email not found in database.");
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Check Password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (!isMatch) {
            console.log("❌ Error: Password hash does not match.");
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        console.log("✅ Success: Credentials match. Generating Token...");

        // Generate Token
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// ==========================================
// 3. GET PROFILE ROUTE
// ==========================================
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// 4. UPDATE PROFILE ROUTE
// ==========================================
router.put('/profile', auth, async (req, res) => {
    try {
        const { height, weight, bodyFat } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (height !== undefined) user.height = height;
        if (weight !== undefined) user.weight = weight;
        if (bodyFat !== undefined) user.bodyFat = bodyFat;

        await user.save();
        
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
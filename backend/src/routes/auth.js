const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Register route
router.post('/register', async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

module.exports = router;

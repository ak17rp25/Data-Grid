const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Get all data or filter by view
router.get('/', async (req, res) => {
  try {
    const { view } = req.query; // location or branch view
    const filter = view === 'branch' ? { location: /Branch/ } : { location: { $not: /Branch/ } };
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Add a new data entry (for future use)
router.post('/', async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add data' });
  }
});

module.exports = router;

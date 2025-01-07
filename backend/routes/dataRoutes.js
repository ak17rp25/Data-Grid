const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

router.get('/', async (req, res) => {
  try {
    const { view } = req.query;
    const filter = view === 'branch' ? { location: /Branch/ } : { location: { $not: /Branch/ } };
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;

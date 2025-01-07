const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const Data = require('./models/Data'); // Import the Data model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Seed Data
const seedData = [
  { location: 'Colorado', potentialRevenue: '624596', annualizedCompetitorProcessingVolume: '52049666', annualizedCompetitorMerchant: 195, annualizedRevenuePerAccount: '3203', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 220 },
  { location: 'Florida', potentialRevenue: '600628', annualizedCompetitorProcessingVolume: '52049666', annualizedCompetitorMerchant: 195, annualizedRevenuePerAccount: '3203', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 220 },
  { location: 'Mississippi', potentialRevenue: '640596', annualizedCompetitorProcessingVolume: '51385666', annualizedCompetitorMerchant: 198, annualizedRevenuePerAccount: '3114', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 792 },
  { location: 'Branch 1', potentialRevenue: '878269', annualizedCompetitorProcessingVolume: '73189083', annualizedCompetitorMerchant: 287, annualizedRevenuePerAccount: '3060', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 1148 },
  { location: 'Branch 2', potentialRevenue: '822775', annualizedCompetitorProcessingVolume: '68564583', annualizedCompetitorMerchant: 257, annualizedRevenuePerAccount: '3201', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 1028 },
  { location: 'Branch 3', potentialRevenue: '817009', annualizedCompetitorProcessingVolume: '68084083', annualizedCompetitorMerchant: 252, annualizedRevenuePerAccount: '3242', annualizedMarketShareByRevenue: '33.33%', commercialDDAs: 1008 },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('Seeding database...');
    await Data.deleteMany({}); // Clear existing data
    await Data.insertMany(seedData); // Insert seed data
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Database seeding failed:', err);
  }
};

// Routes
app.use('/api/data', require('./routes/dataRoutes')); // Use the data routes

// Serve React frontend (optional)
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await seedDatabase(); // Seed the database
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

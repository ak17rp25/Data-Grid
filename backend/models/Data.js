const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  location: String,
  potentialRevenue: String,
  annualizedCompetitorProcessingVolume: String,
  annualizedCompetitorMerchant: Number,
  annualizedRevenuePerAccount: String,
  annualizedMarketShareByRevenue: String,
  commercialDDAs: Number,
});

module.exports = mongoose.model('Data', dataSchema);

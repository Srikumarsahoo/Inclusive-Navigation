const express = require('express');
const router = express.Router();

const Venue = require('../models/Venue');
const Report = require('../models/Report');

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find().populate('reports');
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a venue by id
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('reports');
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new venue
router.post('/', async (req, res) => {
  const {
    name,
    address,
    location,
    accessibilityFeatures,
    createdBy,
  } = req.body;

  const newVenue = new Venue({
    name,
    address,
    location,
    accessibilityFeatures,
    createdBy,
  });

  try {
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST report accessibility issue
router.post('/:id/report', async (req, res) => {
  const { description, user } = req.body;
  const venueId = req.params.id;

  try {
    const newReport = new Report({
      description,
      venue: venueId,
      user,
    });
    const savedReport = await newReport.save();

    // Add report reference to venue
    const venue = await Venue.findById(venueId);
    venue.reports.push(savedReport._id);
    await venue.save();

    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

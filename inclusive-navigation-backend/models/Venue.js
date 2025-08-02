const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  accessibilityFeatures: {
    wheelchairAccessible: Boolean,
    stepFreeAccess: Boolean,
    accessibleRestroom: Boolean,
    quietSpace: Boolean,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
}, {
  timestamps: true,
});

VenueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', VenueSchema);
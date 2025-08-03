import React, { useState } from 'react';
import axios from 'axios';

function AddVenue() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [stepFreeAccess, setStepFreeAccess] = useState(false);
  const [accessibleRestroom, setAccessibleRestroom] = useState(false);
  const [quietSpace, setQuietSpace] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !latitude || !longitude) {
      setMessage('Name and coordinates are required.');
      return;
    }

    const newVenue = {
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      accessibilityFeatures: {
        wheelchairAccessible,
        stepFreeAccess,
        accessibleRestroom,
        quietSpace,
      },
      // For now, no user system, so createdBy can be null or omitted
    };

    try {
      const response = await axios.post('http://localhost:5000/api/venues', newVenue);
      setMessage(`Venue "${response.data.name}" added successfully!`);
      // Reset form
      setName('');
      setAddress('');
      setLatitude('');
      setLongitude('');
      setWheelchairAccessible(false);
      setStepFreeAccess(false);
      setAccessibleRestroom(false);
      setQuietSpace(false);
    } catch (error) {
      console.error('Error adding venue:', error);
      setMessage('Failed to add venue, please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Add New Venue</h2>
      {message && <p><strong>{message}</strong></p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name*:</label><br/>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label><br/>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Latitude*:</label><br/>
          <input type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} required />
        </div>
        <div>
          <label>Longitude*:</label><br/>
          <input type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} required />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={wheelchairAccessible}
              onChange={e => setWheelchairAccessible(e.target.checked)}
            />
            Wheelchair Accessible
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={stepFreeAccess}
              onChange={e => setStepFreeAccess(e.target.checked)}
            />
            Step-Free Access
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={accessibleRestroom}
              onChange={e => setAccessibleRestroom(e.target.checked)}
            />
            Accessible Restroom
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={quietSpace}
              onChange={e => setQuietSpace(e.target.checked)}
            />
            Quiet Space
          </label>
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Add Venue</button>
      </form>
    </div>
  );
}

export default AddVenue;

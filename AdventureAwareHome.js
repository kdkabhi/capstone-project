import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import logo from './capstone logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTwitter, FaStar, FaRegStar, FaTimes } from 'react-icons/fa';
import './AdventureAwareHome.css'; // Import the CSS file for additional styles

const AdventureAwareHome = ({ packages }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites(favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id]);
  };

  // Show itinerary popup
  const showItinerary = (pkg) => {
    setSelectedItinerary(pkg);
  };

  // Close itinerary popup
  const closeItinerary = () => {
    setSelectedItinerary(null);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="container" style={{ maxWidth: '1200px', padding: 0 }}>
        <header className="text-white text-center py-5" style={{ height: '500px', width: '100%', position: 'relative' }}>
          <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}>
            <source src="/capstone1 video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', position: 'relative', zIndex: 1 }}>
            <h1 className="display-4 fw-bold" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '3rem' }}>
              Explore Ontario's Best Travel Destinations
            </h1>
            <p className="lead" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.25rem' }}>
              Your gateway to unforgettable adventures
            </p>
          </div>
        </header>
      </div>

      {/* Display Packages */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Our Packages</h2>
        <div className="row d-flex justify-content-center">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-md-4 mb-4 d-flex align-items-stretch">
              <div className="card shadow-sm border-0 w-100" style={{ height: "600px" }}>
                <img src={pkg.image} className="card-img-top" alt={pkg.name} style={{ height: "250px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{pkg.name}</h5>
                  <p className="card-text">{pkg.description}</p>
                  <p><strong>Price:</strong> {pkg.price}</p>
                  <p><strong>Duration:</strong> {pkg.days}</p>
                  <p><strong>Date:</strong> {formatDate(pkg.date)}</p> {/* Format the date here */}

                  {/* Buttons */}
                  <button className="btn btn-success btn-sm me-2">Book</button>
                  <button className="btn btn-info btn-sm me-2" onClick={() => showItinerary(pkg)}>Detail</button>
                  <button className="btn btn-light btn-sm" onClick={() => toggleFavorite(pkg.id)}>
                    {favorites.includes(pkg.id) ? <FaStar color="gold" /> : <FaRegStar />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary Modal Popup */}
      {selectedItinerary && (
        <div className="itinerary-modal">
          <div className="itinerary-content">
            <button className="close-btn" onClick={closeItinerary}><FaTimes /></button>
            <h4 className="fw-bold">{selectedItinerary.name}</h4>
            <p>{selectedItinerary.itinerary}</p>
          </div>
        </div>
      )}

      {/* Modal Styling */}
      <style>
        {`
          .itinerary-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .itinerary-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            text-align: center;
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default AdventureAwareHome;

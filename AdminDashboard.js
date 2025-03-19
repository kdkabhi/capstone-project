import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = ({ packages, setPackages }) => {
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    days: "",
    date: "",
    description: "",
    itinerary: "",
    image: "",
  });

  const [editPackage, setEditPackage] = useState(null);

  const handleAddPackage = () => {
    setPackages([...packages, { ...newPackage, id: Date.now() }]);
    setNewPackage({ name: "", price: "", days: "", date: "", description: "", itinerary: "", image: "" });
  };

  const handleDeletePackage = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleUpdatePackage = () => {
    setPackages(packages.map(pkg => (pkg.id === editPackage.id ? editPackage : pkg)));
    setEditPackage(null);
  };

  const handleEditPackage = (pkg) => {
    setEditPackage(pkg);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPackage({ ...newPackage, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditPackage({ ...editPackage, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold">Admin Dashboard - Manage Packages</h2>

      <div className="mb-4">
        <h4>Add New Package</h4>
        <input type="text" className="form-control mb-2" placeholder="Package Name" value={newPackage.name} onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Price" value={newPackage.price} onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Duration" value={newPackage.days} onChange={(e) => setNewPackage({ ...newPackage, days: e.target.value })} />
        <input type="date" className="form-control mb-2" value={newPackage.date} onChange={(e) => setNewPackage({ ...newPackage, date: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="Description" value={newPackage.description} onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })} style={{ height: "50px" }}></textarea>
        <textarea className="form-control mb-2" placeholder="Itinerary (e.g., hotel, flights, places to visit)" value={newPackage.itinerary} onChange={(e) => setNewPackage({ ...newPackage, itinerary: e.target.value })}></textarea>
        <input type="file" className="form-control mb-2" onChange={handleImageChange} />
        <button className="btn btn-success" onClick={handleAddPackage}>Add Package</button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Date</th>
            <th style={{ width: "150px" }}>Description</th>
            <th>Itinerary</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.name}</td>
              <td>{pkg.price}</td>
              <td>{pkg.days}</td>
              <td>{formatDate(pkg.date)}</td> {/* Format the date here */}
              <td style={{ maxWidth: "150px", wordWrap: "break-word", whiteSpace: "normal" }}>{pkg.description}</td>
              <td style={{ maxWidth: "150px", wordWrap: "break-word", whiteSpace: "normal" }}>{pkg.itinerary}</td>
              <td><img src={pkg.image} alt={pkg.name} style={{ width: "100px" }} /></td>
              <td>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeletePackage(pkg.id)}>Delete</button>
                <button className="btn btn-primary btn-sm" onClick={() => handleEditPackage(pkg)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Lock, User } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = () => {
  const navigate = useNavigate();

  // State management for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      currentPassword,
      newPassword,
      emailNotifications,
      browserNotifications,
    });
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-header d-flex align-items-center bg-primary text-white">
          <button className="btn btn-light btn-sm me-3" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="mb-0">Settings</h3>
        </div>

        <div className="card-body">
          {/* Profile Settings */}
          <h5 className="mb-3">
            <User className="me-2 text-primary" /> Profile Settings
          </h5>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Security Settings */}
          <h5 className="mb-3">
            <Lock className="me-2 text-danger" /> Security
          </h5>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Notifications */}
          <h5 className="mb-3">
            <Bell className="me-2 text-warning" /> Notifications
          </h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="emailNotifications"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="emailNotifications">
              Email Notifications
            </label>
          </div>
          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="browserNotifications"
              checked={browserNotifications}
              onChange={(e) => setBrowserNotifications(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="browserNotifications">
              Browser Notifications
            </label>
          </div>

          {/* Save Button */}
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

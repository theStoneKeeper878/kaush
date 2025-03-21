import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, CheckCircle, Clock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Statistics = () => {
  const navigate = useNavigate();

  const stats = [
    { id: 1, student: "John Doe", participation: "85%", questionsAnswered: 12, lastActive: "2025-02-26" },
    { id: 2, student: "Jane Smith", participation: "92%", questionsAnswered: 15, lastActive: "2025-02-26" },
  ];

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg w-100" style={{ maxWidth: "800px" }}>
        {/* Header Section */}
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <button className="btn btn-light btn-sm me-3" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="mb-0">Statistics</h3>
        </div>

        {/* Overview Cards */}
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card text-center border-0 shadow-sm p-3">
                <Users className="text-primary mb-2" size={24} />
                <p className="text-muted mb-1">Total Students</p>
                <h5 className="fw-bold">24</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center border-0 shadow-sm p-3">
                <CheckCircle className="text-success mb-2" size={24} />
                <p className="text-muted mb-1">Average Participation</p>
                <h5 className="fw-bold">88%</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center border-0 shadow-sm p-3">
                <Clock className="text-info mb-2" size={24} />
                <p className="text-muted mb-1">Active Sessions</p>
                <h5 className="fw-bold">3</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="card-body bg-light rounded">
          <h5 className="mb-3 fw-bold">Student Performance</h5>
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Participation</th>
                <th scope="col">Questions Answered</th>
                <th scope="col">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat.id}>
                  <td>{stat.student}</td>
                  <td>{stat.participation}</td>
                  <td>{stat.questionsAnswered}</td>
                  <td>{stat.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

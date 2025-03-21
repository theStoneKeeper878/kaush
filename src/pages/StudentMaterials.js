import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMaterials(data.materials);
      })
      .catch((err) => console.error("Error fetching materials:", err));
  }, []);

  // Fetch Queries for a Selected Material
  const fetchQueries = async (materialId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/materials/${materialId}/queries`);
      const data = await response.json();
      if (data.success) {
        setQueries(data.queries);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  // Handle Query Submission
  const handleQuerySubmit = async () => {
    if (!query) return alert("Enter your question!");

    try {
      const response = await fetch(`http://localhost:5000/api/materials/${selectedMaterial}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: "12345", studentName: "John Doe", queryText: query }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Query submitted!");
        setQuery("");
        fetchQueries(selectedMaterial); // Refresh query list
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting query:", error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">Lecture Materials</h1>

      {materials.length === 0 ? (
        <p className="text-center text-muted">No materials available.</p>
      ) : (
        <div className="row g-4">
          {materials.map((material) => (
            <div key={material._id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{material.title}</h5>
                  <a
                    href={`http://localhost:5000${material.filePath}`}
                    download
                    className="btn btn-primary btn-sm"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => {
                      setSelectedMaterial(material._id);
                      setIsModalOpen(true);
                      fetchQueries(material._id);
                    }}
                    className="btn btn-success btn-sm ms-3"
                  >
                    Ask a Query
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Query Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ask a Query</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your question..."
                  className="form-control mb-3"
                ></textarea>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary me-2"
                  >
                    Cancel
                  </button>
                  <button onClick={handleQuerySubmit} className="btn btn-primary">
                    Submit Query
                  </button>
                </div>

                {/* Queries List */}
                <h6 className="mt-4 fw-bold">Previous Queries</h6>
                {queries.length > 0 ? (
                  <ul className="list-group mt-2">
                    {queries.map((query) => (
                      <li key={query._id} className="list-group-item">
                        <strong>{query.studentName}:</strong> {query.queryText}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No queries yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;

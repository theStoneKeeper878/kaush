import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MaterialManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [queries, setQueries] = useState([]);

  // Fetch Materials
  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/materials");
      const data = await response.json();
      if (data.success) setMaterials(data.materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Fetch Queries for a Material
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

  // Handle File Upload
  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/materials/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Material uploaded successfully!");
        setTitle("");
        setFile(null);
        setIsOpen(false);
        fetchMaterials(); // Refresh list
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "100vh", background: "#ffffff", color: "black" }}>
      <h1 className="text-center fw-bold mb-4">📂 Material Management</h1>
      <p className="text-center text-secondary mb-4">Upload, view, and manage lecture materials.</p>

      {/* Upload Button */}
      <div className="d-flex justify-content-center mb-4">
        <button onClick={() => setIsOpen(true)} className="btn btn-primary px-4 py-2 fw-bold shadow-sm">
          Upload Material
        </button>
      </div>

      {/* Upload Modal */}
      {isOpen && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <div className="modal-header border-0">
                <h5 className="modal-title">Upload Material</h5>
                <button type="button" className="btn-close" onClick={() => setIsOpen(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter material title"
                />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" />
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Materials */}
      <div className="mt-5">
        <h2 className="mb-3 text-center">📄 Uploaded Materials</h2>
        {materials.length === 0 ? (
          <p className="text-center text-secondary">No materials uploaded yet.</p>
        ) : (
          <div className="row">
            {materials.map((material) => (
              <div key={material._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{material.title}</h5>
                    <div className="d-flex justify-content-between">
                      <a
                        href={`http://localhost:5000${material.filePath}`}
                        className="btn btn-outline-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📥 Download
                      </a>
                      <button
                        onClick={() => {
                          setSelectedMaterial(material._id);
                          fetchQueries(material._id);
                        }}
                        className="btn btn-info btn-sm"
                      >
                        💬 View Queries
                      </button>
                    </div>
                    {selectedMaterial === material._id && queries.length > 0 && (
                      <ul className="list-group mt-3">
                        {queries.map((query) => (
                          <li key={query._id} className="list-group-item">
                            <strong>{query.studentName}:</strong> {query.queryText}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialManagement;

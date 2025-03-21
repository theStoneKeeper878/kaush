import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddQuestion = ({ onClose }) => {
  const [question, setQuestion] = useState("");
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  // Fetch materials from backend
  useEffect(() => {
    fetch("/api/lectures") // Updated API call
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Error fetching materials:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!question || !selectedMaterial) {
      alert("Please enter a question and select a material.");
      return;
    }

    const response = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, materialId: selectedMaterial }),
    });

    if (response.ok) {
      alert("Question added successfully!");
      onClose();
    } else {
      alert("Failed to add question");
    }
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4" style={{ borderRadius: "10px" }}>
          <div className="modal-header">
            <h5 className="modal-title">📝 Add Question</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-bold">Question</label>
              <textarea
                className="form-control"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                rows="3"
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Select Material</label>
              <select
                className="form-select"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                <option value="">Choose...</option>
                {materials.map((material) => (
                  <option key={material._id} value={material._id}>
                    {material.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              ❌ Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              ✅ Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

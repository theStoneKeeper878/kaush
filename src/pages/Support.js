import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Support = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How do I upload materials?',
      answer:
        'Go to the Materials section and click on the "Upload Material" button. You can upload PDFs, PPTs, or add links to external resources.',
    },
  ];

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center py-5 bg-light">
      <div className="card shadow-lg w-100 max-w-2xl p-4">
        <div className="d-flex align-items-center mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-light me-3">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="fs-4 fw-semibold text-dark">Support</h1>
        </div>

        {/* Contact Support Section */}
        <div className="mb-4 border-bottom pb-3">
          <h2 className="fs-5 fw-medium text-dark d-flex align-items-center">
            <MessageCircle className="h-5 w-5 text-primary me-2" /> Contact Support
          </h2>
          <form className="mt-3">
            <div className="mb-2">
              <input type="text" placeholder="Subject" className="form-control" />
            </div>
            <div className="mb-2">
              <textarea placeholder="Message" rows={4} className="form-control"></textarea>
            </div>
            <button className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="fs-5 fw-medium text-dark d-flex align-items-center">
            <HelpCircle className="h-5 w-5 text-primary me-2" /> FAQs
          </h2>
          <div className="mt-3">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-3">
                <h3 className="fs-6 fw-semibold text-dark">{faq.question}</h3>
                <p className="text-muted small mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

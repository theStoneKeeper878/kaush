import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, PlayCircle, FileText, HelpCircle, Settings, LogOut, BookOpenCheck } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: BookOpenCheck, label: 'Lectures', path: '/lectures' },
    { icon: BookOpen, label: 'Manage Materials', path: '/materials' },
    { icon: Users, label: 'Start Live Session', path: '/live' },
    { icon: PlayCircle, label: 'Manage Quizzes', path: '/quiz' },
    { icon: FileText, label: 'Statistics', path: '/statistics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-gradient">
      <div className="container glass-card p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h1 className="fs-3 fw-bold text-dark">Teacher Dashboard</h1> {/* Changed to text-dark */}
          <button
            onClick={() => navigate('/')}
            className="btn btn-danger d-flex align-items-center px-3 py-2"
          >
            <LogOut className="me-2" />
            Sign Out
          </button>
        </div>
  
        {/* Menu Grid */}
        <div className="row g-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} className="col-md-6 col-lg-4">
                <button
                  onClick={() => navigate(item.path)}
                  className="menu-button w-100 d-flex align-items-center p-3 rounded-3 shadow-sm"
                >
                  <Icon className="me-3 icon-style" size={30} />
                  <span className="fs-5 text-dark">{item.label}</span> {/* Changed to text-dark */}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

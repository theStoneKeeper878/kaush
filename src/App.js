import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MaterialManagement from './pages/MaterialManagement';
import StudentMaterials from './pages/StudentMaterials';
import QuizManagement from './pages/QuizManagement';
import LiveSession from './pages/LiveSession';
import Statistics from './pages/Statistics';
import { AuthProvider } from './context/AuthContext';
import Support from './pages/Support';
import Settings from './pages/Settings';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ✅ All Pages are Public (No Login Required) */}
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/support' element={<Support />} />
        
          <Route path='/materials' element={<StudentMaterials />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/teacher' element={<TeacherDashboard />} />
          <Route path='/student' element={<StudentDashboard />} />
          <Route path='/lectures' element={<MaterialManagement />} />
          <Route path='/quiz-management' element={<QuizManagement />} />
          <Route path="/live" element={<LiveSession />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
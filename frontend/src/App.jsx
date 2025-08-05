import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import Resources from './pages/Resources.jsx';
import Teachers from './pages/Teachers.jsx';
import About from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx';
import LessonPage from './pages/Lesson.jsx'
import Exercise from './pages/Exercise.jsx';
import Logout from './components/Logout.jsx';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/teachers" element={<Teachers />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/:courseId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/:courseId/exercise/:exerciseId" element={<Exercise />} />
        <Route path="/logout" element={<Logout />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

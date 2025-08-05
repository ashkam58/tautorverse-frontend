// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditResourcePage from "./pages/EditResourcePage"; // <-- Import
import ResourceFeedPage from "./pages/ResourceFeedPage";
import ProfilePage from "./pages/ProfilePage";
import CreateResourcePage from "./pages/CreateResourcePage"; // <-- Import
import HomeworkFeedPage from "./pages/HomeworkFeedPage";
import CreateHomeworkPage from "./pages/CreateHomeworkPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import UserDirectoryPage from "./pages/UserDirectoryPage";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resources" element={<ResourceFeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route
                path="/resources/create"
                element={<CreateResourcePage />}
              />

              <Route path="/resources/edit/:id" element={<EditResourcePage />} />
              {/* We can add more teacher-only routes here in the future */}
            </Route>
            <Route path="/homework" element={<HomeworkFeedPage />} />
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/homework/create" element={<CreateHomeworkPage />} />
            </Route>
            {/* User Directory and Profile Routes */}
            <Route element={<ProtectedRoute />}> {/* No roles needed, just authentication */}
    <Route path='/users' element={<UserDirectoryPage />} />
    <Route path='/users/:id' element={<UserProfilePage />} />
</Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

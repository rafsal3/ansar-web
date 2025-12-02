import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Courses from "@/pages/Courses";
import Notifications from "@/pages/Notifications";
import NotificationDetail from "@/pages/NotificationDetail";
import Contact from "@/pages/Contact";
import Faculty from "@/pages/Faculty";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Memories from "@/pages/Memories";
import BatchMates from "@/pages/BatchMates";
import EditProfile from "@/pages/EditProfile";
import OccupationAlumni from "@/pages/OccupationAlumni";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import NewsAdmin from "@/pages/admin/NewsAdmin";
import EventsAdmin from "@/pages/admin/EventsAdmin";
import CoursesAdmin from "@/pages/admin/CoursesAdmin";
import FacultyAdmin from "@/pages/admin/FacultyAdmin";
import AlumniAdmin from "@/pages/admin/AlumniAdmin";
import MemoriesAdmin from "@/pages/admin/MemoriesAdmin";
import NotificationsAdmin from "@/pages/admin/NotificationsAdmin";
import OccupationsAdmin from "@/pages/admin/OccupationsAdmin";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes - With Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="courses" element={<Courses />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="notifications/:id" element={<NotificationDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faculty" element={<Faculty />} />

          {/* Alumni Routes */}
          <Route path="memories" element={<Memories />} />
          <Route path="batch-mates" element={<BatchMates />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="alumni/occupation/:occupation" element={<OccupationAlumni />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="courses" element={<CoursesAdmin />} />
          <Route path="faculty" element={<FacultyAdmin />} />
          <Route path="alumni" element={<AlumniAdmin />} />
          <Route path="occupations" element={<OccupationsAdmin />} />
          <Route path="memories" element={<MemoriesAdmin />} />
          <Route path="notifications" element={<NotificationsAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

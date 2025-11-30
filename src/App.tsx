import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Courses from "@/pages/Courses";
import Notifications from "@/pages/Notifications";
import Contact from "@/pages/Contact";
import Faculty from "@/pages/Faculty";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetail />} />
        <Route path="courses" element={<Courses />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faculty" element={<Faculty />} />
      </Route>
    </Routes>
  );
}

export default App;

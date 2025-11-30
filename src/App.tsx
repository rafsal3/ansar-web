import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import Events from "@/pages/Events";
import Courses from "@/pages/Courses";
import Notifications from "@/pages/Notifications";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="events" element={<Events />} />
        <Route path="courses" element={<Courses />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default App;

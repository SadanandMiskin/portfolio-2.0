import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import ProjectDetail from "./components/ProjectDetail";
import Projects from "./components/Projects";
// import Blogs from "./components/About";
import Contact from "./components/Contact";
import NotFoundPage from "./components/NotFoundPage";
import About from "./components/About";

const App = () => {
  return (
    <BrowserRouter>
    <main className="bg-zinc-950 dark:bg-white max-h-full h-full flex flex-col items-center overflow-y-hidden ">
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      <Footer />
    </main>
    </BrowserRouter>

  );
};

export default App;

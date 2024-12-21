import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubjectView from "./pages/SubjectView";
import LevelView from "./pages/LevelView";
import ChapterDetail from "./pages/ChapterDetail";
import BacSubjects from "./pages/BacSubjects";
import { DissertationTopics } from "./components/DissertationTopics";
import { EC1Topics } from "./components/EC1Topics";
import { EC2Topics } from "./components/EC2Topics";
import { EC3Topics } from "./components/EC3Topics";

function App() {
  const dissertationChapters = [
    { id: '1', title: 'Croissance économique' },
  ];

  const ec1Chapters = [
    { id: '1', title: 'EC1 : Croissance économique' },
  ];

  const ec2Chapters = [
    { id: '1', title: 'EC2 : Croissance économique' },
  ];

  const ec3Chapters = [
    { id: '1', title: 'EC3 : Croissance économique' },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/matiere/:subject" element={<SubjectView />} />
        <Route path="/niveau/:level" element={<LevelView />} />
        <Route path="/chapitre/:chapterId" element={<ChapterDetail />} />
        <Route path="/sujets-bac" element={<BacSubjects />} />
        {dissertationChapters.map((chapter) => (
          <Route
            key={chapter.id}
            path={`/dissertation/${chapter.id}`}
            element={
              <DissertationTopics
                chapter={chapter.id}
                title={`Dissertation Chapitre ${chapter.id} : ${chapter.title}`}
              />
            }
          />
        ))}
        {ec1Chapters.map((chapter) => (
          <Route
            key={chapter.id}
            path={`/ec1/${chapter.id}`}
            element={
              <EC1Topics
                chapter={chapter.id}
                title={`EC1 Chapitre ${chapter.id} : ${chapter.title}`}
              />
            }
          />
        ))}
        {ec2Chapters.map((chapter) => (
          <Route
            key={chapter.id}
            path={`/ec2/${chapter.id}`}
            element={
              <EC2Topics
                chapter={chapter.id}
                title={`EC2 Chapitre ${chapter.id} : ${chapter.title}`}
              />
            }
          />
        ))}
        {ec3Chapters.map((chapter) => (
          <Route
            key={chapter.id}
            path={`/ec3/${chapter.id}`}
            element={
              <EC3Topics
                chapter={chapter.id}
                title={`EC3 Chapitre ${chapter.id} : ${chapter.title}`}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
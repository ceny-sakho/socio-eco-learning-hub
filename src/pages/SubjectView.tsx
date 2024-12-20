import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const subjectTitles = {
  "science-eco": "Science économique (SES)",
  "socio": "Sociologie / Science Politique (SES)",
  "regards": "Regards croisés (SES)"
} as const;

type SubjectTitle = keyof typeof subjectTitles;

const chapterImages = {
  "seconde-ch1": "photo-1488590528505-98d2b5aba04b",
  "seconde-ch2": "photo-1460925895917-afdab827c52f",
  "seconde-ch3": "photo-1498050108023-c5249f4df085",
  "premiere-ch1": "photo-1605810230434-7631ac76ec81",
  "premiere-ch2": "photo-1518770660439-4636190af475",
  "premiere-ch3": "photo-1461749280684-dccba630e2f6",
} as const;

interface Chapter {
  id: string;
  title: string;
}

interface ChaptersData {
  seconde: Chapter[];
  premiere: Chapter[];
  terminale: Chapter[];
}

interface ChaptersPerSubject {
  [key: string]: ChaptersData;
}

const SubjectView = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLevel, setSelectedLevel] = React.useState("all");

  const getChaptersForSubject = (): ChaptersData => {
    const chaptersData: ChaptersPerSubject = {
      "science-eco": {
        seconde: [
          { id: "seconde-ch1", title: "Comment les économistes, les sociologues et les politistes raisonnent-ils et travaillent-ils ?" },
          { id: "seconde-ch2", title: "Comment crée-t-on des richesses et comment les mesure-t-on ?" },
          { id: "seconde-ch3", title: "Comment se forment les prix sur un marché ?" }
        ],
        premiere: [
          { id: "premiere-ch1", title: "Comment un marché concurrentiel fonctionne-t-il ?" },
          { id: "premiere-ch2", title: "Comment les marchés imparfaitement concurrentiels fonctionnent-ils ?" }
        ],
        terminale: [
          { id: "terminale-ch1", title: "Quels sont les sources et les défis de la croissance économique ?" }
        ]
      },
    };
    return chaptersData[subject as keyof typeof chaptersData] || {
      seconde: [],
      premiere: [],
      terminale: []
    };
  };

  const filteredChapters = React.useMemo(() => {
    const chapters = getChaptersForSubject();
    const allChapters = Object.entries(chapters).flatMap(([level, chaps]) => 
      chaps.map(chap => ({ ...chap, level }))
    );

    return allChapters.filter(chapter => {
      const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === "all" || chapter.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [subject, searchTerm, selectedLevel]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <nav className="flex gap-2 text-sm text-gray-500">
              <button onClick={() => navigate("/")} className="hover:text-gray-900">Accueil</button>
              <ChevronRight className="h-4 w-4" />
              <span>Tous les articles</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900">{subjectTitles[subject as SubjectTitle]}</span>
            </nav>
            <h1 className="text-4xl font-bold">{subjectTitles[subject as SubjectTitle]}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Recherche</h2>
              <Input 
                type="search" 
                placeholder="Votre recherche.." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Niveaux</h2>
              <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Toutes les étiquettes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premiere" id="premiere" />
                    <Label htmlFor="premiere">niveau première</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seconde" id="seconde" />
                    <Label htmlFor="seconde">niveau seconde</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="terminale" id="terminale" />
                    <Label htmlFor="terminale">niveau terminale</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredChapters.map((chapter) => (
                <Card 
                  key={chapter.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => navigate(`/chapitre/${chapter.id}`)}
                >
                  <div className="aspect-video relative">
                    <img
                      src={`https://images.unsplash.com/${chapterImages[chapter.id as keyof typeof chapterImages]}`}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">{chapter.title}</h3>
                    <p className="text-sm text-gray-500">Niveau {chapter.level}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectView;
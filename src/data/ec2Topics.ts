interface EC2Topic {
  question: string;
  year: string;
  location: string;
}

interface TopicsByChapter {
  [key: string]: EC2Topic[];
}

export const ec2Topics: TopicsByChapter = {
  "1": [
    { question: "Montrez le rôle des droits de propriété sur la croissance économique.", year: "2023", location: "France Métropolitaine" },
    { question: "Montrez que l'accroissement de la productivité globale des facteurs est une source de croissance économique.", year: "2022", location: "France Métropolitaine" },
    { question: "Montrez que l'innovation peut aider à repousser les limites écologiques de la croissance dans le secteur de l'énergie.", year: "2022", location: "Polynésie" },
    { question: "Montrez comment l'innovation peut rendre la croissance économique soutenable.", year: "2021", location: "France Métropolitaine" },
    { question: "Montrez le caractère endogène du progrès technique.", year: "2021", location: "Autres centres étrangers" },
    { question: "Montrez que la Productivité Globale des Facteurs constitue une source essentielle de la croissance économique.", year: "2021", location: "Amérique du Nord" },
    { question: "Montrez que les contributions à la croissance ne se réduisent pas à la seule accumulation des facteurs de production.", year: "2021", location: "Asie" },
    // ... autres questions du chapitre 1
  ],
  "2": [
    { question: "Vous expliquerez les échanges de véhicules entre pays comparables.", year: "2023", location: "La Réunion" },
    { question: "Vous expliquerez le commerce entre pays comparables.", year: "2023", location: "Autres centres étrangers" },
    { question: "Vous montrerez que les dotations factorielles et technologiques permettent d'expliquer les spécialisations internationales.", year: "2022", location: "Amérique du Nord" },
    // ... autres questions du chapitre 2
  ],
  // ... autres chapitres avec leurs questions respectives
};
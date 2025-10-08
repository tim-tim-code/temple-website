export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  questions: FAQItem[];
}

export interface FAQData {
  title: string;
  introduction: string;
  sections: FAQSection[];
}

export const faqData: Record<string, FAQData> = {
  en: {
    title: 'Frequently Asked Questions',
    introduction: 'Welcome to our FAQ section. Here you will find answers to the most common questions about Dalin Si, our practices, and how you can get involved. If you don\'t find what you\'re looking for, please feel free to contact us.',
    sections: [
      {
        title: 'General',
        questions: [
          {
            question: 'What is Dalin Si?',
            answer: 'Dalin Si (大林寺) is a living project. At present, it exists as a sanctuary for animals and a place for small-scale classes. In the future, with the support of many masters and teachers who have placed their trust in this project, our wish is to establish a dedicated retreat center in France.'
          },
          {
            question: 'Is Dalin Si a religious institution?',
            answer: 'No, Dalin Si is not a religious institution. The Temple is held by lay people, not tied to any dogma or religious obligation. It aims to offer a space for practice, reflection, and community life, inspired by Taoist and Chan wisdoms.'
          },
          {
            question: 'Where is Dalin Si located?',
            answer: 'The administrative headquarters of Dalin Si are in France as a non-profit organisation registered under French legislation (Loi 1901).\nThe temporary activity location is in Czech Republic where the former animals of Shaolin Temple Europe found a time-limited refuge.\nThe final settlement of Dalin Si is likely to be in France.'
          },
          {
            question: 'How can I support Dalin Si?',
            answer: 'By helping us find our final settlement, spreading the word, or supporting our care for the animals. Donations of time, skills, or resources are always welcome.'
          },
          {
            question: 'Is there a membership fee?',
            answer: 'No. Membership is free. Dalin Si\'s economy currently relies on donations and, once the permanent location is established, will be sustained through retreats.'
          }
        ]
      },
      {
        title: 'Practice & Visits',
        questions: [
          {
            question: 'What is QiGong?',
            answer: 'QiGong is an ancient Chinese art of cultivating life energy (Qi) through movement, breathing, and awareness.'
          },
          {
            question: 'Do you organize retreats?',
            answer: 'Due to our long time experience in holding retreats in Shaolin Temple Europe, Dalin Si will offer retreats as soon as the right location is aligned with the unified principles, providing visitors with the opportunity to experience temple life in its essential simplicity.'
          },
          {
            question: 'Can I just come for a day?',
            answer: 'Our priority is to care for the animals and maintain a simple rhythm of life. For this reason, the farm in Černá Hora is not open as a public temple. Visits are only possible during scheduled classes, activities, or appointments.'
          },
          {
            question: 'What languages are spoken?',
            answer: 'We speak English, French, Czech, and German.'
          },
          {
            question: 'Are families with children welcome?',
            answer: 'Yes. Families are welcome to join classes and activities.'
          }
        ]
      },
      {
        title: 'Animals',
        questions: [
          {
            question: 'What kind of animals live at Dalin Si?',
            answer: 'Find more about the Animals on the dedicated page.'
          },
          {
            question: 'Is Dalin Si accepting new animals?',
            answer: 'For now, we can only care for the animals already present with us, offering them the best care and preparing a sustainable future.'
          },
          {
            question: 'Can visitors interact with the animals?',
            answer: 'The actual activity location is not open to the public, but during specific classes or events, interaction may happen in a respectful, guided way. For visits, you can always contact us at info@dalinsi.org.'
          }
        ]
      }
    ]
  },
  de: {
    title: 'Häufig gestellte Fragen',
    introduction: 'Willkommen in unserem FAQ-Bereich. Hier finden Sie Antworten auf die häufigsten Fragen zu Dalin Si, unseren Praktiken und wie Sie sich beteiligen können. Wenn Sie nicht finden, was Sie suchen, können Sie uns gerne kontaktieren.',
    sections: [
      {
        title: 'Allgemein',
        questions: [
          {
            question: 'Was ist Dalin Si?',
            answer: 'Dalin Si (大林寺) ist ein lebendiges Projekt. Derzeit existiert es als Tierschutzgebiet und Ort für kleine Kurse. In Zukunft möchten wir mit der Unterstützung vieler Meister und Lehrer, die ihr Vertrauen in dieses Projekt gesetzt haben, ein Retreat-Zentrum in Frankreich errichten.'
          },
          {
            question: 'Ist Dalin Si eine religiöse Institution?',
            answer: 'Nein, Dalin Si ist keine religiöse Institution. Der Tempel wird von Laien geführt, nicht an Dogmen oder religiöse Verpflichtungen gebunden. Er soll einen Raum für Praxis, Reflexion und Gemeinschaftsleben bieten, inspiriert von taoistischen und Chan-Weisheiten.'
          },
          {
            question: 'Wo befindet sich Dalin Si?',
            answer: 'Der Verwaltungssitz von Dalin Si ist in Frankreich als gemeinnützige Organisation nach französischem Recht (Loi 1901) registriert.\nDer temporäre Aktivitätsort ist in der Tschechischen Republik, wo die ehemaligen Tiere des Shaolin Temple Europe zeitlich begrenzt Zuflucht gefunden haben.\nDie endgültige Niederlassung von Dalin Si wird wahrscheinlich in Frankreich sein.'
          },
          {
            question: 'Wie kann ich Dalin Si unterstützen?',
            answer: 'Indem Sie uns helfen, unseren endgültigen Standort zu finden, das Wort zu verbreiten oder unsere Tierpflege zu unterstützen. Spenden von Zeit, Fähigkeiten oder Ressourcen sind immer willkommen.'
          },
          {
            question: 'Gibt es eine Mitgliedsgebühr?',
            answer: 'Nein. Die Mitgliedschaft ist kostenlos. Die Wirtschaft von Dalin Si basiert derzeit auf Spenden und wird, sobald der dauerhafte Standort etabliert ist, durch Retreats unterstützt.'
          }
        ]
      },
      {
        title: 'Praxis & Besuche',
        questions: [
          {
            question: 'Was ist QiGong?',
            answer: 'QiGong ist eine alte chinesische Kunst zur Kultivierung von Lebensenergie (Qi) durch Bewegung, Atmung und Bewusstsein.'
          },
          {
            question: 'Organisieren Sie Retreats?',
            answer: 'Aufgrund unserer langjährigen Erfahrung in der Durchführung von Retreats im Shaolin Temple Europe wird Dalin Si Retreats anbieten, sobald der richtige Ort mit den einheitlichen Prinzipien übereinstimmt und Besuchern die Möglichkeit bietet, das Tempelleben in seiner wesentlichen Einfachheit zu erleben.'
          },
          {
            question: 'Kann ich einfach für einen Tag kommen?',
            answer: 'Unsere Priorität ist es, uns um die Tiere zu kümmern und einen einfachen Lebensrhythmus aufrechtzuerhalten. Aus diesem Grund ist der Hof in Černá Hora nicht als öffentlicher Tempel geöffnet. Besuche sind nur während geplanter Kurse, Aktivitäten oder Termine möglich.'
          },
          {
            question: 'Welche Sprachen werden gesprochen?',
            answer: 'Wir sprechen Englisch, Französisch, Tschechisch und Deutsch.'
          },
          {
            question: 'Sind Familien mit Kindern willkommen?',
            answer: 'Ja. Familien sind willkommen, an Kursen und Aktivitäten teilzunehmen.'
          }
        ]
      },
      {
        title: 'Tiere',
        questions: [
          {
            question: 'Welche Arten von Tieren leben bei Dalin Si?',
            answer: 'Erfahren Sie mehr über die Tiere auf der dedizierten Seite.'
          },
          {
            question: 'Nimmt Dalin Si neue Tiere auf?',
            answer: 'Derzeit können wir nur für die bereits bei uns lebenden Tiere sorgen und ihnen die beste Pflege bieten sowie eine nachhaltige Zukunft vorbereiten.'
          },
          {
            question: 'Können Besucher mit den Tieren interagieren?',
            answer: 'Der aktuelle Aktivitätsort ist nicht öffentlich zugänglich, aber während spezifischer Kurse oder Veranstaltungen kann Interaktion auf respektvolle, geführte Weise stattfinden. Für Besuche können Sie uns jederzeit unter info@dalinsi.org kontaktieren.'
          }
        ]
      }
    ]
  },
  fr: {
    title: 'Questions fréquemment posées',
    introduction: 'Bienvenue dans notre section FAQ. Vous trouverez ici des réponses aux questions les plus courantes sur Dalin Si, nos pratiques et comment vous pouvez vous impliquer. Si vous ne trouvez pas ce que vous cherchez, n\'hésitez pas à nous contacter.',
    sections: [
      {
        title: 'Général',
        questions: [
          {
            question: 'Qu\'est-ce que Dalin Si ?',
            answer: 'Dalin Si (大林寺) est un projet vivant. Actuellement, il existe comme sanctuaire pour les animaux et lieu de petites classes. À l\'avenir, avec le soutien de nombreux maîtres et enseignants qui ont placé leur confiance dans ce projet, notre souhait est d\'établir un centre de retraite dédié en France.'
          },
          {
            question: 'Dalin Si est-il une institution religieuse ?',
            answer: 'Non, Dalin Si n\'est pas une institution religieuse. Le Temple est tenu par des laïcs, non lié à un dogme ou à une obligation religieuse. Il vise à offrir un espace pour la pratique, la réflexion et la vie communautaire, inspiré par les sagesses taoïste et Chan.'
          },
          {
            question: 'Où se trouve Dalin Si ?',
            answer: 'Le siège administratif de Dalin Si est en France en tant qu\'organisation à but non lucratif enregistrée sous la législation française (Loi 1901).\nLe lieu d\'activité temporaire est en République tchèque où les anciens animaux du Temple Shaolin Europe ont trouvé refuge de manière limitée dans le temps.\nL\'établissement final de Dalin Si sera probablement en France.'
          },
          {
            question: 'Comment puis-je soutenir Dalin Si ?',
            answer: 'En nous aidant à trouver notre établissement final, en faisant passer le mot, ou en soutenant nos soins aux animaux. Les dons de temps, de compétences ou de ressources sont toujours bienvenus.'
          },
          {
            question: 'Y a-t-il des frais d\'adhésion ?',
            answer: 'Non. L\'adhésion est gratuite. L\'économie de Dalin Si repose actuellement sur les dons et, une fois l\'emplacement permanent établi, sera soutenue par les retraites.'
          }
        ]
      },
      {
        title: 'Pratique & Visites',
        questions: [
          {
            question: 'Qu\'est-ce que le QiGong ?',
            answer: 'Le QiGong est un art chinois ancien de cultiver l\'énergie vitale (Qi) par le mouvement, la respiration et la conscience.'
          },
          {
            question: 'Organisez-vous des retraites ?',
            answer: 'En raison de notre longue expérience dans l\'organisation de retraites au Temple Shaolin Europe, Dalin Si offrira des retraites dès que le bon lieu sera aligné avec les principes unifiés, offrant aux visiteurs l\'opportunité de vivre la vie du temple dans sa simplicité essentielle.'
          },
          {
            question: 'Puis-je venir juste pour une journée ?',
            answer: 'Notre priorité est de prendre soin des animaux et de maintenir un rythme de vie simple. Pour cette raison, la ferme à Černá Hora n\'est pas ouverte comme temple public. Les visites ne sont possibles que lors de classes, d\'activités ou de rendez-vous programmés.'
          },
          {
            question: 'Quelles langues sont parlées ?',
            answer: 'Nous parlons anglais, français, tchèque et allemand.'
          },
          {
            question: 'Les familles avec enfants sont-elles les bienvenues ?',
            answer: 'Oui. Les familles sont les bienvenues pour rejoindre les classes et activités.'
          }
        ]
      },
      {
        title: 'Animaux',
        questions: [
          {
            question: 'Quels types d\'animaux vivent à Dalin Si ?',
            answer: 'Découvrez plus sur les Animaux sur la page dédiée.'
          },
          {
            question: 'Dalin Si accepte-t-il de nouveaux animaux ?',
            answer: 'Pour l\'instant, nous ne pouvons nous occuper que des animaux déjà présents avec nous, leur offrant les meilleurs soins et préparant un avenir durable.'
          },
          {
            question: 'Les visiteurs peuvent-ils interagir avec les animaux ?',
            answer: 'Le lieu d\'activité actuel n\'est pas ouvert au public, mais lors de classes ou d\'événements spécifiques, l\'interaction peut se faire de manière respectueuse et guidée. Pour les visites, vous pouvez toujours nous contacter à info@dalinsi.org.'
          }
        ]
      }
    ]
  }
};
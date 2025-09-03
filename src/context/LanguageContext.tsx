import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const detectBrowserLanguage = (): string => {
  // Get browser language preferences
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  
  // Extract the primary language code (e.g., "de-DE" -> "de")
  const primaryLang = browserLang.split('-')[0].toLowerCase();
  
  // Map to supported languages
  if (primaryLang === 'de') return 'de';
  if (primaryLang === 'fr') return 'fr';
  
  // Default to English for all other languages
  return 'en';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    // Check if there's a saved language preference in localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['en', 'de', 'fr'].includes(savedLang)) {
      return savedLang;
    }
    
    // Otherwise, detect from browser
    return detectBrowserLanguage();
  });

  const translations = {
    en: {
      // Navigation
      'nav.about': 'About',
      'nav.forwhom': 'For Whom',
      'nav.instructors': 'Teachers',
      'nav.offerings': 'Offerings',
      'nav.support': 'Help us',
      
      // Hero Section
      'hero.title': 'Let\u2019s find our way together',
      'hero.email.placeholder': 'Your email address',
      'hero.email.button': 'Keep me updated',
      'hero.gdpr': 'I agree to receive updates about the Temple of the Great Forest and understand I can unsubscribe at any time.',
      
      // About Section
      'about.title': 'What is the Temple?',
      'about.subtitle': 'This is a temple of no separation.',
      'about.p1': 'Not a Buddhist temple, not a secular center. A temple where the sacred and ordinary breathe as one.',
      'about.p2': 'Where meditation cushions rest alongside garden tools, where silent sitting flows into shared meals, where ancient wisdom meets the simple work of daily life.',
      'about.p3': 'Here, practice is not separate from living — it is living, fully and without pretense.',
      
      // For Whom Section
      'forwhom.title': 'For Whom?',
      'forwhom.card1.title': 'Seekers',
      'forwhom.card1.subtitle': 'Who question everything',
      'forwhom.card1.desc': 'Those who have looked beyond conventional answers and seek a path that honors both depth and simplicity.',
      'forwhom.card2.title': 'Practitioners',
      'forwhom.card2.subtitle': 'Ready for real commitment',
      'forwhom.card2.desc': 'Experienced meditators who want to deepen their practice in a supportive, no-nonsense environment.',
      'forwhom.card3.title': 'Community Builders',
      'forwhom.card3.subtitle': 'Who value authentic connection',
      'forwhom.card3.desc': 'People drawn to create and participate in intentional community rooted in wisdom and mutual support.',
      'forwhom.card4.title': 'Life Transitioners',
      'forwhom.card4.subtitle': 'Navigating change',
      'forwhom.card4.desc': 'Those in life transitions who need a grounding space to reflect, reset, and discover their next authentic step.',
      
      // What Will You Find Section
      'whatwillyoufind.title': 'What Will You Find?',
      'whatwillyoufind.shortterm.title': 'Short-term retreat',
      'whatwillyoufind.shortterm.duration': 'Weekend or week',
      'whatwillyoufind.shortterm.desc': 'Perfect for those seeking a brief respite and introduction to temple life.',
      'whatwillyoufind.longterm.title': 'Long-term stay',
      'whatwillyoufind.longterm.duration': 'Hermit-volunteer or hermit-practitioner',
      'whatwillyoufind.longterm.desc': 'For those called to deeper immersion in practice and community life.',
      'whatwillyoufind.offered.title': 'What\u2019s Offered',
      'whatwillyoufind.offered.1': 'Morning and evening meditation',
      'whatwillyoufind.offered.2': 'Shared meals and simple accommodations',
      'whatwillyoufind.offered.3': 'A humble frame with quality teaching',
      'whatwillyoufind.offered.4': '6 hours of practice/day',
      'whatwillyoufind.instructors.title': 'Instructors',
      
      // Support Section
      'support.title': 'How to Support the Temple',
      'support.subtitle': 'Your contribution helps sustain this living sanctuary and the community that calls it home.',
      'support.donation.title': 'Make a Donation',
      'support.donation.desc': 'Support our daily operations, community programs, and the continuation of authentic dharma practice.',
      'support.donation.button': 'Donate Now',
      'support.wishlist.title': 'Temple Wishlist',
      'support.wishlist.desc': 'Practical items needed for daily temple life, meditation practice, and community activities.',
      'support.wishlist.button': 'View Wishlist',
      'support.closing': 'Every gift, no matter the size, helps preserve this space for authentic spiritual practice.',
      
      // Tao Quotes - organized as line pairs for lyric animation
      'tao.intro': 'Thus it is said:',
      'tao.lines': [
        ['The path into the light seems dark,', 'the path forward seems to go back,'],
        ['the direct path seems long,', 'true power seems weak,'],
        ['true purity seems tarnished,', 'true steadfastness seems changeable,'],
        ['true clarity seems obscure,', 'the greatest art seems unsophisticated,'],
        ['the greatest love seems indifferent,', 'the greatest wisdom seems childish.'],
        ['The Tao is nowhere to be found.', 'Yet it nourishes and completes all things.']
      ],
      // Flat quotes for Apple-Music-style lyrics
      'tao.quotesFlat': [
        'The path into the light seems dark,',
        'the path forward seems to go back,',
        'the direct path seems long,',
        'true power seems weak,',
        'true purity seems tarnished,',
        'true steadfastness seems changeable,',
        'true clarity seems obscure,',
        'the greatest art seems unsophisticated,',
        'the greatest love seems indifferent,',
        'the greatest wisdom seems childish.',
        'The Tao is nowhere to be found.',
        'Yet it nourishes and completes all things.'
      ],
      'tao.attribution': '— Lao Tzu, Tao Te Ching',
      
      // Footer
      'footer.impressum': 'Impressum',
      'footer.privacy': 'Privacy Policy', 
      'footer.terms': 'Terms of Service',
      'footer.contact': 'Contact',
      'footer.rights': 'All rights reserved.',
      'footer.followUs': 'Follow us:'
    },
    de: {
      // Navigation
      'nav.about': 'Über',
      'nav.forwhom': 'Für wen',
      'nav.instructors': 'Lehrer',
      'nav.offerings': 'Angebote',
      'nav.support': 'Hilf uns',
      
      // Hero Section
      'hero.title': 'Lass uns gemeinsam unseren Weg finden',
      'hero.email.placeholder': 'Ihre E-Mail-Adresse',
      'hero.email.button': 'Halte mich auf dem Laufenden',
      'hero.gdpr': 'Ich bin damit einverstanden, Updates über den Tempel des Großen Waldes zu erhalten und verstehe, dass ich mich jederzeit abmelden kann.',
      
      // About Section
      'about.title': 'Was ist der Tempel?',
      'about.subtitle': 'Dies ist ein Tempel ohne Trennung.',
      'about.p1': 'Kein buddhistischer Tempel, kein säkulares Zentrum. Ein Tempel, wo das Heilige und Gewöhnliche als eins atmen.',
      'about.p2': 'Wo Meditationskissen neben Gartenwerkzeugen ruhen, wo stilles Sitzen in gemeinsame Mahlzeiten fließt, wo alte Weisheit auf die einfache Arbeit des täglichen Lebens trifft.',
      'about.p3': 'Hier ist Praxis nicht vom Leben getrennt — sie ist Leben, vollständig und ohne Vorwand.',
      
      // For Whom Section
      'forwhom.title': 'Für wen?',
      'forwhom.card1.title': 'Suchende',
      'forwhom.card1.subtitle': 'Die alles hinterfragen',
      'forwhom.card1.desc': 'Diejenigen, die über herkömmliche Antworten hinausgeblickt haben und einen Pfad suchen, der sowohl Tiefe als auch Einfachheit ehrt.',
      'forwhom.card2.title': 'Praktizierende',
      'forwhom.card2.subtitle': 'Bereit für echte Hingabe',
      'forwhom.card2.desc': 'Erfahrene Meditierende, die ihre Praxis in einer unterstützenden, kompromisslosen Umgebung vertiefen möchten.',
      'forwhom.card3.title': 'Gemeinschaftsbildner',
      'forwhom.card3.subtitle': 'Die authentische Verbindung schätzen',
      'forwhom.card3.desc': 'Menschen, die sich hingezogen fühlen, intentionale Gemeinschaft zu schaffen und daran teilzuhaben, verwurzelt in Weisheit und gegenseitiger Unterstützung.',
      'forwhom.card4.title': 'Lebenswandler',
      'forwhom.card4.subtitle': 'Veränderungen navigieren',
      'forwhom.card4.desc': 'Diejenigen in Lebensübergängen, die einen erdenden Raum brauchen zum Reflektieren, Zurücksetzen und Entdecken ihres nächsten authentischen Schritts.',
      
      // What Will You Find Section
      'whatwillyoufind.title': 'Was wirst du finden?',
      'whatwillyoufind.shortterm.title': 'Kurzzeit-Retreat',
      'whatwillyoufind.shortterm.duration': 'Wochenende oder Woche',
      'whatwillyoufind.shortterm.desc': 'Perfekt für diejenigen, die eine kurze Pause und Einführung in das Tempelleben suchen.',
      'whatwillyoufind.longterm.title': 'Langzeit-Aufenthalt',
      'whatwillyoufind.longterm.duration': 'Einsiedler-Freiwilliger oder Einsiedler-Praktizierender',
      'whatwillyoufind.longterm.desc': 'Für diejenigen, die zu tieferer Eintauchen in Praxis und Gemeinschaftsleben berufen sind.',
      'whatwillyoufind.offered.title': 'Was wird angeboten',
      'whatwillyoufind.offered.1': 'Morgen- und Abendmeditation',
      'whatwillyoufind.offered.2': 'Gemeinsame Mahlzeiten und einfache Unterkünfte',
      'whatwillyoufind.offered.3': 'Ein bescheidener Rahmen mit qualitätsvollem Unterricht',
      'whatwillyoufind.offered.4': '6 Stunden Praxis/Tag',
      'whatwillyoufind.instructors.title': 'Lehrer',
      
      // Support Section
      'support.title': 'Wie Sie den Tempel unterstützen können',
      'support.subtitle': 'Ihr Beitrag hilft, dieses lebende Heiligtum und die Gemeinschaft, die es ihr Zuhause nennt, zu erhalten.',
      'support.donation.title': 'Spenden',
      'support.donation.desc': 'Unterstützen Sie unseren täglichen Betrieb, Gemeinschaftsprogramme und die Fortsetzung authentischer Dharma-Praxis.',
      'support.donation.button': 'Jetzt spenden',
      'support.wishlist.title': 'Tempel-Wunschliste',
      'support.wishlist.desc': 'Praktische Gegenstände für das tägliche Tempelleben, Meditationspraxis und Gemeinschaftsaktivitäten.',
      'support.wishlist.button': 'Wunschliste ansehen',
      'support.closing': 'Jede Gabe, egal wie groß, hilft dabei, diesen Raum für authentische spirituelle Praxis zu bewahren.',
      
      // Tao Quotes - organized as line pairs for lyric animation
      'tao.intro': 'So heißt es:',
      'tao.lines': [
        ['Der Weg ins Licht scheint dunkel,', 'der Weg vorwärts scheint rückwärts zu gehen,'],
        ['der direkte Weg scheint lang,', 'wahre Kraft scheint schwach,'],
        ['wahre Reinheit scheint befleckt,', 'wahre Standhaftigkeit scheint wandelbar,'],
        ['wahre Klarheit scheint unklar,', 'das Größte scheint unraffiniert,'],
        ['die größte Liebe scheint gleichgültig,', 'die größte Weisheit scheint kindlich.'],
        ['Das Tao ist nirgendwo zu finden.', 'Doch es nährt und vollendet alle Dinge.']
      ],
      // Flat quotes for Apple-Music-style lyrics
      'tao.quotesFlat': [
        'Der Weg ins Licht scheint dunkel,',
        'der Weg vorwärts scheint rückwärts zu gehen,',
        'der direkte Weg scheint lang,',
        'wahre Kraft scheint schwach,',
        'wahre Reinheit scheint befleckt,',
        'wahre Standhaftigkeit scheint wandelbar,',
        'wahre Klarheit scheint unklar,',
        'das Größte scheint unraffiniert,',
        'die größte Liebe scheint gleichgültig,',
        'die größte Weisheit scheint kindlich.',
        'Das Tao ist nirgendwo zu finden.',
        'Doch es nährt und vollendet alle Dinge.'
      ],
      'tao.attribution': '— Lao Tzu, Tao Te Ching',
      
      // Footer
      'footer.impressum': 'Impressum',
      'footer.privacy': 'Datenschutzerklärung', 
      'footer.terms': 'Nutzungsbedingungen',
      'footer.contact': 'Kontakt',
      'footer.rights': 'Alle Rechte vorbehalten.',
      'footer.followUs': 'Folge uns:'
    },
    fr: {
      // Navigation
      'nav.about': 'À propos',
      'nav.forwhom': 'Pour qui',
      'nav.instructors': 'Enseignants',
      'nav.offerings': 'Offres',
      'nav.support': 'Aidez-nous',
      
      // Hero Section
      'hero.title': 'Trouvons notre chemin ensemble',
      'hero.email.placeholder': 'Votre adresse e-mail',
      'hero.email.button': 'Me tenir au courant',
      'hero.gdpr': 'J’accepte de recevoir des mises à jour sur le Temple de la Grande Forêt et comprends que je peux me désinscrire à tout moment.',
      
      // About Section
      'about.title': 'Qu’est-ce que le Temple ?',
      'about.subtitle': 'C’est un temple sans séparation.',
      'about.p1': 'Ni un temple bouddhiste, ni un centre séculier. Un temple où le sacré et l’ordinaire respirent comme un.',
      'about.p2': 'Où les coussins de méditation reposent aux côtés des outils de jardinage, où la séance silencieuse se fond dans les repas partagés, où la sagesse ancienne rencontre le travail simple de la vie quotidienne.',
      'about.p3': 'Ici, la pratique n’est pas séparée de la vie — elle est la vie, pleinement et sans prétention.',
      
      // For Whom Section
      'forwhom.title': 'Pour qui ?',
      'forwhom.card1.title': 'Chercheurs',
      'forwhom.card1.subtitle': 'Qui questionnent tout',
      'forwhom.card1.desc': 'Ceux qui ont regardé au-delà des réponses conventionnelles et cherchent un chemin qui honore à la fois la profondeur et la simplicité.',
      'forwhom.card2.title': 'Pratiquants',
      'forwhom.card2.subtitle': 'Prêts pour un vrai engagement',
      'forwhom.card2.desc': 'Méditants expérimentés qui veulent approfondir leur pratique dans un environnement de soutien, sans compromis.',
      'forwhom.card3.title': 'Bâtisseurs de communauté',
      'forwhom.card3.subtitle': 'Qui valorisent la connexion authentique',
      'forwhom.card3.desc': 'Personnes attirées à créer et participer à une communauté intentionnelle enracinée dans la sagesse et le soutien mutuel.',
      'forwhom.card4.title': 'Transitionnaires de vie',
      'forwhom.card4.subtitle': 'Navigant le changement',
      'forwhom.card4.desc': 'Ceux en transitions de vie qui ont besoin d’un espace d’ancrage pour réfléchir, se réinitialiser et découvrir leur prochaine étape authentique.',
      
      // What Will You Find Section
      'whatwillyoufind.title': 'Que trouverez-vous ?',
      'whatwillyoufind.shortterm.title': 'Retraite à court terme',
      'whatwillyoufind.shortterm.duration': 'Week-end ou semaine',
      'whatwillyoufind.shortterm.desc': 'Parfait pour ceux qui cherchent un bref répit et une introduction à la vie du temple.',
      'whatwillyoufind.longterm.title': 'Séjour à long terme',
      'whatwillyoufind.longterm.duration': 'Ermite-volontaire ou ermite-pratiquant',
      'whatwillyoufind.longterm.desc': 'Pour ceux appelés à une immersion plus profonde dans la pratique et la vie communautaire.',
      'whatwillyoufind.offered.title': 'Ce qui est offert',
      'whatwillyoufind.offered.1': 'Méditation matinale et vespérale',
      'whatwillyoufind.offered.2': 'Repas partagés et hébergements simples',
      'whatwillyoufind.offered.3': 'Un cadre humble avec un enseignement de qualité',
      'whatwillyoufind.offered.4': '6 heures de pratique/jour',
      'whatwillyoufind.instructors.title': 'Instructeurs',
      
      // Support Section
      'support.title': 'Comment soutenir le Temple',
      'support.subtitle': 'Votre contribution aide a maintenir ce sanctuaire vivant et la communaute qui l appelle son foyer.',
      'support.donation.title': 'Faire un don',
      'support.donation.desc': 'Soutenez nos operations quotidiennes, nos programmes communautaires et la continuation de la pratique authentique du dharma.',
      'support.donation.button': 'Faire un don',
      'support.wishlist.title': 'Liste de souhaits du Temple',
      'support.wishlist.desc': 'Articles pratiques necessaires pour la vie quotidienne du temple, la pratique de meditation et les activites communautaires.',
      'support.wishlist.button': 'Voir la liste',
      'support.closing': 'Chaque don, quelle que soit sa taille, aide a preserver cet espace pour la pratique spirituelle authentique.',
      
      // Tao Quotes - organized as line pairs for lyric animation
      'tao.intro': 'Ainsi est-il dit :',
      'tao.lines': [
        ['Le chemin vers la lumière semble sombre,', 'le chemin vers l\'avant semble reculer,'],
        ['le chemin direct semble long,', 'le vrai pouvoir semble faible,'],
        ['la vraie pureté semble ternie,', 'la vraie constance semble changeante,'],
        ['la vraie clarté semble obscure,', 'le plus grand art semble simple,'],
        ['le plus grand amour semble indifférent,', 'la plus grande sagesse semble enfantine.'],
        ['Le Tao ne se trouve nulle part.', 'Pourtant il nourrit et complète toutes choses.']
      ],
      // Flat quotes for Apple-Music-style lyrics
      'tao.quotesFlat': [
        'Le chemin vers la lumière semble sombre,',
        'le chemin vers l\'avant semble reculer,',
        'le chemin direct semble long,',
        'le vrai pouvoir semble faible,',
        'la vraie pureté semble ternie,',
        'la vraie constance semble changeante,',
        'la vraie clarté semble obscure,',
        'le plus grand art semble simple,',
        'le plus grand amour semble indifférent,',
        'la plus grande sagesse semble enfantine.',
        'Le Tao ne se trouve nulle part.',
        'Pourtant il nourrit et complète toutes choses.'
      ],
      'tao.attribution': '— Lao Tzu, Tao Te Ching',
      
      // Footer
      'footer.impressum': 'Mentions légales',
      'footer.privacy': 'Politique de confidentialité', 
      'footer.terms': 'Conditions d\'utilisation',
      'footer.contact': 'Contact',
      'footer.rights': 'Tous droits réservés.',
      'footer.followUs': 'Suivez-nous :'
    }
  };

  const t = (key: string): any => {
    const translation = translations[language as keyof typeof translations];
    
    // First try to get the key directly (for flat keys like 'hero.title')
    const directResult = translation?.[key as keyof typeof translation];
    if (directResult !== undefined) {
      return directResult;
    }
    
    // If not found, try nested navigation (for keys like 'tao.lines')
    const keys = key.split('.');
    let result: any = translation;
    
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    
    return result;
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    // Save the user's preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
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
  if (primaryLang === 'cs') return 'cs';

  // Default to English for all other languages
  return 'en';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    // Check if there's a saved language preference in localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['en', 'de', 'fr', 'cs'].includes(savedLang)) {
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
      'nav.animals': 'Our Animals',
      'nav.supporters': 'Supporters',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Offerings',
      'nav.support': 'Help us',
      
      // Hero Section
      'hero.title': 'Let\u2019s find our way together',
      'hero.subtitle': 'A temple of unity cultivating essence in harmony with Nature.',
      'hero.email.placeholder': 'Your email address',
      'hero.email.button': 'Keep me updated',
      'hero.gdpr': 'I agree to receive updates about the Temple of the Great Forest and understand I can unsubscribe at any time.',
      
      // About Section
      'about.title': 'What is Dalin Si?',
      'about.subtitle': 'Born from the wish to preserve the spirit that has guided our lives in many years at Shaolin Temple Europe, the Temple of the Great Forest is a lay temple devoted to keeping traditional spiritual arts alive and applying their wisdom in daily life.',
      'about.p1': 'Rooted in Chan and Taoist traditions, this spirit is still wandering, awaiting a home where it can finally settle, offering space for group retreats and welcoming individuals seeking hermitage.',
      'about.p2': 'While caring for the former animals of Shaolin Temple Europe who have come under our protection, we strive to live as closely as possible to the values of Zen community by respecting Buddhist principles.',
      'about.p3': 'Unconditional benevolence toward all forms of life, discipline through giving, and profound honesty are the core of our spirit.',
      
      // For Whom Section
      'forwhom.title': 'For Whom?',
      'forwhom.card1.title': 'Seekers',
      'forwhom.card1.subtitle': 'Who question everything',
      'forwhom.card1.desc': 'For those who do not accept answers blindly, but question, explore, and seek to know for themselves. A path for those who trust direct experience over dogma.',
      'forwhom.card2.title': 'Practitioners',
      'forwhom.card2.subtitle': 'Ready for real commitment',
      'forwhom.card2.desc': 'For those devoted to qigong, meditation, and martial arts as daily disciplines — not as techniques to master quickly, but as lifelong companions. A place to cultivate depth, stability, and freedom through steady practice.',
      'forwhom.card3.title': 'Community Builders',
      'forwhom.card3.subtitle': 'Who value authentic connection',
      'forwhom.card3.desc': 'For those moved by compassion and respect for all forms of life, who wish to create authentic bonds rooted in benevolence, mutual support, and shared responsibility.',
      'forwhom.card4.title': 'Life Transitioners',
      'forwhom.card4.subtitle': 'Navigating change',
      'forwhom.card4.desc': 'For those facing change who need to stop, drop their illusions, and see things as they are. A place to cut through confusion and meet the next step directly.',
      'forwhom.quote': '"It is said that practice is supported by companionship, guidance, abundance and environment"',
      
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
      
      // Animals
      'animals.title': 'Animal care',
      'animals.care.title': 'Animal Care',
      'animals.care.description1': 'Respectful care for life is an essential part of spiritual practice at DaLin Si.',
      'animals.care.description2': 'Through this daily challenge, we have the opportunity to improve the harmonious weaving that binds compassion, patience, presence and discipline together.',
      'animals.care.description3': 'Each day, we provide animals dependent on our care with nutritious food, clean shelter, medical care, and most importantly, the love and attention they deserve.',
      'animals.care.helpText': 'With the generous support of our visitors and community, we can continue to provide the best care for any living being ending up in our hands.',
      
      // Instructors
      'instructors.1.role': 'Grand Master',
      'instructors.1.bio': 'Cool guy',
      'instructors.2.role': 'Master',
      'instructors.2.bio': 'Has a great French accent.',
      'instructors.3.role': 'Amateur',
      'instructors.3.bio': '21 years of annoying people.',
      
      // Support Section
      'support.title': 'How to Support the Temple',
      'support.subtitle': 'Your contribution helps sustain this wandering sanctuary and the community that calls it home.',
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
      'footer.followUs': 'Follow us:',
      
      // Newsletter Modal
      'newsletter.title': 'Keep me up to date',
      'newsletter.description': 'Stay informed about the Temple progress and upcoming activities.',
      'newsletter.success': 'Thank you for subscribing to our newsletter!',
      
      // Wishlist
      'wishlist.title': 'Help the Temple',
      'wishlist.subtitle': 'Help us build and maintain our temple by supporting the items we need most. Every contribution brings us closer to creating a better space for practice and learning.',
      'wishlist.back': 'Back',
      'wishlist.cart': 'My Contributions',
      'wishlist.empty': 'No contributions selected',
      'wishlist.emptyDesc': 'Choose some items to help the temple',
      'wishlist.continueShopping': 'Keep Helping',
      'wishlist.addToCart': 'Help with This',
      'wishlist.outOfStock': 'Out of Stock',
      'wishlist.funded': 'Funded',
      'wishlist.urgent': 'Urgent',
      'wishlist.featured': 'Featured',
      'wishlist.category': 'Category',
      'wishlist.price': 'Price',
      'wishlist.minPrice': 'Min Price',
      'wishlist.inventory': 'Available',
      'wishlist.subtotal': 'Subtotal',
      'wishlist.total': 'Total',
      'wishlist.items': 'Items',
      'wishlist.remove': 'Remove',
      'wishlist.clearCart': 'Clear Contributions',
      'wishlist.checkout': 'Proceed to Help',
      'wishlist.donationMessage': '💚 Your contribution directly supports our temple community',
      'wishlist.demoMode': '📝 Demo Mode: Showing sample items. Set up Supabase to manage real wishlist data.',
      'wishlist.whyWeNeedIt': 'Why we need it',
      'wishlist.shippingNotes': 'Shipping Notes',
      'wishlist.fundingProgress': 'Funding Progress',
      'wishlist.purchaseLink': 'Purchase Link',
      'wishlist.viewDetails': 'View Details',
      'wishlist.quantity': 'Quantity',
      'wishlist.adding': 'Adding...',
      'wishlist.addMore': 'Add More',
      'wishlist.inCart': 'in cart',
      'wishlist.purchased': 'Already Purchased',
      'wishlist.description': 'Description',
      'wishlist.whyWeNeedThis': 'Why We Need This',
      'wishlist.helpUsGetThis': 'Help Us Get This Item',
      'wishlist.contributionMessage': 'Your contribution will directly support our temple community and enhance our practice space.',
      'wishlist.buyForTemple': 'Buy for the Temple',
      'wishlist.alreadyPurchased': 'Already Purchased',
      'wishlist.thankYouMessage': 'Thank you to everyone who contributed! This item has been acquired for the temple.',
      
      // Categories
      'category.meditation': 'Meditation',
      'category.training': 'Training',
      'category.electronics': 'Electronics',
      'category.garden': 'Garden',
      'category.kitchen': 'Kitchen',
      'category.maintenance': 'Maintenance',
      'category.books': 'Books',
      'category.furniture': 'Furniture',

      // FAQ
      faq: {
        title: 'Frequently Asked Questions',
        introduction: 'Welcome to our FAQ section. Here you will find answers to the most common questions about the Temple of the Great Forest, our practices, and how you can get involved. If you don\'t find what you\'re looking for, please feel free to contact us.',
        general: {
          title: 'General',
          q1: {
            question: 'What is the Temple of the Great Forest?',
            answer: 'The Temple of the Great Forest (Dalin Si 大林寺) is a living project. At present, it exists as a sanctuary for animals and a place for small-scale classes. In the future, with the support of many masters and teachers who have placed their trust in this project, our wish is to establish a dedicated retreat center in France.'
          },
          q2: {
            question: 'Is Dalin Si a religious institution?',
            answer: 'No, Dalin Si is not a religious institution. The Temple is held by lay people, not tied to any dogma or religious obligation. It aims to offer a space for practice, reflection, and community life, inspired by Taoist and Chan wisdoms.'
          },
          q3: {
            question: 'Where is Dalin Si located?',
            answer: 'The administrative headquarters of Dalin Si are in France as a non-profit organisation registered under French legislation (Loi 1901).\nThe temporary activity location is in Czech Republic where the former animals of Shaolin Temple Europe found a time-limited refuge.\nThe final settlement of Dalin Si is likely to be in France.'
          }
        },
        animals: {
          title: 'Questions about Animals',
          q1: {
            question: 'Is Dalin Si accepting new animals?',
            answer: 'For now, we can only care for the animals already present with us, offering them the best care and preparing a sustainable future.'
          },
          q2: {
            question: 'What kind of animals live at the Temple?',
            answer: 'Find more about the Animals on the dedicated page'
          },
          q3: {
            question: 'Can visitors interact with the animals?',
            answer: 'The actual activity location is not open to the public, but during specific classes or events, interaction may happen in a respectful, guided way. For visits, you can always contact us at info@dalinsi.org.'
          }
        },
        practice: {
          title: 'Practice & Retreats',
          q1: {
            question: 'What is QiGong?',
            answer: 'QiGong is an ancient Chinese art of cultivating life energy (Qi) through movement, breathing, and awareness.'
          },
          q2: {
            question: 'Do you organize retreats?',
            answer: 'Due to our long time experience in holding retreats in Shaolin Temple Europe, Dalin Si will offer retreats as soon as the right location is aligned with the unified principles, providing visitors with the opportunity to experience temple life in its essential simplicity.'
          }
        },
        membership: {
          title: 'Membership & Support',
          q1: {
            question: 'How can I support the Temple?',
            answer: 'By helping us find our final settlement, spreading the word, or supporting our care for the animals. Donations of time, skills, or resources are always welcome.'
          },
          q2: {
            question: 'Is there a membership fee?',
            answer: 'No. Membership is free. The Temple\'s economy currently relies on donations and, once the permanent location is established, will be sustained through retreats.'
          },
          q3: {
            question: 'What is the difference between a participant and a member?',
            answer: 'Participants join classes or future retreats. Members are friends of the Temple who wish to stay connected and support its life on a regular basis.'
          },
          q4: {
            question: 'Can I volunteer?',
            answer: 'Yes, occasionally. Volunteer opportunities are announced when help is needed.'
          }
        },
        visiting: {
          title: 'Visiting',
          q1: {
            question: 'Can I just come for a day?',
            answer: 'Our priority is to care for the animals and maintain a simple rhythm of life. For this reason, the farm in Černá Hora is not open as a public temple. Visits are only possible during scheduled classes, activities, or appointments.'
          },
          q2: {
            question: 'Do you offer accommodations?',
            answer: 'Not yet. Lodging will be available once we establish the retreat center.'
          },
          q3: {
            question: 'Are families with children welcome?',
            answer: 'Yes. Families are welcome to join classes and activities.'
          },
          q4: {
            question: 'What languages are spoken?',
            answer: 'We speak English, French, Czech, and German.'
          }
        }
      },

      // FAQ Preview Section
      'faq.preview.title': 'Questions & Answers',
      'faq.preview.description': 'Find answers to common questions about the temple, our practices, and how to get involved.',
      'faq.preview.general.title': 'General',
      'faq.preview.general.desc': 'Learn about our temple and philosophy',
      'faq.preview.practice.title': 'Practice',
      'faq.preview.practice.desc': 'Understanding our daily routines and meditation',
      'faq.preview.visiting.title': 'Visiting',
      'faq.preview.visiting.desc': 'Information about visits and accommodations',
      'faq.preview.button': 'View All Questions'
    },
    de: {
      // Navigation
      'nav.about': 'Über',
      'nav.forwhom': 'Für wen',
      'nav.animals': 'Unsere Tiere',
      'nav.supporters': 'Unterstützer',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Angebote',
      'nav.support': 'Hilf uns',
      
      // Hero Section
      'hero.title': 'Lass uns gemeinsam unseren Weg finden',
      'hero.subtitle': 'Ein Tempel ohne Trennung, wo Meditation und Alltag als eins atmen.',
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
      'whatwillyoufind.instructors.title': 'Unterstützer',
      
      // Animals
      'animals.title': 'Unsere Tiere',
      'animals.care.title': 'Tierpflege',
      'animals.care.description1': 'Im Dalin Si Tempel glauben wir, dass die Pflege von Tieren ein wesentlicher Teil unserer spirituellen Praxis ist. Unsere geliebten Gefährten lehren uns Mitgefühl, Geduld und bedingungslose Liebe.',
      'animals.care.description2': 'Jeden Tag versorgen wir unsere Tiere mit nahrhaftem Futter, sauberem Unterschlupf, medizinischer Versorgung und vor allem der Liebe und Aufmerksamkeit, die sie verdienen.',
      'animals.care.helpText': 'Mit der großzügigen Unterstützung unserer Besucher und Gemeinschaft können wir weiterhin die beste Pflege für unsere Tierfamilie bieten.',
      
      // Instructors
      'instructors.1.role': 'Großmeister',
      'instructors.1.bio': 'Ein cooler Typ',
      'instructors.2.role': 'Meister',
      'instructors.2.bio': 'Hat einen großartigen französischen Akzent.',
      'instructors.3.role': 'Amateur',
      'instructors.3.bio': '21 Jahre lang Menschen auf die Nerven gehen.',
      
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
      'footer.followUs': 'Folge uns:',
      
      // Newsletter Modal
      'newsletter.title': 'Bleib verbunden',
      'newsletter.description': 'Abonniere unseren Newsletter und bleibe über den Tempel auf dem Laufenden.',
      'newsletter.success': 'Vielen Dank für dein Abonnement unseres Newsletters!',
      
      // Wishlist
      'wishlist.title': 'Wunschliste',
      'wishlist.subtitle': 'Hilf uns beim Aufbau und der Pflege unseres Tempels, indem du die Gegenstände unterstützt, die wir am meisten brauchen. Jeder Beitrag bringt uns näher daran, einen besseren Raum für Praxis und Lernen zu schaffen.',
      'wishlist.back': 'Zurück',
      'wishlist.cart': 'Meine Beiträge',
      'wishlist.empty': 'Keine Beiträge ausgewählt',
      'wishlist.emptyDesc': 'Wähle einige Gegenstände aus, um dem Tempel zu helfen',
      'wishlist.continueShopping': 'Weiter helfen',
      'wishlist.addToCart': 'Dabei helfen',
      'wishlist.outOfStock': 'Nicht verfügbar',
      'wishlist.funded': 'Finanziert',
      'wishlist.urgent': 'Dringend',
      'wishlist.featured': 'Empfohlen',
      'wishlist.category': 'Kategorie',
      'wishlist.price': 'Preis',
      'wishlist.minPrice': 'Mindestpreis',
      'wishlist.inventory': 'Verfügbar',
      'wishlist.subtotal': 'Zwischensumme',
      'wishlist.total': 'Gesamt',
      'wishlist.items': 'Artikel',
      'wishlist.remove': 'Entfernen',
      'wishlist.clearCart': 'Beiträge löschen',
      'wishlist.checkout': 'Helfen gehen',
      'wishlist.donationMessage': '💚 Dein Beitrag unterstützt direkt unsere Tempelgemeinschaft',
      'wishlist.demoMode': '📝 Demo-Modus: Zeige Beispielartikel. Richte Supabase ein, um echte Wunschlistendaten zu verwalten.',
      'wishlist.whyWeNeedIt': 'Warum wir es brauchen',
      'wishlist.shippingNotes': 'Versandhinweise',
      'wishlist.fundingProgress': 'Finanzierungsfortschritt',
      'wishlist.purchaseLink': 'Kauflink',
      'wishlist.viewDetails': 'Details ansehen',
      'wishlist.quantity': 'Anzahl',
      'wishlist.adding': 'Hinzufügen...',
      'wishlist.addMore': 'Mehr hinzufügen',
      'wishlist.inCart': 'im Warenkorb',
      'wishlist.purchased': 'Bereits gekauft',
      'wishlist.description': 'Beschreibung',
      'wishlist.whyWeNeedThis': 'Warum wir das brauchen',
      'wishlist.helpUsGetThis': 'Hilf uns, diesen Artikel zu bekommen',
      'wishlist.contributionMessage': 'Dein Beitrag wird direkt unsere Tempelgemeinschaft unterstützen und unseren Übungsraum verbessern.',
      'wishlist.buyForTemple': 'Für den Tempel kaufen',
      'wishlist.alreadyPurchased': 'Bereits gekauft',
      'wishlist.thankYouMessage': 'Vielen Dank an alle, die beigetragen haben! Dieser Artikel wurde für den Tempel erworben.',
      
      // Categories
      'category.meditation': 'Meditation',
      'category.training': 'Training',
      'category.electronics': 'Elektronik',
      'category.garden': 'Garten',
      'category.kitchen': 'Küche',
      'category.maintenance': 'Wartung',
      'category.books': 'Bücher',
      'category.furniture': 'Möbel',

      // FAQ
      faq: {
        title: 'Häufig gestellte Fragen',
        introduction: 'Willkommen in unserem FAQ-Bereich. Hier finden Sie Antworten auf die häufigsten Fragen über den Tempel des Großen Waldes, unsere Praktiken und wie Sie sich beteiligen können. Falls Sie nicht finden, wonach Sie suchen, kontaktieren Sie uns gerne.',
        general: {
          title: 'Allgemein',
          q1: {
            question: 'Was ist der Tempel des Großen Waldes?',
            answer: 'Der Tempel des Großen Waldes (Dalin Si 大林寺) ist ein lebendiges Projekt. Derzeit existiert er als Zuflucht für Tiere und Ort für kleinere Kurse. In Zukunft wünschen wir uns, mit der Unterstützung vieler Meister und Lehrer, die ihr Vertrauen in dieses Projekt gesetzt haben, ein spezielles Retreat-Zentrum in Frankreich zu errichten.'
          },
          q2: {
            question: 'Ist Dalin Si eine religiöse Institution?',
            answer: 'Nein, Dalin Si ist keine religiöse Institution. Der Tempel wird von Laien geführt, nicht an Dogmen oder religiöse Verpflichtungen gebunden. Er zielt darauf ab, einen Raum für Praxis, Reflektion und Gemeinschaftsleben zu bieten, inspiriert von taoistischen und Chan-Weisheiten.'
          },
          q3: {
            question: 'Wo befindet sich Dalin Si?',
            answer: 'Der Verwaltungssitz von Dalin Si ist in Frankreich als gemeinnützige Organisation nach französischem Recht (Loi 1901) registriert.\nDer temporäre Aktivitätsort ist in der Tschechischen Republik, wo die ehemaligen Tiere des Shaolin Temple Europe zeitlich begrenzt Zuflucht gefunden haben.\nDie endgültige Niederlassung von Dalin Si wird wahrscheinlich in Frankreich sein.'
          }
        },
        animals: {
          title: 'Fragen zu den Tieren',
          q1: {
            question: 'Nimmt Dalin Si neue Tiere auf?',
            answer: 'Derzeit können wir nur für die bereits bei uns anwesenden Tiere sorgen und ihnen die beste Pflege bieten sowie eine nachhaltige Zukunft vorbereiten.'
          },
          q2: {
            question: 'Welche Tiere leben im Tempel?',
            answer: 'Erfahren Sie mehr über die Tiere auf der entsprechenden Seite'
          },
          q3: {
            question: 'Können Besucher mit den Tieren interagieren?',
            answer: 'Der aktuelle Aktivitätsort ist nicht öffentlich zugänglich, aber während spezifischer Kurse oder Veranstaltungen kann eine respektvolle, angeleitete Interaktion stattfinden. Für Besuche können Sie uns jederzeit unter info@dalinsi.org kontaktieren.'
          }
        },
        practice: {
          title: 'Praxis & Retreats',
          q1: {
            question: 'Was ist QiGong?',
            answer: 'QiGong ist eine alte chinesische Kunst der Kultivierung von Lebensenergie (Qi) durch Bewegung, Atmung und Achtsamkeit.'
          },
          q2: {
            question: 'Organisieren Sie Retreats?',
            answer: 'Aufgrund unserer langjährigen Erfahrung in der Durchführung von Retreats im Shaolin Temple Europe wird Dalin Si Retreats anbieten, sobald der richtige Ort mit den einheitlichen Prinzipien übereinstimmt und Besuchern die Möglichkeit bietet, das Tempelleben in seiner wesentlichen Einfachheit zu erleben.'
          }
        },
        membership: {
          title: 'Mitgliedschaft & Unterstützung',
          q1: {
            question: 'Wie kann ich den Tempel unterstützen?',
            answer: 'Indem Sie uns helfen, unsere endgültige Niederlassung zu finden, das Wort zu verbreiten oder unsere Tierpflege zu unterstützen. Spenden von Zeit, Fähigkeiten oder Ressourcen sind immer willkommen.'
          },
          q2: {
            question: 'Gibt es eine Mitgliedsgebühr?',
            answer: 'Nein. Die Mitgliedschaft ist kostenlos. Die Tempelwirtschaft basiert derzeit auf Spenden und wird, sobald der dauerhafte Standort etabliert ist, durch Retreats aufrechterhalten.'
          },
          q3: {
            question: 'Was ist der Unterschied zwischen einem Teilnehmer und einem Mitglied?',
            answer: 'Teilnehmer nehmen an Kursen oder zukünftigen Retreats teil. Mitglieder sind Freunde des Tempels, die in Verbindung bleiben und sein Leben regelmäßig unterstützen möchten.'
          },
          q4: {
            question: 'Kann ich freiwillig helfen?',
            answer: 'Ja, gelegentlich. Freiwilligenmöglichkeiten werden angekündigt, wenn Hilfe benötigt wird.'
          }
        },
        visiting: {
          title: 'Besuche',
          q1: {
            question: 'Kann ich einfach für einen Tag kommen?',
            answer: 'Unsere Priorität ist die Pflege der Tiere und die Aufrechterhaltung eines einfachen Lebensrhythmus. Aus diesem Grund ist der Hof in Černá Hora nicht als öffentlicher Tempel geöffnet. Besuche sind nur während geplanter Kurse, Aktivitäten oder Termine möglich.'
          },
          q2: {
            question: 'Bieten Sie Unterkünfte an?',
            answer: 'Noch nicht. Unterkünfte werden verfügbar sein, sobald wir das Retreat-Zentrum errichten.'
          },
          q3: {
            question: 'Sind Familien mit Kindern willkommen?',
            answer: 'Ja. Familien sind willkommen, an Kursen und Aktivitäten teilzunehmen.'
          },
          q4: {
            question: 'Welche Sprachen werden gesprochen?',
            answer: 'Wir sprechen Englisch, Französisch, Tschechisch und Deutsch.'
          }
        }
      }
    },
    fr: {
      // Navigation
      'nav.about': 'À propos',
      'nav.forwhom': 'Pour qui',
      'nav.animals': 'Nos Animaux',
      'nav.supporters': 'Soutiens',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Offres',
      'nav.support': 'Aidez-nous',
      
      // Hero Section
      'hero.title': 'Trouvons notre chemin ensemble',
      'hero.subtitle': 'Un temple sans séparation où méditation et vie quotidienne respirent comme un.',
      'hero.email.placeholder': 'Votre adresse e-mail',
      'hero.email.button': 'Me tenir au courant',
      'hero.gdpr': 'J\'accepte de recevoir des mises à jour sur le Temple de la Grande Forêt et comprends que je peux me désinscrire à tout moment.',
      
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
      
      // Animals
      'animals.title': 'Nos Animaux',
      'animals.care.title': 'Soin des Animaux',
      'animals.care.description1': 'Au Temple Dalin Si, nous croyons que prendre soin des animaux est une partie essentielle de notre pratique spirituelle. Nos compagnons bien-aimés nous enseignent la compassion, la patience et l\'amour inconditionnel.',
      'animals.care.description2': 'Chaque jour, nous fournissons à nos animaux une nourriture nutritive, un abri propre, des soins médicaux et surtout l\'amour et l\'attention qu\'ils méritent.',
      'animals.care.helpText': 'Avec le soutien généreux de nos visiteurs et de notre communauté, nous pouvons continuer à fournir les meilleurs soins à notre famille animale.',
      
      // Instructors
      'instructors.1.role': 'Grand Maître',
      'instructors.1.bio': 'Un type cool',
      'instructors.2.role': 'Maître',
      'instructors.2.bio': 'A un excellent accent français.',
      'instructors.3.role': 'Amateur',
      'instructors.3.bio': '21 ans à agacer les gens.',
      
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
      'footer.followUs': 'Suivez-nous :',
      
      // Newsletter Modal
      'newsletter.title': 'Restez connecté',
      'newsletter.description': 'Abonnez-vous à notre newsletter et restez informé sur le Temple.',
      'newsletter.success': 'Merci de vous être abonné à notre newsletter !',
      
      // Wishlist
      'wishlist.title': 'Liste de souhaits',
      'wishlist.subtitle': 'Aidez-nous à construire et maintenir notre temple en soutenant les articles dont nous avons le plus besoin. Chaque contribution nous rapproche de la création d\'un meilleur espace pour la pratique et l\'apprentissage.',
      'wishlist.back': 'Retour',
      'wishlist.cart': 'Mes Contributions',
      'wishlist.empty': 'Aucune contribution sélectionnée',
      'wishlist.emptyDesc': 'Choisissez des objets pour aider le temple',
      'wishlist.continueShopping': 'Continuer à aider',
      'wishlist.addToCart': 'Aider avec ceci',
      'wishlist.outOfStock': 'Rupture de stock',
      'wishlist.funded': 'Financé',
      'wishlist.urgent': 'Urgent',
      'wishlist.featured': 'En vedette',
      'wishlist.category': 'Catégorie',
      'wishlist.price': 'Prix',
      'wishlist.minPrice': 'Prix minimum',
      'wishlist.inventory': 'Disponible',
      'wishlist.subtotal': 'Sous-total',
      'wishlist.total': 'Total',
      'wishlist.items': 'Articles',
      'wishlist.remove': 'Supprimer',
      'wishlist.clearCart': 'Vider les contributions',
      'wishlist.checkout': 'Procéder à l\'aide',
      'wishlist.donationMessage': '💚 Votre contribution soutient directement notre communauté du temple',
      'wishlist.demoMode': '📝 Mode démo : Affichage d\'exemples d\'articles. Configurez Supabase pour gérer de vraies données de liste de souhaits.',
      'wishlist.whyWeNeedIt': 'Pourquoi nous en avons besoin',
      'wishlist.shippingNotes': 'Notes de livraison',
      'wishlist.fundingProgress': 'Progrès du financement',
      'wishlist.purchaseLink': 'Lien d\'achat',
      'wishlist.viewDetails': 'Voir les détails',
      'wishlist.quantity': 'Quantité',
      'wishlist.adding': 'Ajout...',
      'wishlist.addMore': 'Ajouter plus',
      'wishlist.inCart': 'dans le panier',
      'wishlist.purchased': 'Déjà acheté',
      'wishlist.description': 'Description',
      'wishlist.whyWeNeedThis': 'Pourquoi nous en avons besoin',
      'wishlist.helpUsGetThis': 'Aidez-nous à obtenir cet article',
      'wishlist.contributionMessage': 'Votre contribution soutiendra directement notre communauté du temple et améliorera notre espace de pratique.',
      'wishlist.buyForTemple': 'Acheter pour le temple',
      'wishlist.alreadyPurchased': 'Déjà acheté',
      'wishlist.thankYouMessage': 'Merci à tous ceux qui ont contribué! Cet article a été acquis pour le temple.',
      
      // Categories
      'category.meditation': 'Méditation',
      'category.training': 'Entraînement',
      'category.electronics': 'Électronique',
      'category.garden': 'Jardin',
      'category.kitchen': 'Cuisine',
      'category.maintenance': 'Maintenance',
      'category.books': 'Livres',
      'category.furniture': 'Mobilier',

      // FAQ
      faq: {
        title: 'Questions Fréquemment Posées',
        introduction: 'Bienvenue dans notre section FAQ. Vous trouverez ici des réponses aux questions les plus courantes sur le Temple de la Grande Forêt, nos pratiques et comment vous pouvez vous impliquer. Si vous ne trouvez pas ce que vous cherchez, n\'hésitez pas à nous contacter.',
        general: {
          title: 'Général',
          q1: {
            question: 'Qu\'est-ce que le Temple de la Grande Forêt ?',
            answer: 'Le Temple de la Grande Forêt (Dalin Si 大林寺) est un projet vivant. Actuellement, il existe comme sanctuaire pour les animaux et lieu de petites classes. À l\'avenir, avec le soutien de nombreux maîtres et enseignants qui ont placé leur confiance dans ce projet, notre souhait est d\'établir un centre de retraite dédié en France.'
          },
          q2: {
            question: 'Dalin Si est-il une institution religieuse ?',
            answer: 'Non, Dalin Si n\'est pas une institution religieuse. Le Temple est tenu par des laïcs, non lié à un dogme ou à une obligation religieuse. Il vise à offrir un espace pour la pratique, la réflexion et la vie communautaire, inspiré par les sagesses taoïste et Chan.'
          },
          q3: {
            question: 'Où se trouve Dalin Si ?',
            answer: 'Le siège administratif de Dalin Si est en France en tant qu\'organisation à but non lucratif enregistrée sous la législation française (Loi 1901).\nLe lieu d\'activité temporaire est en République tchèque où les anciens animaux du Temple Shaolin Europe ont trouvé refuge de manière limitée dans le temps.\nL\'établissement final de Dalin Si sera probablement en France.'
          }
        },
        animals: {
          title: 'Questions sur les Animaux',
          q1: {
            question: 'Dalin Si accepte-t-il de nouveaux animaux ?',
            answer: 'Pour l\'instant, nous ne pouvons nous occuper que des animaux déjà présents avec nous, en leur offrant les meilleurs soins et en préparant un avenir durable.'
          },
          q2: {
            question: 'Quels types d\'animaux vivent au Temple ?',
            answer: 'Découvrez plus sur les Animaux sur la page dédiée'
          },
          q3: {
            question: 'Les visiteurs peuvent-ils interagir avec les animaux ?',
            answer: 'Le lieu d\'activité actuel n\'est pas ouvert au public, mais lors de classes ou d\'événements spécifiques, une interaction peut avoir lieu de manière respectueuse et guidée. Pour les visites, vous pouvez toujours nous contacter à info@dalinsi.org.'
          }
        },
        practice: {
          title: 'Pratique & Retraites',
          q1: {
            question: 'Qu\'est-ce que le QiGong ?',
            answer: 'Le QiGong est un art chinois ancien de cultiver l\'énergie vitale (Qi) par le mouvement, la respiration et la conscience.'
          },
          q2: {
            question: 'Organisez-vous des retraites ?',
            answer: 'En raison de notre longue expérience dans l\'organisation de retraites au Temple Shaolin Europe, Dalin Si offrira des retraites dès que le bon lieu sera aligné avec les principes unifiés, offrant aux visiteurs l\'opportunité de vivre la vie du temple dans sa simplicité essentielle.'
          }
        },
        membership: {
          title: 'Adhésion & Soutien',
          q1: {
            question: 'Comment puis-je soutenir le Temple ?',
            answer: 'En nous aidant à trouver notre établissement final, en diffusant le message, ou en soutenant nos soins aux animaux. Les dons de temps, de compétences ou de ressources sont toujours les bienvenus.'
          },
          q2: {
            question: 'Y a-t-il des frais d\'adhésion ?',
            answer: 'Non. L\'adhésion est gratuite. L\'économie du Temple repose actuellement sur les dons et, une fois l\'emplacement permanent établi, sera soutenue par les retraites.'
          },
          q3: {
            question: 'Quelle est la différence entre un participant et un membre ?',
            answer: 'Les participants rejoignent les classes ou les futures retraites. Les membres sont des amis du Temple qui souhaitent rester connectés et soutenir sa vie de manière régulière.'
          },
          q4: {
            question: 'Puis-je faire du bénévolat ?',
            answer: 'Oui, occasionnellement. Les opportunités de bénévolat sont annoncées quand de l\'aide est nécessaire.'
          }
        },
        visiting: {
          title: 'Visites',
          q1: {
            question: 'Puis-je simplement venir pour une journée ?',
            answer: 'Notre priorité est de prendre soin des animaux et de maintenir un rythme de vie simple. Pour cette raison, la ferme à Černá Hora n\'est pas ouverte comme temple public. Les visites ne sont possibles que lors de classes, d\'activités ou de rendez-vous programmés.'
          },
          q2: {
            question: 'Offrez-vous des hébergements ?',
            answer: 'Pas encore. L\'hébergement sera disponible une fois que nous établirons le centre de retraite.'
          },
          q3: {
            question: 'Les familles avec enfants sont-elles les bienvenues ?',
            answer: 'Oui. Les familles sont les bienvenues pour rejoindre les classes et activités.'
          },
          q4: {
            question: 'Quelles langues sont parlées ?',
            answer: 'Nous parlons anglais, français, tchèque et allemand.'
          }
        }
      }
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
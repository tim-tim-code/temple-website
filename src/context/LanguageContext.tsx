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
      'nav.animals': 'Our Animals',
      'nav.supporters': 'Supporters',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Offerings',
      'nav.support': 'Support us',
      
      // Hero Section
      'hero.title': 'Let\u2019s find our way together',
      'hero.subtitle': 'A temple of unity cultivating essence in harmony with Nature.',
      'hero.email.placeholder': 'Your email address',
      'hero.email.button': 'Keep me updated',
      'hero.gdpr': 'I agree to receive updates about Dalin Si and understand I can unsubscribe at any time.',
      
      // About Section
      'about.title': 'What is Dalin Si?',
      'about.subtitle': 'The Temple of the Great Forest is an association devoted to keeping traditional spiritual arts alive and applying their wisdom in daily life.',
      'about.p1': 'As a lay temple rooted in Chan and Taoist traditions, its spirit is still wandering, awaiting a location where it can finally settle, offering space for group retreats and welcoming individuals seeking hermitage.',
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

      // FAQ Preview
      'faq.preview.title': 'Questions & Answers',
      'faq.preview.description': 'Find answers to common questions about Dalin Si, our practices, and how to get involved.',
      'faq.preview.general.title': 'General',
      'faq.preview.general.desc': 'Learn about Dalin Si and our philosophy',
      'faq.preview.practice.title': 'Practice & Visits',
      'faq.preview.practice.desc': 'Information about practices and visiting',
      'faq.preview.visiting.title': 'Animals',
      'faq.preview.visiting.desc': 'Questions about our animal companions',
      'faq.preview.button': 'View All Questions',

      // Other
      'hero.learnMore': 'Learn more',

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
      'footer.website': 'Website created by',

      // Legal Pages
      legal: {
        back: 'Back',
        impressum: {
          title: 'Impressum',
          subtitle: 'Legal information about our association according to EU regulations',
          association: {
            title: 'Association Information',
            name: 'Association Name',
            fullName: 'Dalin Si',
            legalForm: 'Legal Form',
            legalStatus: 'Association (Loi 1901)',
            registration: 'Registration',
            registrationDetails: 'Registered as non-profit association under French law'
          },
          address: {
            title: 'Administrative Headquarters',
            line1: 'Dalin Si',
            line2: '[Address to be provided]',
            country: 'France'
          },
          contact: {
            title: 'Contact Information',
            email: 'Email',
            phone: 'Phone',
            phoneNumber: '[Phone number to be provided]'
          },
          responsible: {
            title: 'Responsible Person',
            role: 'Director of Publication',
            name: '[Association President name]',
            description: 'As required by Article 6 of the Law for Confidence in the Digital Economy'
          },
          hosting: {
            title: 'Hosting Provider',
            provider: 'Provider',
            address: 'Address'
          },
          disclaimer: {
            title: 'Disclaimer',
            content: 'The information on this website is provided in good faith and for general information purposes only. We make no representations or warranties about the completeness, reliability, or accuracy of this information.',
            liability: 'This association shall not be liable for any loss or damage arising from the use of this website or reliance on the information contained herein.'
          }
        },
        privacy: {
          title: 'Privacy Policy',
          subtitle: 'How we collect, use, and protect your personal data in compliance with GDPR',
          controller: {
            title: 'Data Controller',
            description: 'The data controller responsible for your personal data is:',
            name: 'Organization',
            orgName: 'Dalin Si',
            contact: 'Contact'
          },
          collection: {
            title: 'Data We Collect',
            intro: 'We collect and process the following types of personal data:',
            newsletter: {
              title: 'Newsletter Subscription',
              description: 'When you subscribe to our newsletter, we collect your email address and consent information.'
            },
            website: {
              title: 'Website Usage',
              description: 'We may collect technical information such as IP address, browser type, and pages visited for security and analytics purposes.'
            },
            contact: {
              title: 'Contact Forms',
              description: 'When you contact us, we collect the information you provide including name, email, and message content.'
            }
          },
          basis: {
            title: 'Legal Basis for Processing',
            description: 'We process your personal data based on the following legal grounds:',
            consent: 'Your explicit consent (e.g., newsletter subscription)',
            legitimate: 'Our legitimate interests (e.g., website security and improvement)',
            legal: 'Legal obligations (e.g., record keeping requirements)'
          },
          retention: {
            title: 'Data Retention',
            description: 'We retain your personal data only as long as necessary for the purposes for which it was collected.',
            period: 'Newsletter subscriptions are retained until you unsubscribe. Contact form data is retained for up to 3 years for correspondence purposes.'
          },
          rights: {
            title: 'Your Rights',
            intro: 'Under GDPR, you have the following rights regarding your personal data:',
            access: {
              title: 'Right of Access',
              description: 'You can request information about what personal data we hold about you'
            },
            rectification: {
              title: 'Right to Rectification',
              description: 'You can request correction of inaccurate personal data'
            },
            erasure: {
              title: 'Right to Erasure',
              description: 'You can request deletion of your personal data in certain circumstances'
            },
            portability: {
              title: 'Right to Data Portability',
              description: 'You can request to receive your data in a structured, machine-readable format'
            },
            objection: {
              title: 'Right to Object',
              description: 'You can object to processing of your personal data in certain circumstances'
            },
            withdraw: {
              title: 'Right to Withdraw Consent',
              description: 'You can withdraw your consent at any time where processing is based on consent'
            },
            contact: 'To exercise any of these rights, please contact us at info@dalinsi.org'
          },
          cookies: {
            title: 'Cookies and Tracking',
            description: 'Our website uses essential cookies necessary for basic functionality. We do not use tracking cookies or analytics that would compromise your privacy.',
            essential: 'Essential cookies include those for language preferences and basic site functionality.',
            control: 'You can control cookie settings in your browser preferences.'
          },
          thirdParties: {
            title: 'Third-Party Services',
            description: 'We use the following trusted third-party services:',
            vercel: 'Web hosting and content delivery (Privacy Policy: https://vercel.com/legal/privacy-policy)',
            supabase: 'Database and authentication services (Privacy Policy: https://supabase.com/privacy)'
          },
          updates: {
            title: 'Policy Updates',
            description: 'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.',
            lastUpdated: 'Last Updated'
          }
        },
        terms: {
          title: 'Terms of Service',
          subtitle: 'Terms and conditions for using our website and services',
          scope: {
            title: 'Scope of Application',
            description: 'These terms of service govern your use of the Dalin Si website and any services we provide.',
            agreement: 'By using our website, you agree to be bound by these terms.'
          },
          services: {
            title: 'Our Services',
            description: 'We provide the following services through our website:',
            information: 'Information about our temple, practices, and activities',
            newsletter: 'Newsletter subscription for updates and announcements',
            contact: 'Contact forms for inquiries and communication',
            events: 'Information about classes, workshops, and events'
          },
          responsibilities: {
            title: 'User Responsibilities',
            intro: 'When using our website, you agree to:',
            accurate: 'Provide accurate and truthful information',
            respectful: 'Use the website in a respectful and appropriate manner',
            lawful: 'Comply with all applicable laws and regulations',
            noHarm: 'Not engage in any activities that could harm the website or other users'
          },
          intellectual: {
            title: 'Intellectual Property',
            description: 'All content on this website, including text, images, logos, and design elements, is the property of Dalin Si or its licensors.',
            rights: 'All rights are reserved and protected by copyright and intellectual property laws.',
            restrictions: 'You may not reproduce, distribute, or create derivative works without written permission.'
          },
          liability: {
            title: 'Limitation of Liability',
            description: 'Our association provides this website and information on an "as is" basis.',
            noWarranty: 'We make no warranties about the accuracy, completeness, or reliability of the information provided.',
            limitation: 'Our liability is limited to the maximum extent permitted by applicable law.'
          },
          externalLinks: {
            title: 'External Links',
            description: 'Our website may contain links to external websites for your convenience.',
            disclaimer: 'We are not responsible for the content, privacy practices, or terms of service of external websites.'
          },
          termination: {
            title: 'Termination',
            description: 'We reserve the right to terminate or restrict access to our website at any time without notice.',
            effect: 'Upon termination, your right to use the website ceases immediately.'
          },
          governingLaw: {
            title: 'Governing Law',
            description: 'These terms are governed by French law, as our association is registered in France.',
            jurisdiction: 'Any disputes will be subject to the jurisdiction of French courts.'
          },
          changes: {
            title: 'Changes to Terms',
            description: 'We may modify these terms of service at any time.',
            notification: 'Changes will be posted on this page with an updated date.',
            lastUpdated: 'Last Updated'
          },
          contact: {
            title: 'Contact Information',
            description: 'If you have questions about these terms of service, please contact us:',
            email: 'Email'
          }
        }
      },

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
            question: 'What is Dalin Si?',
            answer: 'Dalin Si (大林寺) is a living project. At present, it exists as a sanctuary for animals and a place for small-scale classes. In the future, with the support of many masters and teachers who have placed their trust in this project, our wish is to establish a dedicated retreat center in France.'
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
      }
    },
    de: {
      // Navigation
      'nav.about': 'Über',
      'nav.forwhom': 'Für wen',
      'nav.animals': 'Unsere Tiere',
      'nav.supporters': 'Unterstützer',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Angebote',
      'nav.support': 'Unterstütze uns',
      
      // Hero Section
      'hero.title': 'Lass uns gemeinsam unseren Weg finden',
      'hero.subtitle': 'Ein Tempel ohne Trennung, wo Meditation und Alltag als eins atmen.',
      'hero.email.placeholder': 'Ihre E-Mail-Adresse',
      'hero.email.button': 'Halte mich auf dem Laufenden',
      'hero.gdpr': 'Ich bin damit einverstanden, Updates über den Tempel des Großen Waldes zu erhalten und verstehe, dass ich mich jederzeit abmelden kann.',
      
      // About Section
      'about.title': 'Was ist der Tempel?',
      'about.subtitle': 'Der Tempel des Großen Waldes ist ein Verein, der sich der Erhaltung traditioneller spiritueller Künste und der Anwendung ihrer Weisheit im täglichen Leben widmet.',
      'about.p1': 'Als Laientempel, verwurzelt in Chan- und taoistischen Traditionen, wandert sein Geist noch immer und wartet auf einen Ort, an dem er sich endlich niederlassen kann, um Raum für Gruppenretreats zu bieten und Einzelpersonen auf der Suche nach Eremitage willkommen zu heißen.',
      'about.p2': 'Während wir uns um die ehemaligen Tiere des Shaolin Temple Europe kümmern, die unter unseren Schutz gekommen sind, streben wir danach, so nah wie möglich an den Werten einer Zen-Gemeinschaft zu leben, indem wir buddhistische Prinzipien respektieren.',
      'about.p3': 'Bedingungsloses Wohlwollen gegenüber allen Lebensformen, Disziplin durch Geben und tiefe Ehrlichkeit sind der Kern unseres Geistes.',
      
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

      // FAQ Preview
      'faq.preview.title': 'Fragen & Antworten',
      'faq.preview.description': 'Finden Sie Antworten auf häufige Fragen über Dalin Si, unsere Praktiken und wie Sie sich beteiligen können.',
      'faq.preview.general.title': 'Allgemein',
      'faq.preview.general.desc': 'Erfahren Sie mehr über Dalin Si und unsere Philosophie',
      'faq.preview.practice.title': 'Praxis & Besuche',
      'faq.preview.practice.desc': 'Informationen über Praktiken und Besuche',
      'faq.preview.visiting.title': 'Tiere',
      'faq.preview.visiting.desc': 'Fragen über unsere Tiergefährten',
      'faq.preview.button': 'Alle Fragen ansehen',

      // Other
      'hero.learnMore': 'Erfahre mehr',

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
      'footer.website': 'Website erstellt von',

      // Legal Pages
      legal: {
        back: 'Zurück',
        impressum: {
          title: 'Impressum',
          subtitle: 'Rechtliche Informationen über unseren Verein gemäß EU-Verordnungen',
          association: {
            title: 'Vereinsinformationen',
            name: 'Vereinsname',
            fullName: 'Dalin Si - Tempel des Großen Waldes',
            legalForm: 'Rechtsform',
            legalStatus: 'Verein (Loi 1901)',
            registration: 'Registrierung',
            registrationDetails: 'Registriert als gemeinnütziger Verein nach französischem Recht'
          },
          address: {
            title: 'Verwaltungssitz',
            line1: 'Dalin Si',
            line2: '[Adresse wird bereitgestellt]',
            country: 'Frankreich'
          },
          contact: {
            title: 'Kontaktinformationen',
            email: 'E-Mail',
            phone: 'Telefon',
            phoneNumber: '[Telefonnummer wird bereitgestellt]'
          },
          responsible: {
            title: 'Verantwortliche Person',
            role: 'Publikationsleiter',
            name: '[Name des Vereinspräsidenten]',
            description: 'Wie nach Artikel 6 des Gesetzes für Vertrauen in die digitale Wirtschaft erforderlich'
          },
          hosting: {
            title: 'Hosting-Anbieter',
            provider: 'Anbieter',
            address: 'Adresse'
          },
          disclaimer: {
            title: 'Haftungsausschluss',
            content: 'Die Informationen auf dieser Website werden in gutem Glauben und nur zu allgemeinen Informationszwecken bereitgestellt. Wir geben keine Zusicherungen oder Gewährleistungen bezüglich der Vollständigkeit, Zuverlässigkeit oder Genauigkeit dieser Informationen.',
            liability: 'Dieser Verein haftet nicht für Verluste oder Schäden, die durch die Nutzung dieser Website oder das Vertrauen auf die hierin enthaltenen Informationen entstehen.'
          }
        },
        privacy: {
          title: 'Datenschutzerklärung',
          subtitle: 'Wie wir Ihre personenbezogenen Daten sammeln, verwenden und schützen in Übereinstimmung mit der DSGVO',
          controller: {
            title: 'Datenverantwortlicher',
            description: 'Der für Ihre personenbezogenen Daten verantwortliche Datenverantwortliche ist:',
            name: 'Organisation',
            orgName: 'Dalin Si - Tempel des Großen Waldes',
            contact: 'Kontakt'
          },
          collection: {
            title: 'Daten, die wir sammeln',
            intro: 'Wir sammeln und verarbeiten die folgenden Arten von personenbezogenen Daten:',
            newsletter: {
              title: 'Newsletter-Abonnement',
              description: 'Wenn Sie unseren Newsletter abonnieren, sammeln wir Ihre E-Mail-Adresse und Einverständnisinformationen.'
            },
            website: {
              title: 'Website-Nutzung',
              description: 'Wir können technische Informationen wie IP-Adresse, Browsertyp und besuchte Seiten für Sicherheits- und Analysezwecke sammeln.'
            },
            contact: {
              title: 'Kontaktformulare',
              description: 'Wenn Sie uns kontaktieren, sammeln wir die von Ihnen bereitgestellten Informationen einschließlich Name, E-Mail und Nachrichteninhalt.'
            }
          },
          basis: {
            title: 'Rechtsgrundlage für die Verarbeitung',
            description: 'Wir verarbeiten Ihre personenbezogenen Daten auf Grundlage folgender Rechtsgrundlagen:',
            consent: 'Ihre ausdrückliche Einwilligung (z.B. Newsletter-Abonnement)',
            legitimate: 'Unsere berechtigten Interessen (z.B. Website-Sicherheit und -Verbesserung)',
            legal: 'Rechtliche Verpflichtungen (z.B. Aufbewahrungspflichten)'
          },
          retention: {
            title: 'Datenspeicherung',
            description: 'Wir bewahren Ihre personenbezogenen Daten nur so lange auf, wie es für die Zwecke, für die sie erhoben wurden, erforderlich ist.',
            period: 'Newsletter-Abonnements werden bis zur Abmeldung gespeichert. Kontaktformulardaten werden bis zu 3 Jahre für Korrespondenzzwecke aufbewahrt.'
          },
          rights: {
            title: 'Ihre Rechte',
            intro: 'Unter der DSGVO haben Sie folgende Rechte bezüglich Ihrer personenbezogenen Daten:',
            access: {
              title: 'Recht auf Auskunft',
              description: 'Sie können Informationen darüber anfordern, welche personenbezogenen Daten wir über Sie speichern'
            },
            rectification: {
              title: 'Recht auf Berichtigung',
              description: 'Sie können die Korrektur unrichtiger personenbezogener Daten verlangen'
            },
            erasure: {
              title: 'Recht auf Löschung',
              description: 'Sie können unter bestimmten Umständen die Löschung Ihrer personenbezogenen Daten verlangen'
            },
            portability: {
              title: 'Recht auf Datenübertragbarkeit',
              description: 'Sie können verlangen, Ihre Daten in einem strukturierten, maschinenlesbaren Format zu erhalten'
            },
            objection: {
              title: 'Recht auf Widerspruch',
              description: 'Sie können unter bestimmten Umständen der Verarbeitung Ihrer personenbezogenen Daten widersprechen'
            },
            withdraw: {
              title: 'Recht auf Widerruf der Einwilligung',
              description: 'Sie können Ihre Einwilligung jederzeit widerrufen, wenn die Verarbeitung auf Einwilligung basiert'
            },
            contact: 'Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter info@dalinsi.org'
          },
          cookies: {
            title: 'Cookies und Tracking',
            description: 'Unsere Website verwendet wesentliche Cookies, die für die Grundfunktionalität erforderlich sind. Wir verwenden keine Tracking-Cookies oder Analysen, die Ihre Privatsphäre beeinträchtigen würden.',
            essential: 'Wesentliche Cookies umfassen solche für Spracheinstellungen und grundlegende Website-Funktionalität.',
            control: 'Sie können Cookie-Einstellungen in Ihren Browser-Einstellungen kontrollieren.'
          },
          thirdParties: {
            title: 'Drittanbieter-Dienste',
            description: 'Wir verwenden folgende vertrauenswürdige Drittanbieter-Dienste:',
            vercel: 'Web-Hosting und Content-Delivery (Datenschutzerklärung: https://vercel.com/legal/privacy-policy)',
            supabase: 'Datenbank- und Authentifizierungsdienste (Datenschutzerklärung: https://supabase.com/privacy)'
          },
          updates: {
            title: 'Richtlinien-Updates',
            description: 'Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Datum veröffentlicht.',
            lastUpdated: 'Zuletzt aktualisiert'
          }
        },
        terms: {
          title: 'Nutzungsbedingungen',
          subtitle: 'Geschäftsbedingungen für die Nutzung unserer Website und Dienste',
          scope: {
            title: 'Anwendungsbereich',
            description: 'Diese Nutzungsbedingungen regeln Ihre Nutzung der Dalin Si Website und aller von uns bereitgestellten Dienste.',
            agreement: 'Durch die Nutzung unserer Website stimmen Sie diesen Bedingungen zu.'
          },
          services: {
            title: 'Unsere Dienste',
            description: 'Wir bieten folgende Dienste über unsere Website an:',
            information: 'Informationen über unseren Tempel, Praktiken und Aktivitäten',
            newsletter: 'Newsletter-Abonnement für Updates und Ankündigungen',
            contact: 'Kontaktformulare für Anfragen und Kommunikation',
            events: 'Informationen über Kurse, Workshops und Veranstaltungen'
          },
          responsibilities: {
            title: 'Nutzerverantwortlichkeiten',
            intro: 'Bei der Nutzung unserer Website verpflichten Sie sich:',
            accurate: 'Genaue und wahrheitsgemäße Informationen bereitzustellen',
            respectful: 'Die Website respektvoll und angemessen zu nutzen',
            lawful: 'Alle geltenden Gesetze und Vorschriften einzuhalten',
            noHarm: 'Keine Aktivitäten durchzuführen, die der Website oder anderen Nutzern schaden könnten'
          },
          intellectual: {
            title: 'Geistiges Eigentum',
            description: 'Alle Inhalte dieser Website, einschließlich Text, Bilder, Logos und Designelemente, sind Eigentum von Dalin Si oder seinen Lizenzgebern.',
            rights: 'Alle Rechte sind vorbehalten und durch Urheberrechts- und Eigentumsgesetze geschützt.',
            restrictions: 'Sie dürfen ohne schriftliche Genehmigung keine Kopien erstellen, verteilen oder abgeleitete Werke schaffen.'
          },
          liability: {
            title: 'Haftungsbeschränkung',
            description: 'Unser Verein stellt diese Website und Informationen "wie besehen" zur Verfügung.',
            noWarranty: 'Wir geben keine Gewährleistungen bezüglich der Genauigkeit, Vollständigkeit oder Zuverlässigkeit der bereitgestellten Informationen.',
            limitation: 'Unsere Haftung ist im nach geltendem Recht maximal zulässigen Umfang beschränkt.'
          },
          externalLinks: {
            title: 'Externe Links',
            description: 'Unsere Website kann zur Ihrer Bequemlichkeit Links zu externen Websites enthalten.',
            disclaimer: 'Wir sind nicht verantwortlich für den Inhalt, die Datenschutzpraktiken oder die Nutzungsbedingungen externer Websites.'
          },
          termination: {
            title: 'Kündigung',
            description: 'Wir behalten uns das Recht vor, den Zugang zu unserer Website jederzeit ohne Vorankündigung zu beenden oder einzuschränken.',
            effect: 'Bei Kündigung erlischt Ihr Recht zur Nutzung der Website sofort.'
          },
          governingLaw: {
            title: 'Geltendes Recht',
            description: 'Diese Bedingungen unterliegen französischem Recht, da unser Verein in Frankreich registriert ist.',
            jurisdiction: 'Alle Streitigkeiten unterliegen der Gerichtsbarkeit französischer Gerichte.'
          },
          changes: {
            title: 'Änderungen der Bedingungen',
            description: 'Wir können diese Nutzungsbedingungen jederzeit ändern.',
            notification: 'Änderungen werden auf dieser Seite mit einem aktualisierten Datum veröffentlicht.',
            lastUpdated: 'Zuletzt aktualisiert'
          },
          contact: {
            title: 'Kontaktinformationen',
            description: 'Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte:',
            email: 'E-Mail'
          }
        }
      },

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
      'nav.support': 'Soutenez-nous',
      
      // Hero Section
      'hero.title': 'Trouvons notre chemin ensemble',
      'hero.subtitle': 'Un temple sans séparation où méditation et vie quotidienne respirent comme un.',
      'hero.email.placeholder': 'Votre adresse e-mail',
      'hero.email.button': 'Me tenir au courant',
      'hero.gdpr': 'J\'accepte de recevoir des mises à jour sur Dalin Si et comprends que je peux me désinscrire à tout moment.',
      
      // About Section
      'about.title': 'Qu’est-ce que le Temple ?',
      'about.subtitle': 'Le Temple de la Grande Forêt est une association consacrée à maintenir vivants les arts spirituels traditionnels et à appliquer leur sagesse dans la vie quotidienne.',
      'about.p1': 'En tant que temple laïc enraciné dans les traditions Chan et taoïstes, son esprit erre encore, attendant un lieu où il pourra enfin s\'établir, offrant un espace pour des retraites de groupe et accueillant les personnes en quête d\'ermitage.',
      'about.p2': 'Tout en prenant soin des anciens animaux du Shaolin Temple Europe qui sont venus sous notre protection, nous nous efforçons de vivre aussi près que possible des valeurs d\'une communauté Zen en respectant les principes bouddhistes.',
      'about.p3': 'La bienveillance inconditionnelle envers toutes les formes de vie, la discipline par le don et l\'honnêteté profonde sont au cœur de notre esprit.',
      
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
      'forwhom.card4.desc': 'Ceux en transitions de vie qui ont besoin d\'un espace d\'ancrage pour réfléchir, se réinitialiser et découvrir leur prochaine étape authentique.',

      // FAQ Preview
      'faq.preview.title': 'Questions & Réponses',
      'faq.preview.description': 'Trouvez des réponses aux questions courantes sur Dalin Si, nos pratiques et comment vous impliquer.',
      'faq.preview.general.title': 'Général',
      'faq.preview.general.desc': 'Apprenez à connaître Dalin Si et notre philosophie',
      'faq.preview.practice.title': 'Pratique & Visites',
      'faq.preview.practice.desc': 'Informations sur les pratiques et les visites',
      'faq.preview.visiting.title': 'Animaux',
      'faq.preview.visiting.desc': 'Questions sur nos compagnons animaux',
      'faq.preview.button': 'Voir toutes les questions',

      // Other
      'hero.learnMore': 'En savoir plus',

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
      'footer.website': 'Site web créé par',

      // Legal Pages
      legal: {
        back: 'Retour',
        impressum: {
          title: 'Mentions légales',
          subtitle: 'Informations légales sur notre association selon les réglementations européennes',
          association: {
            title: 'Informations sur l\'association',
            name: 'Nom de l\'association',
            fullName: 'Dalin Si',
            legalForm: 'Forme juridique',
            legalStatus: 'Association (Loi 1901)',
            registration: 'Enregistrement',
            registrationDetails: 'Enregistrée comme association à but non lucratif sous la loi française'
          },
          address: {
            title: 'Siège social administratif',
            line1: 'Dalin Si',
            line2: '[Adresse à fournir]',
            country: 'France'
          },
          contact: {
            title: 'Informations de contact',
            email: 'Email',
            phone: 'Téléphone',
            phoneNumber: '[Numéro de téléphone à fournir]'
          },
          responsible: {
            title: 'Personne responsable',
            role: 'Directeur de la publication',
            name: '[Nom du président de l\'association]',
            description: 'Comme exigé par l\'article 6 de la Loi pour la confiance dans l\'économie numérique'
          },
          hosting: {
            title: 'Fournisseur d\'hébergement',
            provider: 'Fournisseur',
            address: 'Adresse'
          },
          disclaimer: {
            title: 'Avertissement',
            content: 'Les informations sur ce site web sont fournies de bonne foi et à des fins d\'information générale uniquement. Nous ne donnons aucune représentation ou garantie concernant l\'exhaustivité, la fiabilité ou l\'exactitude de ces informations.',
            liability: 'Cette association ne peut être tenue responsable de toute perte ou dommage résultant de l\'utilisation de ce site web ou de la confiance accordée aux informations qui y sont contenues.'
          }
        },
        privacy: {
          title: 'Politique de confidentialité',
          subtitle: 'Comment nous collectons, utilisons et protégeons vos données personnelles en conformité avec le RGPD',
          controller: {
            title: 'Responsable du traitement',
            description: 'Le responsable du traitement de vos données personnelles est :',
            name: 'Organisation',
            orgName: 'Dalin Si',
            contact: 'Contact'
          },
          collection: {
            title: 'Données que nous collectons',
            intro: 'Nous collectons et traitons les types suivants de données personnelles :',
            newsletter: {
              title: 'Abonnement à la newsletter',
              description: 'Lorsque vous vous abonnez à notre newsletter, nous collectons votre adresse email et les informations de consentement.'
            },
            website: {
              title: 'Utilisation du site web',
              description: 'Nous pouvons collecter des informations techniques telles que l\'adresse IP, le type de navigateur et les pages visitées à des fins de sécurité et d\'analyse.'
            },
            contact: {
              title: 'Formulaires de contact',
              description: 'Lorsque vous nous contactez, nous collectons les informations que vous fournissez incluant le nom, l\'email et le contenu du message.'
            }
          },
          basis: {
            title: 'Base légale pour le traitement',
            description: 'Nous traitons vos données personnelles sur la base des fondements juridiques suivants :',
            consent: 'Votre consentement explicite (ex: abonnement newsletter)',
            legitimate: 'Nos intérêts légitimes (ex: sécurité et amélioration du site web)',
            legal: 'Obligations légales (ex: exigences de conservation des données)'
          },
          retention: {
            title: 'Conservation des données',
            description: 'Nous conservons vos données personnelles seulement aussi longtemps que nécessaire pour les fins pour lesquelles elles ont été collectées.',
            period: 'Les abonnements newsletter sont conservés jusqu\'à désinscription. Les données de formulaire de contact sont conservées jusqu\'à 3 ans à des fins de correspondance.'
          },
          rights: {
            title: 'Vos droits',
            intro: 'Sous le RGPD, vous avez les droits suivants concernant vos données personnelles :',
            access: {
              title: 'Droit d\'accès',
              description: 'Vous pouvez demander des informations sur les données personnelles que nous détenons sur vous'
            },
            rectification: {
              title: 'Droit de rectification',
              description: 'Vous pouvez demander la correction de données personnelles inexactes'
            },
            erasure: {
              title: 'Droit à l\'effacement',
              description: 'Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances'
            },
            portability: {
              title: 'Droit à la portabilité des données',
              description: 'Vous pouvez demander à recevoir vos données dans un format structuré et lisible par machine'
            },
            objection: {
              title: 'Droit d\'opposition',
              description: 'Vous pouvez vous opposer au traitement de vos données personnelles dans certaines circonstances'
            },
            withdraw: {
              title: 'Droit de retrait du consentement',
              description: 'Vous pouvez retirer votre consentement à tout moment lorsque le traitement est basé sur le consentement'
            },
            contact: 'Pour exercer ces droits, veuillez nous contacter à info@dalinsi.org'
          },
          cookies: {
            title: 'Cookies et suivi',
            description: 'Notre site web utilise des cookies essentiels nécessaires au fonctionnement de base. Nous n\'utilisons pas de cookies de suivi ou d\'analyse qui compromettraient votre vie privée.',
            essential: 'Les cookies essentiels incluent ceux pour les préférences linguistiques et la fonctionnalité de base du site.',
            control: 'Vous pouvez contrôler les paramètres des cookies dans les préférences de votre navigateur.'
          },
          thirdParties: {
            title: 'Services tiers',
            description: 'Nous utilisons les services tiers de confiance suivants :',
            vercel: 'Hébergement web et livraison de contenu (Politique de confidentialité : https://vercel.com/legal/privacy-policy)',
            supabase: 'Services de base de données et d\'authentification (Politique de confidentialité : https://supabase.com/privacy)'
          },
          updates: {
            title: 'Mises à jour de la politique',
            description: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Tout changement sera publié sur cette page avec une date mise à jour.',
            lastUpdated: 'Dernière mise à jour'
          }
        },
        terms: {
          title: 'Conditions d\'utilisation',
          subtitle: 'Termes et conditions pour l\'utilisation de notre site web et services',
          scope: {
            title: 'Champ d\'application',
            description: 'Ces conditions d\'utilisation régissent votre utilisation du site web Dalin Si et de tous les services que nous fournissons.',
            agreement: 'En utilisant notre site web, vous acceptez d\'être lié par ces conditions.'
          },
          services: {
            title: 'Nos services',
            description: 'Nous fournissons les services suivants via notre site web :',
            information: 'Informations sur notre temple, pratiques et activités',
            newsletter: 'Abonnement newsletter pour les mises à jour et annonces',
            contact: 'Formulaires de contact pour les demandes et la communication',
            events: 'Informations sur les cours, ateliers et événements'
          },
          responsibilities: {
            title: 'Responsabilités de l\'utilisateur',
            intro: 'En utilisant notre site web, vous acceptez de :',
            accurate: 'Fournir des informations exactes et véridiques',
            respectful: 'Utiliser le site web de manière respectueuse et appropriée',
            lawful: 'Respecter toutes les lois et réglementations applicables',
            noHarm: 'Ne pas s\'engager dans des activités qui pourraient nuire au site web ou à d\'autres utilisateurs'
          },
          intellectual: {
            title: 'Propriété intellectuelle',
            description: 'Tout le contenu de ce site web, incluant le texte, les images, logos et éléments de design, est la propriété de Dalin Si ou de ses concédants de licence.',
            rights: 'Tous les droits sont réservés et protégés par les lois sur le droit d\'auteur et la propriété intellectuelle.',
            restrictions: 'Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées sans autorisation écrite.'
          },
          liability: {
            title: 'Limitation de responsabilité',
            description: 'Notre association fournit ce site web et ces informations "en l\'état".',
            noWarranty: 'Nous ne donnons aucune garantie concernant l\'exactitude, l\'exhaustivité ou la fiabilité des informations fournies.',
            limitation: 'Notre responsabilité est limitée dans la mesure maximale autorisée par la loi applicable.'
          },
          externalLinks: {
            title: 'Liens externes',
            description: 'Notre site web peut contenir des liens vers des sites web externes pour votre commodité.',
            disclaimer: 'Nous ne sommes pas responsables du contenu, des pratiques de confidentialité ou des conditions d\'utilisation des sites web externes.'
          },
          termination: {
            title: 'Résiliation',
            description: 'Nous nous réservons le droit de résilier ou de restreindre l\'accès à notre site web à tout moment sans préavis.',
            effect: 'Lors de la résiliation, votre droit d\'utiliser le site web cesse immédiatement.'
          },
          governingLaw: {
            title: 'Droit applicable',
            description: 'Ces conditions sont régies par le droit français, car notre association est enregistrée en France.',
            jurisdiction: 'Tout litige sera soumis à la juridiction des tribunaux français.'
          },
          changes: {
            title: 'Modifications des conditions',
            description: 'Nous pouvons modifier ces conditions d\'utilisation à tout moment.',
            notification: 'Les changements seront publiés sur cette page avec une date mise à jour.',
            lastUpdated: 'Dernière mise à jour'
          },
          contact: {
            title: 'Informations de contact',
            description: 'Si vous avez des questions sur ces conditions d\'utilisation, veuillez nous contacter :',
            email: 'Email'
          }
        }
      },

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
            question: 'Qu\'est-ce que Dalin Si ?',
            answer: 'Dalin Si (大林寺) est un projet vivant. Actuellement, il existe comme sanctuaire pour les animaux et lieu de petites classes. À l\'avenir, avec le soutien de nombreux maîtres et enseignants qui ont placé leur confiance dans ce projet, notre souhait est d\'établir un centre de retraite dédié en France.'
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
    },
    cs: {
      // Navigation
      'nav.about': 'O nás',
      'nav.forwhom': 'Pro koho',
      'nav.animals': 'Naše Zvířata',
      'nav.supporters': 'Podporovatelé',
      'nav.faq': 'FAQ',
      'nav.offerings': 'Nabídky',
      'nav.support': 'Podpořte nás',

      // Hero Section
      'hero.title': 'Najděme společně svou cestu',
      'hero.subtitle': 'Chrám jednoty kultivující podstatu v harmonii s přírodou.',
      'hero.email.placeholder': 'Vaše e-mailová adresa',
      'hero.email.button': 'Držte mě v obraze',
      'hero.gdpr': 'Souhlasím s příjímáním aktualizací o Chrámu Velkého Lesa a rozumím, že se mohu kdykoli odhlásit.',

      // FAQ
      faq: {
        title: 'Často kladené otázky',
        introduction: 'Vítejte v naší FAQ sekci. Zde najdete odpovědi na nejčastější otázky o Chrámu Velkého Lesa, našich praktikách a jak se můžete zapojit. Pokud nenajdete to, co hledáte, neváhejte nás kontaktovat.',
        general: {
          title: 'Obecné',
          q1: {
            question: 'Co je Chrám Velkého Lesa?',
            answer: 'Chrám Velkého Lesa (Dalin Si 大林寺) je živý projekt. V současnosti existuje jako útočiště pro zvířata a místo pro menší kurzy. V budoucnu si přejeme, s podporou mnoha mistrů a učitelů, kteří do tohoto projektu vložili svou důvěru, založit specializované retreatové centrum ve Francii.'
          },
          q2: {
            question: 'Je Dalin Si náboženská instituce?',
            answer: 'Ne, Dalin Si není náboženská instituce. Chrám je veden laiky, není vázán na žádné dogma nebo náboženské závazky. Jeho cílem je nabídnout prostor pro praxi, reflexi a komunitní život, inspirovaný taoistickou a Chan moudrostí.'
          },
          q3: {
            question: 'Kde se Dalin Si nachází?',
            answer: 'Administrativní sídlo Dalin Si je ve Francii jako nezisková organizace registrovaná podle francouzského práva (Loi 1901).\nDočasné místo činnosti je v České republice, kde bývalá zvířata z Shaolin Temple Europe našla časově omezenou útočiště.\nKonečné usídlení Dalin Si bude pravděpodobně ve Francii.'
          }
        },
        animals: {
          title: 'Otázky o zvířatech',
          q1: {
            question: 'Přijímá Dalin Si nová zvířata?',
            answer: 'Prozatím se můžeme starat pouze o zvířata, která už u nás jsou, poskytovat jim nejlepší péči a připravovat udržitelnou budoucnost.'
          },
          q2: {
            question: 'Jaká zvířata žijí v chrámu?',
            answer: 'Zjistěte více o zvířatech na specializované stránce'
          },
          q3: {
            question: 'Mohou návštěvníci interagovat se zvířaty?',
            answer: 'Současné místo činnosti není veřejně přístupné, ale během specifických kurzů nebo akcí může docházet k interakci respektujícím, vedeným způsobem. Pro návštěvy nás můžete kdykoli kontaktovat na info@dalinsi.org.'
          }
        },
        practice: {
          title: 'Praxe & Retreaty',
          q1: {
            question: 'Co je QiGong?',
            answer: 'QiGong je starověké čínské umění kultivace životní energie (Qi) prostřednictvím pohybu, dýchání a vědomí.'
          },
          q2: {
            question: 'Organizujete retreaty?',
            answer: 'Díky našim dlouholetým zkušenostem s pořádáním retreatů v Shaolin Temple Europe bude Dalin Si nabízet retreaty, jakmile bude správné místo v souladu s jednotnými principy a poskytne návštěvníkům možnost zažít chrámový život v jeho základní jednoduchosti.'
          }
        },
        membership: {
          title: 'Členství & Podpora',
          q1: {
            question: 'Jak mohu podpořit chrám?',
            answer: 'Tím, že nám pomůžete najít naše konečné sídlo, šířit zprávu nebo podporovat naši péči o zvířata. Dary času, dovedností nebo zdrojů jsou vždy vítány.'
          },
          q2: {
            question: 'Existuje členský poplatek?',
            answer: 'Ne. Členství je zdarma. Ekonomika chrámu v současnosti závisí na darech a po ustanovení trvalého místa bude udržována prostřednictvím retreatů.'
          },
          q3: {
            question: 'Jaký je rozdíl mezi účastníkem a členem?',
            answer: 'Účastníci se účastní kurzů nebo budoucích retreatů. Členové jsou přátelé chrámu, kteří si přejí zůstat v kontaktu a pravidelně podporovat jeho život.'
          },
          q4: {
            question: 'Mohu se stát dobrovolníkem?',
            answer: 'Ano, občas. Příležitosti dobrovolnictví jsou oznámeny, když je potřeba pomoc.'
          }
        },
        visiting: {
          title: 'Návštěvy',
          q1: {
            question: 'Mohu přijít jen na den?',
            answer: 'Naší prioritou je péče o zvířata a udržování jednoduchého rytmu života. Z tohoto důvodu farma v Černé Hoře není otevřena jako veřejný chrám. Návštěvy jsou možné pouze během plánovaných kurzů, aktivit nebo schůzek.'
          },
          q2: {
            question: 'Nabízíte ubytování?',
            answer: 'Zatím ne. Ubytování bude k dispozici, jakmile založíme retreatové centrum.'
          },
          q3: {
            question: 'Jsou vítány rodiny s dětmi?',
            answer: 'Ano. Rodiny jsou vítány k účasti na kurzech a aktivitách.'
          },
          q4: {
            question: 'Jakými jazyky mluvíte?',
            answer: 'Mluvíme anglicky, francouzsky, česky a německy.'
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
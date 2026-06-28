import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    appName: "GramSathi AI",
    tagline: "Empowering Every Village, One Click at a Time",
    heroTitle: "Empowering Rural Minds with Advanced AI",
    heroSubtitle: "Welcome to your Digital Village Operating System. Seamlessly access government schemes, medical guidance, local business directories, education platforms, and real-time support in your local language.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    login: "Log In",
    signup: "Sign Up",
    logout: "Log Out",
    language: "Language",
    english: "English",
    hindi: "हिन्दी",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    
    // Sidebar
    dashboard: "Dashboard",
    schemes: "Govt Schemes",
    healthcare: "Healthcare",
    education: "Education",
    businesses: "Local Shops",
    villageMap: "Village Map",
    announcements: "Notice Board",
    aiChat: "AI Assistant",
    profile: "My Profile",
    settings: "Settings",
    emergency: "Emergency Contacts",
    
    // Dashboard / Main text
    greetingMorning: "Good Morning",
    greetingAfternoon: "Good Afternoon",
    greetingEvening: "Good Evening",
    welcomeBack: "Welcome back, Sathi!",
    weatherCard: "Weather Forecast",
    weatherTemp: "31°C - Clear Sky",
    weatherHumid: "Humidity: 45%",
    weatherWind: "Wind: 12 km/h",
    emergencyAlert: "Emergency Alert",
    emergencyAction: "Immediate Help",
    quickAccess: "Quick Access Modules",
    recentAnnouncements: "Recent Notices",
    
    // Search / Common
    searchPlaceholder: "Search for services, shops, or schemes...",
    searchButton: "Search",
    noResults: "No results found.",
    loading: "Loading data...",
    
    // Schemes
    schemesHeader: "Government Schemes Portal",
    schemesSubtitle: "Find and verify your eligibility for state and central schemes.",
    categoryAll: "All Categories",
    categoryAgriculture: "Agriculture",
    categoryPension: "Pension & Social Security",
    categoryEducation: "Student Scholarships",
    categoryHousing: "Rural Housing",
    eligibleCheck: "Check Eligibility",
    requiredDocs: "Required Documents",
    applyProcess: "Application Process",
    aiRecommend: "AI Recommendation Engine",
    aiRecommendBtn: "Get AI Recommendations",
    
    // Healthcare
    healthcareHeader: "Village Health Center",
    healthcareSubtitle: "Access nearby doctors, vaccines, medicine reminders, and daily health tips.",
    vaccineTracker: "Vaccination Schedule",
    medicineReminder: "Medicine Reminder",
    healthTips: "Daily Wellness Tip",
    nearbyHospitals: "Nearby Clinics & Hospitals",
    
    // Education
    educationHeader: "Digital Shala",
    educationSubtitle: "E-learning platforms, school locators, and career guidance files.",
    scholarships: "Available Scholarships",
    eLearning: "Digital E-Learning Lessons",
    villageSchools: "Village Schools Listing",
    careerGuide: "Career Path Advisor",
    
    // Businesses
    businessHeader: "Village Haat & Shop Directory",
    businessSubtitle: "Support local commerce. Find verified services and village entrepreneurs.",
    catFarmers: "Farmers & Agri",
    catElectricians: "Electricians",
    catMechanics: "Mechanics",
    catTailors: "Tailors",
    catWomenEntrepreneurs: "Women Entrepreneurs",
    
    // Village Map
    mapHeader: "Interactive Village Layout",
    mapSubtitle: "Visual map detailing vital locations in the community.",
    pinPanchayat: "Gram Panchayat",
    pinSchool: "Primary School",
    pinClinic: "Healthcare Center",
    pinWater: "Community Water Pump",
    pinShop: "Village Co-operative Shop",
    
    // Announcements
    announcementHeader: "Gram Sabha Notice Board",
    announcementSubtitle: "Official updates, agricultural advisories, and public announcements.",
    annTypeGov: "Govt Update",
    annTypeWater: "Water Supply",
    annTypePower: "Power Outage",
    annTypeCamp: "Health Camp",
    annTypeEvent: "Village Event",
    
    // AI Chat / Voice
    aiChatHeader: "AI Chatbot & Speech Assistant",
    aiChatSubtitle: "Ask anything in your language. Tap microphone to speak.",
    voiceBtnPrompt: "Tap to Speak",
    listening: "Listening carefully...",
    processing: "Thinking...",
    suggestedQ1: "What agriculture schemes can I apply for?",
    suggestedQ2: "Where is the nearest vaccine camp?",
    suggestedQ3: "How to register a local village business?",
    chatHistory: "Conversation History",
    
    // Profile
    profileHeader: "Profile Information",
    saveProfile: "Save Profile Details",
    fullName: "Full Name",
    villageName: "Village Name",
    stateName: "State Name",
    phone: "Phone Number",
    aadhaar: "Aadhaar Card Number",
    occupation: "Occupation",
    
    // Settings & Accessibility
    settingsHeader: "Accessibility Settings",
    largeFont: "Enable Large Readable Fonts",
    voiceNav: "Enable Voice Navigation Prompts",
    highContrast: "High Contrast Theme"
  },
  hi: {
    appName: "ग्रामसाथी AI",
    tagline: "हर गाँव को सशक्त बनाना, बस एक क्लिक में",
    heroTitle: "उन्नत एआई के साथ ग्रामीण भारत का सशक्तिकरण",
    heroSubtitle: "आपके डिजिटल ग्राम ऑपरेटिंग सिस्टम में आपका स्वागत है। अपनी स्थानीय भाषा में सरकारी योजनाओं, चिकित्सा मार्गदर्शन, स्थानीय व्यापार निर्देशिकाओं, शिक्षा मंचों और वास्तविक समय की सहायता का लाभ उठाएं।",
    getStarted: "शुरू करें",
    learnMore: "अधिक जानें",
    login: "लॉग इन करें",
    signup: "साइन अप करें",
    logout: "लॉग आउट",
    language: "भाषा",
    english: "English",
    hindi: "हिन्दी",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    
    // Sidebar
    dashboard: "डैशबोर्ड",
    schemes: "सरकारी योजनाएं",
    healthcare: "स्वास्थ्य सेवा",
    education: "डिजिटल शिक्षा",
    businesses: "स्थानीय दुकानें",
    villageMap: "ग्राम मानचित्र",
    announcements: "सूचना बोर्ड",
    aiChat: "एआई सहायक",
    profile: "मेरी प्रोफ़ाइल",
    settings: "सेटिंग्स",
    emergency: "आपातकालीन नंबर",
    
    // Dashboard / Main text
    greetingMorning: "शुभ प्रभात",
    greetingAfternoon: "नमस्कार",
    greetingEvening: "शुभ संध्या",
    welcomeBack: "आपका स्वागत है, साथी!",
    weatherCard: "मौसम का पूर्वानुमान",
    weatherTemp: "31°C - साफ़ आसमान",
    weatherHumid: "आर्द्रता: 45%",
    weatherWind: "हवा: 12 किमी/घंटा",
    emergencyAlert: "आपातकालीन चेतावनी",
    emergencyAction: "तुरंत सहायता लें",
    quickAccess: "त्वरित पहुँच मॉड्यूल",
    recentAnnouncements: "हालिया सूचनाएं",
    
    // Search / Common
    searchPlaceholder: "सेवाओं, दुकानों या योजनाओं के लिए खोजें...",
    searchButton: "खोजें",
    noResults: "कोई परिणाम नहीं मिला।",
    loading: "लोड हो रहा है...",
    
    // Schemes
    schemesHeader: "सरकारी योजना पोर्टल",
    schemesSubtitle: "राज्य और केंद्र की योजनाओं के लिए अपनी पात्रता खोजें और सत्यापित करें।",
    categoryAll: "सभी श्रेणियां",
    categoryAgriculture: "कृषि योजनाएं",
    categoryPension: "पेंशन और सामाजिक सुरक्षा",
    categoryEducation: "छात्र छात्रवृत्ति",
    categoryHousing: "ग्रामीण आवास योजना",
    eligibleCheck: "पात्रता जाँचें",
    requiredDocs: "आवश्यक दस्तावेज़",
    applyProcess: "आवेदन प्रक्रिया",
    aiRecommend: "एआई सिफारिश इंजन",
    aiRecommendBtn: "एआई सुझाव प्राप्त करें",
    
    // Healthcare
    healthcareHeader: "ग्राम स्वास्थ्य केंद्र",
    healthcareSubtitle: "आस-पास के डॉक्टरों, टीकों, दवा अनुस्मारक और दैनिक स्वास्थ्य युक्तियों तक पहुँचें।",
    vaccineTracker: "टीकाकरण अनुसूची",
    medicineReminder: "दवा अनुस्मारक",
    healthTips: "दैनिक स्वास्थ्य सुझाव",
    nearbyHospitals: "आस-पास के क्लीनिक और अस्पताल",
    
    // Education
    educationHeader: "डिजिटल शाला",
    educationSubtitle: "ई-लर्निंग प्लेटफॉर्म, स्कूल खोजक और करियर मार्गदर्शन फ़ाइलें।",
    scholarships: "उपलब्ध छात्रवृत्तियां",
    eLearning: "डिजिटल ई-लर्निंग पाठ",
    villageSchools: "ग्राम विद्यालयों की सूची",
    careerGuide: "करियर मार्गदर्शन सलाहकार",
    
    // Businesses
    businessHeader: "ग्राम हाट और दुकान निर्देशिका",
    businessSubtitle: "स्थानीय व्यापार का समर्थन करें। सत्यापित सेवाएं और ग्राम उद्यमी खोजें।",
    catFarmers: "किसान और कृषि",
    catElectricians: "इलेक्ट्रिशियन",
    catMechanics: "मैकेनिक",
    catTailors: "दर्जी",
    catWomenEntrepreneurs: "महिला उद्यमी",
    
    // Village Map
    mapHeader: "इंटरएक्टिव ग्राम नक्शा",
    mapSubtitle: "समुदाय में महत्वपूर्ण स्थानों का विवरण देने वाला विज़ुअल मानचित्र।",
    pinPanchayat: "ग्राम पंचायत भवन",
    pinSchool: "प्राथमिक विद्यालय",
    pinClinic: "स्वास्थ्य सेवा केंद्र",
    pinWater: "सामुदायिक पानी का पंप",
    pinShop: "ग्राम सहकारी दुकान",
    
    // Announcements
    announcementHeader: "ग्राम सभा सूचना पट्ट",
    announcementSubtitle: "आधिकारिक अपडेट, कृषि सलाह और सार्वजनिक घोषणाएं।",
    annTypeGov: "सरकारी अपडेट",
    annTypeWater: "जलापूर्ति सूचना",
    annTypePower: "बिजली कटौती",
    annTypeCamp: "स्वास्थ्य शिविर",
    annTypeEvent: "ग्राम कार्यक्रम",
    
    // AI Chat / Voice
    aiChatHeader: "एआई चैटबॉट और स्पीच असिस्टेंट",
    aiChatSubtitle: "अपनी भाषा में कुछ भी पूछें। बोलने के लिए माइक्रोफ़ोन टैप करें।",
    voiceBtnPrompt: "बोलने के लिए दबाएं",
    listening: "ध्यान से सुन रहा हूँ...",
    processing: "सोच रहा हूँ...",
    suggestedQ1: "मैं किन कृषि योजनाओं के लिए आवेदन कर सकता हूँ?",
    suggestedQ2: "निकटतम टीकाकरण शिविर कहाँ है?",
    suggestedQ3: "स्थानीय ग्राम व्यवसाय कैसे पंजीकृत करें?",
    chatHistory: "वार्तालाप इतिहास",
    
    // Profile
    profileHeader: "प्रोफ़ाइल जानकारी",
    saveProfile: "प्रोफ़ाइल विवरण सहेजें",
    fullName: "पूरा नाम",
    villageName: "गाँव का नाम",
    stateName: "राज्य का नाम",
    phone: "फ़ोन नंबर",
    aadhaar: "आधार कार्ड संख्या",
    occupation: "व्यवसाय",
    
    // Settings & Accessibility
    settingsHeader: "पहुंच क्षमता सेटिंग्स",
    largeFont: "बड़े पठनीय फ़ॉन्ट सक्षम करें",
    voiceNav: "ध्वनि नेविगेशन संकेत सक्षम करें",
    highContrast: "उच्च कंट्रास्ट थीम"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gramsathi_lang') || 'en';
  });

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    localStorage.setItem('gramsathi_lang', nextLang);
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

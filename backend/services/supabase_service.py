from supabase import create_client, Client
import backend.config as config

# Initialize Supabase client if configured
db: Client = None
if not config.MOCK_DB:
    try:
        db = create_client(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)
    except Exception as e:
        print(f"Error initializing Supabase: {e}")
        config.MOCK_DB = True

# Realistic Fallback Mock Databases
MOCK_SCHEMES = [
    {
        "id": 1,
        "category": "Agriculture",
        "title": "PM Kisan Samman Nidhi",
        "title_hi": "पीएम किसान सम्मान निधि योजना",
        "description": "Income support scheme providing Rs. 6000 per year in three equal installments to all landholding farmer families.",
        "description_hi": "सभी भूमिधारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष 6000 रुपये प्रदान करने वाली आय सहायता योजना।",
        "eligibility": "Small and marginal farmers owning cultivable land up to 2 hectares.",
        "eligibility_hi": "छोटे और सीमांत किसान जिनके पास 2 हेक्टेयर तक कृषि योग्य भूमि है।",
        "documents": ["Aadhaar Card", "Land Ownership Documents", "Bank Account Details"],
        "documents_hi": ["आधार कार्ड", "भूमि स्वामित्व दस्तावेज (खतौनी)", "बैंक खाता विवरण"],
        "process": "Apply online at pmkisan.gov.in portal or visit the nearest Common Service Centre (CSC) in the village.",
        "process_hi": "pmkisan.gov.in पोर्टल पर ऑनलाइन आवेदन करें या गाँव के नजदीकी कॉमन सर्विस सेंटर (CSC) पर जाएं।"
    },
    {
        "id": 2,
        "category": "Housing",
        "title": "Pradhan Mantri Awas Yojana (Gramin)",
        "title_hi": "प्रधानमंत्री आवास योजना (ग्रामीण)",
        "description": "Social welfare program assisting rural citizens to construct durable housing with clean cooking and toilet facilities.",
        "description_hi": "ग्रामीण नागरिकों को स्वच्छ रसोईघर और शौचालय सुविधाओं के साथ टिकाऊ आवास बनाने में सहायता करने वाला सामाजिक कल्याण कार्यक्रम।",
        "eligibility": "Families living in zero, one or two-room houses with kutcha walls and kutcha roofs as per SECC 2011.",
        "eligibility_hi": "SECC 2011 के अनुसार कच्चे घरों और कमरों में रहने वाले बेघर परिवार।",
        "documents": ["Aadhaar Card", "Swachh Bharat Mission registration number", "Job Card details", "Bank Account"],
        "documents_hi": ["आधार कार्ड", "स्वच्छ भारत मिशन पंजीकरण संख्या", "मनरेगा जॉब कार्ड विवरण", "बैंक खाता"],
        "process": "Registration is compiled by the Gram Panchayat. Local verification is managed by the Gram Sabha board.",
        "process_hi": "पंजीकरण ग्राम पंचायत द्वारा संकलित किया जाता है। स्थानीय सत्यापन का प्रबंधन ग्राम सभा बोर्ड द्वारा किया जाता है।"
    },
    {
        "id": 3,
        "category": "Pension",
        "title": "Indira Gandhi National Old Age Pension Scheme",
        "title_hi": "इन्दिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
        "description": "Pension program providing monthly financial support to senior citizens below the poverty line.",
        "description_hi": "गरीबी रेखा से नीचे के वरिष्ठ नागरिकों को मासिक वित्तीय सहायता प्रदान करने वाला पेंशन कार्यक्रम।",
        "eligibility": "Citizens aged 60 years or above belonging to a household below the poverty line (BPL).",
        "eligibility_hi": "गरीबी रेखा से नीचे (बीपीएल) परिवार से संबंधित 60 वर्ष या उससे अधिक आयु के नागरिक।",
        "documents": ["Age Proof Certificate", "BPL Certificate", "Aadhaar Card", "Bank Account"],
        "documents_hi": ["आयु प्रमाण पत्र", "बीपीएल प्रमाण पत्र", "आधार कार्ड", "बैंक खाता विवरण"],
        "process": "Submit application form to the Block Development Officer (BDO) or the Gram Panchayat Secretary.",
        "process_hi": "ब्लॉक विकास अधिकारी (BDO) या ग्राम पंचायत सचिव के पास आवेदन पत्र जमा करें।"
    },
    {
        "id": 4,
        "category": "Education",
        "title": "Pre-Matric Scholarship for SC/ST Students",
        "title_hi": "अनुसूचित जाति/जनजाति के छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति",
        "description": "Scholarship program to support SC/ST parents in sending their kids to school and reducing dropouts.",
        "description_hi": "एससी/एसटी अभिभावकों को अपने बच्चों को स्कूल भेजने और ड्रॉपआउट कम करने में सहायता करने वाला छात्रवृत्ति कार्यक्रम।",
        "eligibility": "SC/ST students studying in classes 9 and 10 with annual family income under Rs. 2.5 Lakhs.",
        "eligibility_hi": "कक्षा 9 और 10 में पढ़ने वाले एससी/एसटी छात्र जिनकी वार्षिक पारिवारिक आय 2.5 लाख रुपये से कम है।",
        "documents": ["Caste Certificate", "Income Certificate", "Aadhaar Card", "Previous Class Marksheet"],
        "documents_hi": ["जाति प्रमाण पत्र", "आय प्रमाण पत्र", "आधार कार्ड", "पिछली कक्षा की मार्कशीट"],
        "process": "Apply via the National Scholarship Portal (NSP) online or fill forms directly at the school office.",
        "process_hi": "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) के माध्यम से ऑनलाइन आवेदन करें या सीधे स्कूल कार्यालय में फॉर्म भरें।"
    }
]

MOCK_HOSPITALS = [
    {
        "name": "Rampur Community Health Centre",
        "name_hi": "रामपुर सामुदायिक स्वास्थ्य केंद्र",
        "type": "Government Clinic",
        "address": "Main Road, Ward 2, Rampur",
        "timings": "24 Hours / 24 घंटे",
        "doctor": "Dr. Sunil Sharma (MBBS)",
        "phone": "9415012345"
    },
    {
        "name": "Sanjeevani Rural Hospital",
        "name_hi": "संजीवनी ग्रामीण अस्पताल",
        "type": "Private Clinic",
        "address": "Bazaar Chauraha, Rampur",
        "timings": "09:00 AM - 08:00 PM",
        "doctor": "Dr. Priya Patel (MD)",
        "phone": "9876098760"
    }
]

MOCK_BUSINESSES = [
    {
        "shop_name": "Rao Agri Seeds & Fertilizers",
        "shop_name_hi": "राव कृषि बीज एवं उर्वरक केंद्र",
        "category": "Farmers",
        "owner": "Rao Baldev Singh",
        "location": "Mandi Crossing, Rampur",
        "rating": 4.8,
        "services": "High yield crop seeds, organic fertilizers, pesticides, and modern tractor rental tools.",
        "services_hi": "उच्च गुणवत्ता वाले फसल बीज, जैविक खाद, कीटनाशक और आधुनिक ट्रैक्टर उपकरण किराये पर उपलब्ध हैं।",
        "phone": "9935100200"
    },
    {
        "shop_name": "Verma Electric Works",
        "shop_name_hi": "वर्मा इलेक्ट्रिक वर्क्स",
        "category": "Electricians",
        "owner": "Kamlesh Verma",
        "location": "Near Water Tank, Rampur",
        "rating": 4.6,
        "services": "Winding of motor pumps, house wiring, repair of fans, coolers, and village solar panels.",
        "services_hi": "मोटर पंपों की वाइंडिंग, घरेलू वायरिंग, पंखे, कूलर और सौर ऊर्जा पैनलों की मरम्मत का काम किया जाता है।",
        "phone": "9554011220"
    },
    {
        "shop_name": "Yadav Tractor & Bike Garage",
        "shop_name_hi": "यादव ट्रैक्टर एवं बाइक गैराज",
        "category": "Mechanics",
        "owner": "Dinesh Yadav",
        "location": "National Highway Toll, Rampur",
        "rating": 4.9,
        "services": "Tractor maintenance, motorcycle repair, flat tire fixing, and engine overhaul services.",
        "services_hi": "ट्रैक्टर और मोटरसाइकिल की मरम्मत, पंचर जोड़ना और इंजन की ओवरहॉलिंग का काम किया जाता है।",
        "phone": "8115022330"
    },
    {
        "shop_name": "Shringar Ladies Tailors",
        "shop_name_hi": "श्रृंगार लेडीज टेलर्स",
        "category": "Women Entrepreneurs",
        "owner": "Sarita Devi",
        "location": "Gram Sabha Gali, Rampur",
        "rating": 4.7,
        "services": "Custom stitching of suits, blouses, school uniforms, and local embroidery lessons for girls.",
        "services_hi": "सूट, ब्लाउज, स्कूल ड्रेस की सिलाई और गाँव की लड़कियों के लिए कढ़ाई प्रशिक्षण केंद्र।",
        "phone": "9125033440"
    }
]

MOCK_EMERGENCY = [
    {
        "name": "Rampur Police Outpost",
        "name_hi": "रामपुर पुलिस चौकी",
        "designation": "Local Police Station",
        "operator": "Sub-Inspector V.K. Singh",
        "phone": "112",
        "icon": "ShieldAlert"
      },
      {
        "name": "Ambulance Support Service",
        "name_hi": "सरकारी एम्बुलेंस सेवा",
        "designation": "24x7 Medical Response",
        "operator": "National Health Helpline",
        "phone": "108",
        "icon": "HeartPulse"
      },
      {
        "name": "Fire Outbreak Dispatch",
        "name_hi": "फायर ब्रिगेड हेल्पलाइन",
        "designation": "District Fire Station",
        "operator": "Emergency Call Desk",
        "phone": "101",
        "icon": "Flame"
      },
      {
        "name": "Gram Panchayat Headoffice",
        "name_hi": "ग्राम प्रधान (मुखिया)",
        "designation": "Village Head",
        "operator": "Smt. Shanti Devi (Pradhan)",
        "phone": "9415509988",
        "icon": "Landmark"
      },
      {
        "name": "Panchayat Veterinary Hospital",
        "name_hi": "पशु अस्पताल (पशु चिकित्सक)",
        "designation": "Livestock Healthcare",
        "operator": "Dr. Anand Sen (Vet Doctor)",
        "phone": "9838045612",
        "icon": "PlusSquare"
      }
]

MOCK_ANNOUNCEMENTS = [
    {
        "title": "Pradhan Mantri Ayushman Card Registration Camp",
        "title_hi": "प्रधानमंत्री आयुष्मान कार्ड पंजीकरण शिविर",
        "type": "Health Camp",
        "date": "29 June 2026",
        "description": "A special camp is scheduled in the Panchayat Hall from 10 AM for Ayushman health insurance card registration. Please carry Aadhaar.",
        "description_hi": "आयुष्मान स्वास्थ्य बीमा कार्ड पंजीकरण के लिए पंचायत भवन में सुबह 10 बजे से शिविर का आयोजन किया गया है। कृपया आधार लेकर आएं।"
    },
    {
        "title": "Scheduled Power Outage in Ward 1 & 2",
        "title_hi": "वार्ड १ और २ में बिजली कटौती की सूचना",
        "type": "Power Outage",
        "date": "30 June 2026",
        "description": "Electricity supply will remain cut off from 9 AM to 3 PM due to major transformer repair and line maintenance near the water tank.",
        "description_hi": "पानी की टंकी के पास ट्रांसफार्मर की मरम्मत और लाइन रखरखाव के कारण सुबह 9 बजे से दोपहर 3 बजे तक विद्युत आपूर्ति बंद रहेगी।"
    },
    {
        "title": "Subsidized Organic Seed Distribution",
        "title_hi": "सब्सिडी वाले जैविक बीज वितरण",
        "type": "Govt Update",
        "date": "02 July 2026",
        "description": "Block development office has dispatched subsidized paddy seeds to the cooperative warehouse. Farmers can collect by presenting Land card.",
        "description_hi": "ब्लॉक विकास कार्यालय ने सहकारी गोदाम में रियायती धान के बीज भेज दिए हैं। किसान खतौनी दिखाकर बीज प्राप्त कर सकते हैं।"
    }
]

MOCK_MAP_PINS = [
    {
        "id": 1,
        "type": "Gram Panchayat",
        "name": "Rampur Panchayat Bhavan",
        "name_hi": "रामपुर पंचायत भवन",
        "lat": 26.8467,
        "lng": 80.9462,
        "icon": "Landmark",
        "desc": "Local administrative headquarters and village library.",
        "desc_hi": "स्थानीय प्रशासनिक मुख्यालय और ग्राम पुस्तकालय।"
    },
    {
        "id": 2,
        "type": "Primary School",
        "name": "Government Primary School",
        "name_hi": "राजकीय प्राथमिक विद्यालय",
        "lat": 26.8480,
        "lng": 80.9490,
        "icon": "School",
        "desc": "Primary school supporting classes 1 to 8 with midday meal facilities.",
        "desc_hi": "मध्याह्न भोजन सुविधा के साथ कक्षा १ से ८ तक के छात्रों का विद्यालय।"
    },
    {
        "id": 3,
        "type": "Healthcare Center",
        "name": "Community Health Center",
        "name_hi": "सामुदायिक स्वास्थ्य केंद्र",
        "lat": 26.8450,
        "lng": 80.9430,
        "icon": "HeartPulse",
        "desc": "Primary diagnostic clinic open 24x7 for vaccinations and wellness checks.",
        "desc_hi": "टीकाकरण और सामान्य जांच के लिए २४ घंटे खुला चिकित्सालय।"
    },
    {
        "id": 4,
        "type": "Co-operative Shop",
        "name": "Government Ration Shop",
        "name_hi": "सरकारी राशन की दुकान",
        "lat": 26.8430,
        "lng": 80.9470,
        "icon": "Store",
        "desc": "Fair price shop distributing monthly grains and fuel under state schemes.",
        "desc_hi": "सरकारी योजनाओं के तहत मासिक अनाज और ईंधन वितरण केंद्र।"
    }
]

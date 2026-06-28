from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Lesson(BaseModel):
    title: str
    title_hi: str
    desc: str
    desc_hi: str
    level: str
    duration: str

class Scholarship(BaseModel):
    name: str
    name_hi: str
    eligible: str
    eligible_hi: str
    value: str
    deadline: str

class School(BaseModel):
    type: str
    name: str
    name_hi: str
    teachers: int
    students: int

class CareerGuide(BaseModel):
    field: str
    title: str
    title_hi: str
    desc: str
    desc_hi: str

class EducationResponse(BaseModel):
    lessons: List[Lesson]
    scholarships: List[Scholarship]
    schools: List[School]
    career_guides: List[CareerGuide]

@router.get("/education", response_model=EducationResponse)
def get_education_endpoint():
    return {
        "lessons": [
            {
                "title": "Introduction to Digital Banking",
                "title_hi": "डिजिटल बैंकिंग का परिचय",
                "desc": "Learn how to check your bank balance, send money safely, and avoid online fraud.",
                "desc_hi": "अपना बैंक बैलेंस जांचना, सुरक्षित रूप से पैसे भेजना और ऑनलाइन धोखाधड़ी से बचना सीखें।",
                "level": "Beginner / बुनियादी",
                "duration": "15 Min"
            },
            {
                "title": "Modern Micro-Irrigation Systems",
                "title_hi": "आधुनिक सूक्ष्म सिंचाई प्रणाली",
                "desc": "Maximize crop yield and save water using drip and sprinkler irrigation methods.",
                "desc_hi": "ड्रिप और स्प्रिंकलर सिंचाई विधियों का उपयोग करके फसल की उपज बढ़ाएं और पानी बचाएं।",
                "level": "Farming / कृषि",
                "duration": "25 Min"
            },
            {
                "title": "Primary Healthcare & Sanitation",
                "title_hi": "प्राथमिक स्वास्थ्य और स्वच्छता",
                "desc": "Essential guidelines for household hygiene, water purification, and child nutrition.",
                "desc_hi": "घरेलू स्वच्छता, जल शोधन और बाल पोषण के लिए आवश्यक दिशा-निर्देश।",
                "level": "Health / स्वास्थ्य",
                "duration": "10 Min"
            },
            {
                "title": "English Speaking for Village Traders",
                "title_hi": "ग्रामीण व्यापारियों के लिए अंग्रेजी बोलना",
                "desc": "Basic conversational English terms for selling crafts and crops to urban buyers.",
                "desc_hi": "शहरी खरीदारों को शिल्प और फसलें बेचने के लिए बुनियादी अंग्रेजी शब्द बोलना सीखें।",
                "level": "Vocational / व्यावहारिक",
                "duration": "20 Min"
            }
        ],
        "scholarships": [
            {
                "name": "State Pre-Matric SC/ST Scholarship",
                "name_hi": "राज्य प्री-मैट्रिक अनुसूचित जाति/जनजाति छात्रवृत्ति",
                "eligible": "SC/ST candidates, family income < 2.5L",
                "eligible_hi": "एससी/एसटी वर्ग, वार्षिक पारिवारिक आय < 2.5 लाख",
                "value": "Rs. 3500 / year",
                "deadline": "31 Oct 2026"
            },
            {
                "name": "National Means-Cum-Merit Scholarship",
                "name_hi": "राष्ट्रीय साधन-सह-योग्यता छात्रवृत्ति",
                "eligible": "Class 8 pass with > 55% marks, BPL family",
                "eligible_hi": "कक्षा 8 उत्तीर्ण (> 55% अंक), बीपीएल परिवार",
                "value": "Rs. 12000 / year",
                "deadline": "15 Nov 2026"
            },
            {
                "name": "Savitribai Phule Scholarship for Girls",
                "name_hi": "सावित्रीबाई फुले बालिका छात्रवृत्ति",
                "eligible": "Rural girl students, class 5-10 study",
                "eligible_hi": "ग्रामीण छात्राएं, कक्षा 5 से 10 में अध्ययनरत",
                "value": "Rs. 5000 / year",
                "deadline": "30 Dec 2026"
            }
        ],
        "schools": [
            {
                "type": "Primary School",
                "name": "Rampur Primary Vidhyalaya",
                "name_hi": "रामपुर प्राथमिक विद्यालय",
                "teachers": 6,
                "students": 140
            },
            {
                "type": "Junior High School",
                "name": "Rampur Girls Junior College",
                "name_hi": "रामपुर बालिका जूनियर हाई स्कूल",
                "teachers": 8,
                "students": 180
            },
            {
                "type": "Co-Ed Senior Secondary",
                "name": "Rampur Intermediate Government School",
                "name_hi": "रामपुर इंटरमीडिएट राजकीय विद्यालय",
                "teachers": 14,
                "students": 320
            }
        ],
        "career_guides": [
            {
                "field": "Agriculture Technology",
                "title": "Drone Farming & Smart Agritech",
                "title_hi": "ड्रोन खेती और स्मार्ट एग्रीटेक",
                "desc": "Training pathways to operate agri-drones and manage pesticide sprays as a contractor.",
                "desc_hi": "कृषि-ड्रोन संचालित करने और ठेकेदार के रूप में कीटनाशक छिड़काव का प्रबंधन करने का प्रशिक्षण।"
            },
            {
                "field": "Civil Services",
                "title": "State Gram Panchayat Secretary",
                "title_hi": "राज्य ग्राम पंचायत सचिव पद",
                "desc": "Guidance on cracking the State Subordinate Services exam to handle Panchayat administrative logs.",
                "desc_hi": "पंचायत प्रशासनिक कार्यों को संभालने के लिए राज्य अधीनस्थ सेवा परीक्षा पास करने का मार्गदर्शन।"
            },
            {
                "field": "Renewable Energy",
                "title": "Solar Installation Technician",
                "title_hi": "सोलर पैनल इंस्टॉलेशन तकनीशियन",
                "desc": "Short-term government vocational courses under PMKVY for installing rooftop solar grids.",
                "desc_hi": "छत पर सोलर ग्रिड स्थापित करने के लिए पीएमकेवीवाई के तहत अल्पकालिक व्यावसायिक पाठ्यक्रम।"
            }
        ]
    }

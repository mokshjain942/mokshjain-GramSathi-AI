import os
from groq import Groq
import backend.config as config

# Initialize Groq client if configured
groq_client = None
if not config.MOCK_AI:
    try:
        groq_client = Groq(api_key=config.GROQ_API_KEY)
    except Exception as e:
        print(f"Error initializing Groq Client: {e}")
        config.MOCK_AI = True

SYSTEM_PROMPT = """
You are "GramSathi AI", a warm, empathetic, and highly knowledgeable digital assistant for rural citizens in India. 
Your goal is to guide village residents in a simple, clear, and highly accessible manner. 
Use short paragraphs, bullet points, and bulleted steps.
Avoid complex technical jargon. 
Answer in the language requested. If the language is 'hi' (Hindi), respond in clear Devnagari script (Hindi). If 'en' (English), respond in simple, warm English.
Always keep answers concise, practical, and highly friendly.
"""

def get_chat_response(message: str, language: str = "en") -> str:
    """
    Generate chat response from Llama 3.3 70B via Groq. Falls back to smart mock if credentials are absent.
    """
    if config.MOCK_AI or not groq_client:
        return get_mock_chat_response(message, language)

    try:
        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"The user is asking this in '{language}' language: {message}"}
            ],
            temperature=0.7,
            max_tokens=800,
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Groq API Error: {e}")
        return get_mock_chat_response(message, language)

def get_scheme_recommendations(occupation: str, village: str, state: str, language: str = "en") -> str:
    """
    Generate personalized scheme recommendations using user profile metadata.
    """
    prompt = f"Identify and recommend government schemes suitable for a citizen who works as a '{occupation}' living in the village of '{village}', state of '{state}'."
    
    if config.MOCK_AI or not groq_client:
        return get_mock_recommendations(occupation, village, state, language)

    try:
        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Language: {language}. Query: {prompt}"}
            ],
            temperature=0.5,
            max_tokens=800
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Groq recommendation API error: {e}")
        return get_mock_recommendations(occupation, village, state, language)


# MOCK RESPONSES FALLBACKS (For immediate offline & out-of-the-box demonstration)
def get_mock_chat_response(message: str, lang: str) -> str:
    msg_lower = message.lower()
    
    if lang == "hi":
        if "किसान" in msg_lower or "कृषि" in msg_lower or "खेती" in msg_lower or "seed" in msg_lower:
            return (
                "कृषि सहायता सुझाव:\n"
                "• **पीएम किसान योजना**: आपको प्रति वर्ष ₹6000 की वित्तीय सहायता मिल सकती है। सहकारी बैंक में पंजीकरण जांचें।\n"
                "• **बीज वितरण**: आपके रामपुर सहकारी केंद्र में कम दाम पर जैविक धान के बीज उपलब्ध हैं।\n"
                "• **सलाह**: अधिक उपज के लिए बुवाई से पहले खतौनी और आधार कार्ड अवश्य तैयार रखें।"
            )
        elif "अस्पताल" in msg_lower or "टीका" in msg_lower or "डॉक्टर" in msg_lower or "health" in msg_lower:
            return (
                "स्वास्थ्य सेवा सहायता:\n"
                "• **रामपुर सामुदायिक केंद्र**: मुख्य मार्ग, वार्ड २ पर स्थित है। यहाँ २४ घंटे डॉक्टर उपलब्ध हैं।\n"
                "• **दवा अनुस्मारक**: अपना समय पर टीका लगवाने के लिए पंचायत हॉल के नोटिस बोर्ड को देखें।"
            )
        elif "व्यवसाय" in msg_lower or "दुकान" in msg_lower or "पंजीकरण" in msg_lower:
            return (
                "ग्राम व्यापार पंजीकरण:\n"
                "• आप अपनी दुकान ग्राम हाट निर्देशिका में सूचीबद्ध कर सकते हैं।\n"
                "• महिला स्वयं सहायता समूहों के लिए सरकार द्वारा ऋण प्रदान किया जा रहा है। प्रधान कार्यालय से संपर्क करें।"
            )
        else:
            return (
                "नमस्ते! मैं ग्रामसाथी एआई हूँ। मैं आपकी सहायता करने के लिए तैयार हूँ।\n"
                "आप मुझसे योजनाओं, डॉक्टरों, स्कूलों या कृषि के बारे में पूछ सकते हैं। आप हिंदी में अपनी आवाज़ में भी प्रश्न पूछ सकते हैं!"
            )
    else:
        # English fallback
        if "kisan" in msg_lower or "farm" in msg_lower or "seed" in msg_lower or "crop" in msg_lower:
            return (
                "Agricultural Assistance:\n"
                "• **PM Kisan Nidhi**: You qualify for Rs. 6000 yearly income support. Check details at the Panchayat office.\n"
                "• **Seeds**: Subsidized organic seeds are available at Rao Agri store near Mandi crossing.\n"
                "• **Tip**: Keep your land khatauni ready for registration."
            )
        elif "hospital" in msg_lower or "clinic" in msg_lower or "doctor" in msg_lower or "health" in msg_lower:
            return (
                "Medical Support:\n"
                "• **Community Health Center**: Located on Main Road, open 24x7. Dr. Sunil Sharma is available.\n"
                "• **Ayushman Card**: Camp is active on Monday in Panchayat Bhavan for free medical insurance cards."
            )
        elif "business" in msg_lower or "shop" in msg_lower or "register" in msg_lower:
            return (
                "Village Trade Advice:\n"
                "• Submit your business details to the local Panchayat head (Smt. Shanti Devi) to get listed in the Village Haat database.\n"
                "• Loans with low interest rates are available under Mudra Scheme for rural traders."
            )
        else:
            return (
                "Hello! I am your GramSathi AI assistant.\n"
                "Ask me about government schemes, health clinics, schools, local businesses or emergency dial codes. You can also tap the microphone to speak!"
            )

def get_mock_recommendations(occupation: str, village: str, state: str, lang: str) -> str:
    if lang == "hi":
        return (
            f"**ग्रामसाथी एआई - अनुकूलित सरकारी योजना सुझाव**\n\n"
            f"आपके प्रोफाइल (व्यवसाय: {occupation}, गाँव: {village}, राज्य: {state}) के आधार पर, हम निम्नलिखित योजनाओं की सलाह देते हैं:\n\n"
            f"1. **प्रधानमंत्री किसान सम्मान निधि योजना**\n"
            f"   - **लाभ**: प्रति वर्ष ₹6000 नकद आय सहायता।\n"
            f"   - **स्थिति**: आपके गाँव में पंजीकरण चालू है।\n\n"
            f"2. **प्रधानमंत्री ग्रामीण आवास योजना**\n"
            f"   - **लाभ**: पक्के मकान के निर्माण के लिए ₹1.2 लाख की प्रत्यक्ष वित्तीय सहायता।\n"
            f"   - **पात्रता**: कच्चे मकान में रहने वाले ग्रामीण परिवार।"
        )
    else:
        return (
            f"**GramSathi AI - Customized Scheme Recommendations**\n\n"
            f"Based on your profile (Occupation: {occupation}, Village: {village}, State: {state}), you are eligible for:\n\n"
            f"1. **PM Kisan Samman Nidhi**\n"
            f"   - **Benefit**: Direct cash assistance of Rs. 6000/year to support crop purchases.\n"
            f"   - **Next Steps**: Present your Aadhaar and Land record (Khatauni) at the village co-op.\n\n"
            f"2. **Pradhan Mantri Rural Housing (PMAY-G)**\n"
            f"   - **Benefit**: Financial grant up to Rs. 1.2 Lakhs for building concrete homes."
        )

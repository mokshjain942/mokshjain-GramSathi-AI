import os
from dotenv import load_dotenv

# Load environmental variables from root workspace and backend directories
base_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_paths = [
    os.path.join(base_dir, ".env"),
    os.path.join(base_dir, ".env.local"),
    os.path.join(base_dir, "..", ".env"),
    os.path.join(base_dir, "..", ".env.local"),
]

for path in dotenv_paths:
    if os.path.exists(path):
        load_dotenv(dotenv_path=path, override=True)

# API Keys and URLs
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")

# Fallback Flags (Enabled if keys are missing)
MOCK_AI = not bool(GROQ_API_KEY)
MOCK_DB = not (bool(SUPABASE_URL) and bool(SUPABASE_ANON_KEY))

# Print configurations for log transparency
print("====================================================")
print("GRAMSATHI AI CONFIGURATION INTAKE")
print("====================================================")
print(f"Supabase URL configured: {bool(SUPABASE_URL)}")
print(f"Supabase Key configured: {bool(SUPABASE_ANON_KEY)}")
print(f"Groq API Key configured: {bool(GROQ_API_KEY)}")
print(f"Database Mode: {'DEMO (MOCK)' if MOCK_DB else 'LIVE (SUPABASE)'}")
print(f"AI Service Mode: {'DEMO (MOCK)' if MOCK_AI else 'LIVE (GROQ Llama)'}")
print("====================================================")

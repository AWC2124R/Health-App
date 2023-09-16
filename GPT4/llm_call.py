import os
import json
import openai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GPT4_APIKEY")
BASE_PROMPT = """
                Please add these three numbers: {}, {}, {}.
              """

def generate_prompt(arguments):
    return BASE_PROMPT.format(arguments[0], arguments[1], arguments[2])

def call_gpt4(arguments):
    openai.api_key = API_KEY

    GPTprompt = generate_prompt(arguments)

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": GPTprompt
            },
        ],
        temperature=0.7
    )
    
    contentStr = response.choices[0].message.content
    return contentStr
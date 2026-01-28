from fastapi import FastAPI
from rag import RAG

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

rag = RAG()

@app.post("/ingest")
def ingest_blog(data: dict):
    rag.ingest(data["text"])
    return {"status": "blog ingested"}

@app.post("/ask")
def ask_question(data: dict):
    answer = rag.ask(data["question"])
    return {"answer": answer}

import ollama

@app.post("/summarize")
def summarize_blog(data: dict):
    text = data.get("text", "")
    if not text:
        return {"error": "No text provided"}
    
    response = ollama.chat(
        model="phi",
        messages=[
            {
                "role": "user",
                "content": f"Summarize the following blog post in a concise paragraph:\n\n{text}"
            }
        ]
    )
    return {"summary": response["message"]["content"]}

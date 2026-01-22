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

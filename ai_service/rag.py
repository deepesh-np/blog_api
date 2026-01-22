
from sentence_transformers import SentenceTransformer
import faiss
import ollama

model = SentenceTransformer("all-MiniLM-L6-v2")

class RAG:
    def __init__(self):
        self.chunks = []
        self.index = None

    def ingest(self, text):
        self.chunks = [text[i:i+500] for i in range(0, len(text), 450)]
        embeddings = model.encode(self.chunks)

        self.index = faiss.IndexFlatL2(len(embeddings[0]))
        self.index.add(embeddings)

    def ask(self, question):
        q_embedding = model.encode([question])
        _, idx = self.index.search(q_embedding, k=3)

        context = "\n".join([self.chunks[i] for i in idx[0]])

        response = ollama.chat(
            model="phi",
            messages=[{
                "role": "user",
                "content": f"""
Answer ONLY from the context.
If not found, say "Not found".

Context:
{context}

Question:
{question}
"""
            }]
        )
        return response["message"]["content"]

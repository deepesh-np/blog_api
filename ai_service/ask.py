from sentence_transformers import SentenceTransformer
import faiss
import ollama

chunks = [
    "React Hooks are functions that let you use state.",
    "useState is used to manage state in components.",
    "useEffect handles side effects like API calls."
]

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("blog.index")

question = "What is useEffect?"

q_embedding = model.encode([question])
_, indices = index.search(q_embedding, k=2)

context = "\n".join([chunks[i] for i in indices[0]])

response = ollama.chat(
    model="llama3",
    messages=[
        {
            "role": "user",
            "content": f"""
Answer ONLY using the context below.
If answer is not present, say "Not found".

Context:
{context}

Question:
{question}
"""
        }
    ]
)

print(response["message"]["content"])

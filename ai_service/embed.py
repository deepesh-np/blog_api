from sentence_transformers import SentenceTransformer
import faiss

chunks = [
    "React Hooks are functions that let you use state.",
    "useState is used to manage state in components.",
    "useEffect handles side effects like API calls."
]

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks)

index = faiss.IndexFlatL2(len(embeddings[0]))
index.add(embeddings)

faiss.write_index(index, "blog.index")
print("Embeddings stored successfully.")

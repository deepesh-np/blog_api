import ollama

blog_text = """
React Hooks are functions that let you use state and lifecycle features.
useState is used to manage state in functional components.
useEffect is used for side effects like API calls.
"""

response = ollama.chat(
    model="phi",
    messages=[
        {
            "role": "user",
            "content": f"Summarize the following blog in 3 bullet points:\n{blog_text}"
        }
    ]
)

print(response["message"]["content"])

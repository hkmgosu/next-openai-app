"use client";
import { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Error fetching data");

      const data = await res.json();
      console.log(data.output);
      setResponse(data.output.content);
    } catch (error) {
      console.log(error);
      setResponse("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>OpenAI Prompt Command</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          cols={50}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Enviar"}
        </button>
      </form>
      {response && (
        <div>
          <h2>Respuesta:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

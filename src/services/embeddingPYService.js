require('dotenv').config();

const embeddingApi = process.env.EMBEDDING_API;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
async function getEmbeddingsFromPythonService(text) {
  try {
    const response = await fetch(`${embeddingApi}/embeddings`, { // Replace with your Flask app's URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error calling Python embedding service:", error);
    throw error; // Important: re-throw the error
  }
}

module.exports = getEmbeddingsFromPythonService;
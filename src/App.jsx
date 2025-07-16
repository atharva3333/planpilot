import React, { useState } from 'react';
import { Ollama } from '@langchain/ollama';
import { PromptTemplate } from '@langchain/core/prompts';

function App() {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [days, setDays] = useState(3);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = async () => {
    setLoading(true);
    setResponse('');

    console.log('📤 Sending request with:', {
      destination,
      interests,
      days,
    });

    try {
      const model = new Ollama({
        model: 'qwen2.5-coder:1.5b-base',
        baseUrl: 'http://localhost:11434',
      });

      const prompt = PromptTemplate.fromTemplate(`
You are a smart travel agent.
Plan a {days}-day trip to {destination} for someone interested in {interests}.
Include places to visit, where to eat, and local tips for each day.
Respond in this format:
Day 1: ...
Day 2: ...
...
      `);

      const chain = prompt.pipe(model);

      const result = await chain.invoke({
        destination,
        interests,
        days,
      });

      console.log('✅ LangChain response:', result);

      // Handle different response types
      if (typeof result === 'string') {
        setResponse(result);
      } else if (result && typeof result.content === 'string') {
        setResponse(result.content);
      } else {
        setResponse(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.error('❌ Error during fetch:', error);
      setResponse('❌ Failed to connect to LangChain/Ollama.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h1>🧳 AI Travel Planner (LangChain + Ollama)</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Destination: </label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Goa"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Interests: </label>
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., beaches, food, adventure"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Number of days: </label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>

      <button
        onClick={handlePlanTrip}
        disabled={loading}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        {loading ? 'Planning...' : 'Plan My Trip'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <h2>🗺️ Your Trip Plan:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '1rem' }}>
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;

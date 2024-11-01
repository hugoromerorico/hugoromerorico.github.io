// /utils/getResponse.js


import bio from '../data/bio.json';
import education from '../data/education.json';
import workExperience from '../data/workExperience.json';
import projects from '../data/projects.json';
import hobbies from '../data/hobbies.json';

let pipeline;
let generator = null;

export async function initializeModel(progressCallback) {
  console.log("Initializing model...");
  if (typeof window === 'undefined') {
    console.log("Server-side environment detected, skipping initialization");
    return false; // We're on the server side, don't initialize
  }

  try {
    if (!pipeline) {
      console.log("Importing pipeline...");
      const { pipeline: pipelineModule } = await import('@xenova/transformers');
      pipeline = pipelineModule;
      console.log("Pipeline imported successfully");
    }

    if (!generator) {
      console.log("Creating generator...");
      generator = await pipeline('text-generation', 'Xenova/distilgpt2', {
        progress_callback: (progress) => {
          if (progress.status === 'progress') {
            const percentage = Math.round((progress.loaded / progress.total) * 100);
            console.log(`Loading model: ${percentage}%`);
            progressCallback(percentage);
          }
        }
      });
      console.log("Generator created successfully");
    }
    console.log("Model initialization complete");
    return true;
  } catch (error) {
    console.error("Error during model initialization:", error);
    return false;
  }
}

export async function getResponse(message, onTokenCallback) {
  console.log("Getting response for message:", message);
  if (typeof window === 'undefined') {
    console.log("Server-side environment detected, returning default message");
    return "I'm sorry, I can't process your request right now.";
  }

  if (!generator) {
    console.error("Model not initialized. Call initializeModel() first.");
    throw new Error('Model not initialized. Call initializeModel() first.');
  }

  const lowerMessage = message.toLowerCase().trim();
  let context = '';

  if (isInappropriate(lowerMessage)) {
    console.log("Inappropriate message detected");
    return "I'm sorry, but I can't assist with that request.";
  }

  console.log("Generating context...");
  if (containsKeywords(lowerMessage, ['education', 'study', 'university', 'college', 'degree'])) {
    context += "I studied at the University Carlos III of Madrid, where I got my degree in Computer Science.";
  }
  if (containsKeywords(lowerMessage, ['work', 'experience', 'job', 'career', 'profession'])) {
    context += JSON.stringify(workExperience);
  }
  if (containsKeywords(lowerMessage, ['project', 'portfolio', 'work', 'developed'])) {
    context += JSON.stringify(projects);
  }
  if (containsKeywords(lowerMessage, ['hobby', 'volleyball', 'interest', 'activities', 'sports'])) {
    context += JSON.stringify(hobbies);
  }
  if (containsKeywords(lowerMessage, ['about', 'yourself', 'bio', 'who are you'])) {
    context += JSON.stringify(bio);
  }

  // If no specific context was added, use all data
  if (!context) {
    console.log("No specific context found, using all data");
    context = JSON.stringify({ bio, education, workExperience, projects, hobbies });
  }

  try {
    
    const prompt = `Context: ${context}\n\nQuestion: ${message}\n\nAnswer:`;
    console.log("Sending prompt to model:", prompt);
    const output = await generator(prompt, {
      max_new_tokens: 100,
      temperature: 0.7,
      repetition_penalty: 1.2,
      no_repeat_ngram_size: 2,
    });

    // Extract the response and clean it up
    const response = output[0].generated_text.split("Answer:")[1].trim();
    
    // Split into words, but keep spaces
    const words = response.split(/(\s+)/).filter(token => token.length > 0);
    
    let fullResponse = '';
    for (const word of words) {
      // Check if the word is not already part of the last addition
      if (!fullResponse.endsWith(word)) {
        fullResponse += word;
        onTokenCallback(word);
        // Add a small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Error in LLM processing:', error);
    return "I'm sorry, I encountered an error while processing your request. Could you please try again?";
  }
}

function containsKeywords(message, keywords) {
  return keywords.some(keyword => message.includes(keyword));
}

function isInappropriate(message) {
  const inappropriateKeywords = ['badword1', 'badword2']; // Add any inappropriate words or phrases
  return inappropriateKeywords.some(keyword => message.includes(keyword));
}

// /utils/getResponse.js

import bio from '../data/bio.json';
import education from '../data/education.json';
import workExperience from '../data/workExperience.json';
import projects from '../data/projects.json';
import hobbies from '../data/hobbies.json';

let pipeline;
let answerer = null;

export async function initializeModel() {
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

    if (!answerer) {
      console.log("Creating answerer...");
      answerer = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad', {
        progress_callback: (progress) => {
          console.log(`Loading model: ${Math.round(progress.progress * 100)}%`);
        }
      });
      console.log("Answerer created successfully");
    }
    console.log("Model initialization complete");
    return true;
  } catch (error) {
    console.error("Error during model initialization:", error);
    return false;
  }
}

export async function getResponse(message) {
  console.log("Getting response for message:", message);
  if (typeof window === 'undefined') {
    console.log("Server-side environment detected, returning default message");
    return "I'm sorry, I can't process your request right now.";
  }

  if (!answerer) {
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
    context += JSON.stringify(education);
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
    console.log("Sending question to model...");
    const output = await answerer(message, context);
    console.log("Received answer from model:", output.answer);
    return output.answer;
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

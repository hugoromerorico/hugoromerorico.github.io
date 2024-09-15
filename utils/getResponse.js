// /utils/getResponse.js

import bio from '../data/bio.json';
import education from '../data/education.json';
import workExperience from '../data/workExperience.json';
import projects from '../data/projects.json';
import hobbies from '../data/hobbies.json';

export default function getResponse(message) {
  const lowerMessage = message.toLowerCase().trim();
  let response = '';

  if (isInappropriate(lowerMessage)) {
    response = "I'm sorry, but I can't assist with that request.";
  } else if (containsKeywords(lowerMessage, ['education', 'study', 'university', 'college', 'degree'])) {
    response = formatEducationResponse();
  } else if (containsKeywords(lowerMessage, ['work', 'experience', 'job', 'career', 'profession'])) {
    response = formatWorkExperienceResponse();
  } else if (containsKeywords(lowerMessage, ['project', 'portfolio', 'work', 'developed'])) {
    response = formatProjectsResponse();
  } else if (containsKeywords(lowerMessage, ['hobby', 'volleyball', 'interest', 'activities', 'sports'])) {
    response = formatHobbiesResponse();
  } else if (containsKeywords(lowerMessage, ['about', 'yourself', 'bio', 'who are you'])) {
    response = formatBioResponse();
  } else {
    response = "I'm sorry, I didn't understand your question. Could you please rephrase?";
  }

  return response;
}

function containsKeywords(message, keywords) {
  return keywords.some(keyword => message.includes(keyword));
}

function isInappropriate(message) {
  const inappropriateKeywords = ['badword1', 'badword2']; // Add any inappropriate words or phrases
  return inappropriateKeywords.some(keyword => message.includes(keyword));
}

function formatEducationResponse() {
  let response = 'Here is my educational background:\n\n';
  education.education.forEach(edu => {
    response += `**${edu.degree}**\n`;
    response += `*Institution*: ${edu.institution}\n`;
    response += `*Duration*: ${edu.duration}\n`;
    if (edu.gpa) response += `*GPA*: ${edu.gpa}\n`;
    if (edu.keySkills) response += `*Key Skills*: ${edu.keySkills.join(', ')}\n`;
    if (edu.honors) response += `*Honors*: ${edu.honors.join(', ')}\n`;
    if (edu.scholarships) response += `*Scholarships*: ${edu.scholarships.join(', ')}\n`;
    if (edu.activities) response += `*Activities*: ${edu.activities.join(', ')}\n`;
    response += '\n';
  });
  return response;
}

function formatWorkExperienceResponse() {
  let response = 'Here is my professional experience:\n\n';
  workExperience.experiences.forEach(exp => {
    response += `**${exp.title} at ${exp.company}**\n`;
    response += `*Duration*: ${exp.duration}\n`;
    if (exp.transition) {
      response += `*Transition*: From ${exp.transition.from} to ${exp.transition.to} (${exp.transition.date})\n`;
    }
    response += `*Responsibilities*:\n`;
    exp.responsibilities.forEach(responsibility => {
      response += `- ${responsibility}\n`;
    });
    response += '\n';
  });
  return response;
}

function formatProjectsResponse() {
  let response = 'Here are some of my projects:\n\n';
  projects.projects.forEach(project => {
    response += `**${project.name}**\n`;
    response += `${project.description}\n\n`;
  });
  return response;
}

function formatHobbiesResponse() {
  let response = 'Here are some of my hobbies and interests:\n\n';
  hobbies.hobbies.forEach(hobby => {
    response += `- **${hobby.title}**: ${hobby.description}\n`;
  });
  return response;
}

function formatBioResponse() {
  return `${bio.aboutMe}\n\nYou can find more on my LinkedIn: ${bio.linkedin}`;
}

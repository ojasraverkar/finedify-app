// Script to seed quizzes and assessments from content file
const mongoose = require('mongoose');
const fs = require('fs');
const Quiz = require('../models/Quiz');
require('dotenv').config();

const contentPath = 'd:/financial_projects/finedify/quiz_assesments_content.txt';

function parseQuizContent(content) {
  // Basic parser for the provided content format
  const modules = [];
  const moduleRegex = /## Module (\d+): ([^-]+) - Quizzes([\s\S]*?)(?=## Module|$)/g;
  let moduleMatch;
  while ((moduleMatch = moduleRegex.exec(content))) {
    const moduleId = Number(moduleMatch[1]);
    const moduleTitle = moduleMatch[2].trim();
    const moduleContent = moduleMatch[3];
    const quizzes = [];
    const quizRegex = /### Quiz ([\d\.]+): ([^(\n]+)\(([^)]+)\)([\s\S]*?)(?=### Quiz|$)/g;
    let quizMatch;
    while ((quizMatch = quizRegex.exec(moduleContent))) {
      const quizTitle = quizMatch[2].trim();
      const difficulty = quizMatch[3].trim();
      const quizContent = quizMatch[4];
      const questions = [];
  // Support Windows (\r\n), Unix (\n), and possible extra whitespace
  const questionRegex = /\*\*Question (\d+)\*\* \(([^)]+)\)[\r\n]+([\s\S]*?)(?=---|$)/g;
      let questionMatch;
      while ((questionMatch = questionRegex.exec(quizContent))) {
        const questionTypeRaw = questionMatch[2].toLowerCase();
        let questionType = 'other';
        if (questionTypeRaw.includes('multiple')) questionType = 'multiple-choice';
        else if (questionTypeRaw.includes('true/false')) questionType = 'true-false';
        else if (questionTypeRaw.includes('scenario')) questionType = 'scenario';
        else if (questionTypeRaw.includes('drag')) questionType = 'drag-drop';

        // Extract question text (first non-empty line)
        const questionLines = questionMatch[3].split('\n').map(l => l.trim()).filter(Boolean);
        const questionText = questionLines[0] || '';

        // Extract options (A-D or numbered or bulleted)
        let options = [];
        if (questionType === 'multiple-choice' || questionType === 'scenario' || questionType === 'drag-drop') {
          // Match A) ... or 1) ... or - ...
          const optionRegex = /([A-D1-9])\) ([^\n]+)/g;
          let optMatch;
          while ((optMatch = optionRegex.exec(questionMatch[3]))) {
            options.push(optMatch[2].trim());
          }
          // For drag-drop, also match lines like "- ..."
          if (options.length === 0 && questionType === 'drag-drop') {
            const dragOptions = questionMatch[3].match(/- ([^\n]+)/g);
            if (dragOptions) options = dragOptions.map(opt => opt.replace(/^- /, '').trim());
          }
        }

        // Extract correct answer
        let correctAnswer = '';
        const correctAnswerMatch = questionMatch[3].match(/\*\*Correct Answer:\*\* ([^\n]+)/);
        if (correctAnswerMatch) {
          let ans = correctAnswerMatch[1].trim();
          // If answer is True/False, convert to boolean
          if (ans === 'True') correctAnswer = true;
          else if (ans === 'False') correctAnswer = false;
          else if (ans.match(/^[A-D1-9]\)/)) correctAnswer = ans.replace(/^[A-D1-9]\) /, '');
          else correctAnswer = ans;
        }

        // Extract explanation
        const explanationMatch = questionMatch[3].match(/\*\*Explanation:\*\* ([\s\S]*?)(?=\n---|$)/);
        const explanation = explanationMatch ? explanationMatch[1].trim() : '';

        questions.push({
          moduleId,
          moduleTitle,
          quizTitle,
          questionText,
          questionType,
          options,
          correctAnswer,
          explanation,
          difficulty,
        });
      }
      quizzes.push({ moduleId, moduleTitle, quizTitle, questions });
    }
    modules.push(...quizzes);
  }
  return modules;
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const content = fs.readFileSync(contentPath, 'utf8');
  const quizzes = parseQuizContent(content);
  // Debug: Print parsed quizzes and questions
  quizzes.forEach((quiz, idx) => {
    console.log(`Quiz ${idx + 1}: ${quiz.quizTitle} [${quiz.moduleTitle}]`);
    console.log(`Questions: ${quiz.questions.length}`);
    quiz.questions.forEach((q, qidx) => {
      console.log(`  Q${qidx + 1}: ${q.questionText}`);
      console.log(`    Type: ${q.questionType}`);
      console.log(`    Options: ${JSON.stringify(q.options)}`);
      console.log(`    Correct: ${JSON.stringify(q.correctAnswer)}`);
      console.log(`    Explanation: ${q.explanation}`);
    });
  });
  await Quiz.deleteMany({});
  await Quiz.insertMany(quizzes);
  console.log('Quizzes seeded successfully!');
  process.exit(0);
}

seed();

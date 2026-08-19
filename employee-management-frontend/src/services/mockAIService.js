const responses = {
  "employee management": "Employee management is the process of managing employees effectively to achieve organizational goals. It includes recruitment, training, performance management, and retention strategies.",
  
  "productivity": "To improve employee productivity: 1) Set clear goals, 2) Provide regular feedback, 3) Remove distractions, 4) Offer professional development, 5) Recognize achievements, 6) Foster a positive work culture.",
  
  "hr practices": "Best HR practices include: employee engagement programs, fair compensation, career development opportunities, wellness initiatives, transparent communication, and diversity & inclusion policies.",
  
  "spring boot": "Spring Boot is a Java framework that simplifies building production-ready applications. It provides auto-configuration, embedded servers, and reduces boilerplate code.",
  
  "react": "React is a JavaScript library for building user interfaces with reusable components. It uses a virtual DOM for efficient rendering and supports state management.",
  
  "database": "A database is an organized collection of structured data stored and accessed electronically. Types include relational (SQL), NoSQL, and graph databases.",
  
  "hello": "Hello! I'm your AI Assistant. Ask me anything about employee management, HR practices, Spring Boot, React, databases, or general business topics!",
  
  "default": "That's an interesting question! Based on best practices in business and technology, I'd recommend researching industry standards and consulting with experts. Feel free to ask me about employee management, HR, software development, or databases!"
};

export const askMockAI = async (question) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuestion = question.toLowerCase();
  
  // Find best matching response
  for (const [key, value] of Object.entries(responses)) {
    if (lowerQuestion.includes(key)) {
      return value;
    }
  }
  
  return responses.default;
};
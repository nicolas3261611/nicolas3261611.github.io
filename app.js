const problems = [
    {
      id: 1,
      title: "Queue: Enqueue and Dequeue",
      description: "Implement a queue with enqueue and dequeue operations.",
      input: "[1, 2, 3]",
      expectedOutput: "[1, 2, 3]",
    },
    {
      id: 2,
      title: "Queue: Reverse Order",
      description: "Use a queue to reverse the order of a list of numbers.",
      input: "[4, 5, 6]",
      expectedOutput: "[6, 5, 4]",
    },
    {
      id: 3,
      title: "Stack: Push and Pop",
      description: "Implement a stack with push and pop operations.",
      input: "[10, 20, 30]",
      expectedOutput: "[30, 20, 10]",
    },
    {
      id: 4,
      title: "Stack: Balanced Parentheses",
      description: "Check if a string of parentheses is balanced.",
      input: "\"(())\"",
      expectedOutput: "true",
    },
  ];
  
  function selectProblem(id) {
    const problem = problems.find((p) => p.id === id);
    if (!problem) return;
  
    document.getElementById("problem-description").innerHTML = `
      <h3>${problem.title}</h3>
      <p>${problem.description}</p>
      <p><strong>Input:</strong> ${problem.input}</p>
      <p><strong>Expected Output:</strong> ${problem.expectedOutput}</p>
    `;
  }
  
  document.getElementById("run-code").addEventListener("click", async () => {
    const problemTitleElement = document.querySelector("#problem-description h3");
  
    // Verifica si se seleccionó un problema
    if (!problemTitleElement) {
      alert("Please select a problem first!");
      return;
    }
  
    const problem = problems.find((p) => p.title === problemTitleElement.textContent);
  
    // Verifica si se encontró el problema
    if (!problem) {
      alert("Invalid problem selected!");
      return;
    }
  
    const code = document.getElementById("code-input").value;
    const language = document.getElementById("language-select").value;
  
    // Simula la ejecución del código
    const result = code.includes("main") ? problem.expectedOutput : "Error";
    document.getElementById("output").textContent = result;
  });
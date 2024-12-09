const problems = {
  1: { 
    title: "Queue Problem 1", 
    description: "Implement a queue using two stacks. You should implement 'enqueue' and 'dequeue' operations using two stacks only.", 
    type: "queue",
    solution: "queue_enqueue_dequeue"
  },
  2: { 
    title: "Queue Problem 2", 
    description: "Reverse the order of elements in a queue. For example, given [1, 2, 3, 4], return [4, 3, 2, 1].",
    type: "queue",
    solution: "queue_reverse"
  },
  3: { 
    title: "Stack Problem 1", 
    description: "Implement a stack using a single queue. You should implement 'push' and 'pop' operations.",
    type: "stack",
    solution: "stack_single_queue"
  },
  4: { 
    title: "Stack Problem 2", 
    description: "Check if a string has balanced parentheses. For example, '(())' is balanced, but '(()' is not.",
    type: "stack",
    solution: "stack_balanced_parentheses"
  }
};

let selectedProblem = null;
const outputBox = document.getElementById("output");

// Mostrar el problema seleccionado
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", (e) => {
    const problemId = e.target.dataset.problem;
    selectedProblem = problems[problemId];
    document.getElementById("problem-title").innerText = selectedProblem.title;
    document.getElementById("problem-description").innerText = selectedProblem.description;
    document.getElementById("solution-form").classList.remove("hidden");
    outputBox.textContent = "";
  });
});

// Enviar solución usando Proxy
document.getElementById("submit-solution").addEventListener("click", async () => {
  const code = document.getElementById("code-input").value;
  const username = document.getElementById("username").value;
  const language = document.getElementById("language-select").value;

  if (!code || !username || !selectedProblem) {
    alert("Please fill all the fields and select a problem.");
    return;
  }

  const proxyUrl = "https://glitch.com/~emphasized-bony-reminder"; // Proxy creado en Glitch
  const requestData = {
    script: code,
    language: language,
    versionIndex: "0"
  };

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (response.ok) {
      const isCorrect = checkSolution(result.output, selectedProblem.solution);
      outputBox.textContent = isCorrect
        ? "🎉 Correct Solution!"
        : `❌ Incorrect Solution. Output:\n${result.output}`;
    } else {
      outputBox.textContent = "❌ Error executing your code.";
    }
  } catch (error) {
    console.error(error);
    outputBox.textContent = "❌ Error communicating with the server.";
  }
});

// Función para verificar soluciones
function checkSolution(output, solutionKey) {
  const checks = {
    "queue_enqueue_dequeue": () => output.includes("enqueue") && output.includes("dequeue"),
    "queue_reverse": () => output.includes("4, 3, 2, 1"),
    "stack_single_queue": () => output.includes("push") && output.includes("pop"),
    "stack_balanced_parentheses": () => output.includes("balanced"),
  };

  return checks[solutionKey] ? checks[solutionKey]() : false;
}

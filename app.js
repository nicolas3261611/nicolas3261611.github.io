
const problems = {
  1: { title: "Queue Problem 1", description: "Implement a queue using two stacks.", type: "queue" },
  2: { title: "Queue Problem 2", description: "Reverse the order of elements in a queue.", type: "queue" },
  3: { title: "Stack Problem 1", description: "Implement a stack using a single queue.", type: "stack" },
  4: { title: "Stack Problem 2", description: "Check if a string has balanced parentheses.", type: "stack" },
};

let selectedProblem = null;
const outputBox = document.getElementById("output");

document.querySelectorAll("button[data-problem]").forEach(button => {
  button.addEventListener("click", (e) => {
    const buttonElement = e.target.closest("button"); // Encuentra el botón más cercano
    const problemId = buttonElement.dataset.problem;  // Captura el atributo data-problem

    console.log("problemId:", problemId); // Depurar para verificar el valor

    if (!problemId) {
      alert("Error: No problem ID found!");
      return;
    }

    selectedProblem = problems[problemId];

    if (!selectedProblem) {
      alert(`Error: Problem with ID ${problemId} not found.`);
      console.error(`Problem with ID ${problemId} not found in 'problems' object.`);
      return;
    }

    document.getElementById("problem-title").innerText = selectedProblem.title;
    document.getElementById("problem-description").innerText = selectedProblem.description;
    document.getElementById("solution-form").classList.remove("hidden");
    outputBox.textContent = "";
  });
});


document.getElementById("submit-solution").addEventListener("click", async () => {
  const code = document.getElementById("code-input").value;
  const username = document.getElementById("username").value;
  const language = document.getElementById("language-select").value;

  if (!username.trim()) {
  alert("Please enter your name.");
  return;
  }
  
  if (!language) {
    alert("Please select a programming language.");
    return;
  }
  
  if (!selectedProblem) {
    alert("Please select a problem from the list.");
    return;
  }
  
  if (!code.trim()) {
    alert("Please write your solution code.");
    return;
  }

  const proxyUrl = "https://emphasized-bony-reminder.glitch.me/execute"; // Correct Proxy URL

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script: code, language: language, versionIndex: "0" }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Validar la respuesta antes de usar result.output
    if (!result || !result.output) {
      throw new Error("Invalid response from server. 'output' is missing.");
    }

    const isCorrect = checkSolution(result.output, selectedProblem.type);
    outputBox.textContent = isCorrect
      ? "🎉 Correct Solution!"
      : `❌ Incorrect Solution. Output:\n${result.output}`;
  } catch (error) {
    console.error("Error:", error.message);
    outputBox.textContent = `❌ Error: ${error.message}`;
  }

  function checkSolution(output, type) {
    if (type === "queue") return output.includes("queue");
    if (type === "stack") return output.includes("stack");
    return false;
  }
}

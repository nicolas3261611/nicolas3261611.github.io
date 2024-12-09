document.addEventListener("DOMContentLoaded", () => {
  const problems = {
    1: { title: "Queue Problem 1", description: "Implement a queue using two stacks.", type: "queue" },
    2: { title: "Queue Problem 2", description: "Reverse the order of elements in a queue.", type: "queue" },
    3: { title: "Stack Problem 1", description: "Implement a stack using a single queue.", type: "stack" },
    4: { title: "Stack Problem 2", description: "Check if a string has balanced parentheses.", type: "stack" },
  };

  let selectedProblem = null;
  const outputBox = document.getElementById("output");

  // Añadir event listeners a los botones
  document.querySelectorAll("button[data-problem]").forEach(button => {
    button.addEventListener("click", (e) => {
      const problemId = e.target.dataset.problem;

      if (!problemId || !problems[problemId]) {
        alert("Invalid problem selected!");
        return;
      }

      selectedProblem = problems[problemId];
      document.getElementById("problem-title").innerText = selectedProblem.title;
      document.getElementById("problem-description").innerText = selectedProblem.description;
      document.getElementById("solution-form").classList.remove("hidden");
      outputBox.textContent = "";
    });
  });

  // Enviar solución
  document.getElementById("submit-solution").addEventListener("click", async () => {
    const code = document.getElementById("code-input").value;
    const username = document.getElementById("username").value.trim();
    const language = document.getElementById("language-select").value;

    if (!username) {
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

    const proxyUrl = "https://emphasized-bony-reminder.glitch.me/execute";

    try {
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: code, language: language, versionIndex: "0" }),
      });

      const result = await response.json();
      console.log(result);
      const isCorrect = checkSolution(result.output, selectedProblem.type);

      outputBox.textContent = isCorrect
        ? "🎉 Correct Solution!"
        : `❌ Incorrect Solution. Output:\n${result.output}`;
    } catch (error) {
      console.error(error);
      outputBox.textContent = "❌ Error communicating with the server.";
    }
  });

  // Verificar solución
  function checkSolution(output, type) {
    if (type === "queue") return output.includes("queue");
    if (type === "stack") return output.includes("stack");
    return false;
  }
});


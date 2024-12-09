const problems = {
  1: { title: "Queue Problem 1", description: "Implement a queue using two stacks.", type: "queue" },
  2: { title: "Queue Problem 2", description: "Reverse the order of elements in a queue.", type: "queue" },
  3: { title: "Stack Problem 1", description: "Implement a stack using a single queue.", type: "stack" },
  4: { title: "Stack Problem 2", description: "Check if an expression has balanced parentheses.", type: "stack" },
};

let selectedProblem = null;
const rankingList = document.getElementById("ranking-list");

// Mostrar formulario cuando se selecciona un problema
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", (e) => {
    const problemId = e.target.dataset.problem;
    if (problems[problemId]) {
      selectedProblem = problems[problemId];
      document.getElementById("problem-description").innerText = selectedProblem.description;
      document.getElementById("problem-title").innerText = selectedProblem.title;
      document.getElementById("solution-form").classList.remove("hidden");
    }
  });
});

// Enviar solución
document.getElementById("submit-solution").addEventListener("click", async () => {
  const code = document.getElementById("code-input").value;
  const username = document.getElementById("username").value;
  const language = document.getElementById("language-select").value;

  if (!code || !username) {
    alert("Please enter both your code and your name.");
    return;
  }

  // Claves seguras desde entorno (usa variables en producción)
  const clientId = "b35a6bc22535adfda5f6b1803c2d1e37";
  const clientSecret = "e1c1d98d4371e750287bacb6655237a227c22c9ef3b6fc893957a3d4d817ae7e";

  const requestData = {
    script: code,
    language: language,
    versionIndex: "0",
    clientId: clientId,
    clientSecret: clientSecret,
  };

  try {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (response.ok && checkSolution(result.output)) {
      addToRanking(username, selectedProblem.title, language);
      alert("Congratulations! Your solution is correct.");
    } else {
      alert("Solution is incorrect. Output:\n" + result.output);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while executing your code.");
  }
});

// Verificar la salida (básica)
function checkSolution(output) {
  if (selectedProblem.type === "queue") {
    return output.includes("queue");
  } else if (selectedProblem.type === "stack") {
    return output.includes("stack");
  }
  return false;
}

// Agregar usuario al ranking
function addToRanking(username, problem, language) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${rankingList.children.length + 1}</td>
    <td>${username}</td>
    <td>${problem}</td>
    <td>${language}</td>
  `;
  rankingList.appendChild(row);
}

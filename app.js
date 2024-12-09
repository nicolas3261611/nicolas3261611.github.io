
const problems = {
  1: { title: "Queue Problem 1", description: "Implement a queue using two stacks.", type: "queue" },
  2: { title: "Queue Problem 2", description: "Reverse the order of elements in a queue.", type: "queue" },
  3: { title: "Stack Problem 1", description: "Implement a stack using a single queue.", type: "stack" },
  4: { title: "Stack Problem 2", description: "Check if a string has balanced parentheses.", type: "stack" },
};

let selectedProblem = null;
const outputBox = document.getElementById("output");

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

document.getElementById("submit-solution").addEventListener("click", async () => {
  const code = document.getElementById("code-input").value;
  const username = document.getElementById("username").value;
  const language = document.getElementById("language-select").value;

  if (!code || !username || !selectedProblem) {
    alert("Please fill all the fields and select a problem.");
    return;
  }

  const proxyUrl = "https://emphasized-bony-reminder.glitch.me/execute"; // Correct Proxy URL

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script: code, language: language, versionIndex: "0" }),
    });

    const result = await response.json();
    const isCorrect = checkSolution(result.output, selectedProblem.type);
    outputBox.textContent = isCorrect
      ? "🎉 Correct Solution!"
      : `❌ Incorrect Solution. Output:
${result.output}`;
  } catch (error) {
    console.error(error);
    outputBox.textContent = "❌ Error communicating with the server.";
  }
});

function checkSolution(output, type) {
  if (type === "queue") return output.includes("queue");
  if (type === "stack") return output.includes("stack");
  return false;
}

const proxyUrl = "https://glitch.com/~emphasized-bony-reminder";

document.getElementById("submit-solution").addEventListener("click", async () => {
  const code = document.getElementById("code-input").value;
  const username = document.getElementById("username").value;
  const language = document.getElementById("language-select").value;

  if (!code || !username) {
    alert("Please enter your code and name.");
    return;
  }

  const requestData = {
    script: code,
    language: language,
    versionIndex: "0",
  };

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    document.getElementById("output").textContent = result.output || "No output returned.";
  } catch (error) {
    console.error(error);
    document.getElementById("output").textContent = "Error executing code.";
  }
});

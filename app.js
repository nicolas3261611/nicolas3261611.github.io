
  // Verifica si se encontró el problema
  if (!problem) {
    alert("Invalid problem selected!");
    return;
  }

  const code = document.getElementById("code-input").value;
  const language = document.getElementById("language-select").value;

  if (!code) {
    alert("Please write some code!");
    return;
  }

  try {
    // Llama a la API de Vercel
    const response = await fetch("https://<tu-proyecto>.vercel.app/api/executeCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language,
        versionIndex: "0", // Ajusta según la versión que quieras
      }),
    });

    const result = await response.json();

    // Verifica si la ejecución fue exitosa
    if (response.ok) {
      document.getElementById("output").textContent = result.output;
    } else {
      document.getElementById("output").textContent = `Error: ${result.error}`;
    }
  } catch (err) {
    console.error("Error al conectar con la API:", err);
    document.getElementById("output").textContent = "Error al ejecutar el código.";
  }
});

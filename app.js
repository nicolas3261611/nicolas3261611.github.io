const problems = {
    1: {
        title: "Queue Problem 1",
        description: "Implement a queue using two stacks.",
        type: "queue",
        testCases: [
            { input: "ENQUEUE 1\nENQUEUE 2\nDEQUEUE", expected: "1" },
            { input: "ENQUEUE 3\nDEQUEUE\nENQUEUE 4\nDEQUEUE", expected: "3\n4" },
        ],
    },
    2: {
        title: "Queue Problem 2",
        description: "Reverse the order of elements in a queue.",
        type: "queue",
        testCases: [
            { input: "1 2 3 4\nREVERSE", expected: "4 3 2 1" },
            { input: "10 20 30\nREVERSE", expected: "30 20 10" },
        ],
    },
    3: {
        title: "Stack Problem 1",
        description: "Implement a stack using a single queue.",
        type: "stack",
        testCases: [
            { input: "PUSH 5\nPUSH 10\nPOP\nPUSH 15\nPOP", expected: "10\n15" },
            { input: "PUSH 7\nPOP\nPUSH 8\nPOP", expected: "7\n8" },
        ],
    },
    4: {
        title: "Stack Problem 2",
        description: "Check if an expression has balanced parentheses.",
        type: "stack",
        testCases: [
            { input: "({[]})", expected: "Balanced" },
            { input: "({[})", expected: "Unbalanced" },
        ],
    },
};

// Verificar la salida para un problema
function checkSolution(output, problemId) {
    const problem = problems[problemId];
    const testCases = problem.testCases;

    // Dividir la salida en líneas para comparación más precisa
    const outputLines = output.trim().split("\n");

    for (let i = 0; i < testCases.length; i++) {
        const expectedOutput = testCases[i].expected.trim().split("\n");
        if (outputLines.join("\n") !== expectedOutput.join("\n")) {
            return false; // Si alguna salida no coincide
        }
    }

    return true; // Todas las salidas coinciden
}

// Enviar solución
document.getElementById("submit-solution").addEventListener("click", async () => {
    const code = document.getElementById("code").value;
    const username = document.getElementById("username").value;
    const language = document.getElementById("language").value;

    if (!code || !username) {
        alert("Please enter both your code and your name.");
        return;
    }

    const clientId = "b35a6bc22535adfda5f6b1803c2d1e37"; // Reemplaza con tus credenciales
    const clientSecret = "e1c1d98d4371e750287bacb6655237a227c22c9ef3b6fc893957a3d4d817ae7e"; // Reemplaza con tus credenciales

    const problemId = Object.keys(problems).find(
        key => problems[key].title === document.getElementById("problem-title").innerText
    );

    const problem = problems[problemId];
    const testCases = problem.testCases;

    for (const testCase of testCases) {
        const requestData = {
            script: code,
            language: language,
            versionIndex: "0",
            stdin: testCase.input,
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

            if (!result.output) {
                alert("Error: No output returned from your code.");
                return;
            }

            // Verificar la salida
            if (!checkSolution(result.output, problemId)) {
                alert("Solution is incorrect for one or more test cases.");
                return;
            }
        } catch (error) {
            console.error("Error executing code:", error);
            alert("An error occurred while executing your code.");
            return;
        }
    }

    // Si todos los casos pasan, añadir al ranking
    addToRanking(username, problem.title, language);
    alert("Congratulations! All test cases passed.");
});

// Agregar al ranking
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

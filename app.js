document.addEventListener("DOMContentLoaded", () => {
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

    const clientId = "b35a6bc22535adfda5f6b1803c2d1e37";
    const clientSecret = "e1c1d98d4371e750287bacb6655237a227c22c9ef3b6fc893957a3d4d817ae7e";

    const problemButtons = document.querySelectorAll(".problem-btn");
    const solutionForm = document.getElementById("solution-form");
    const problemTitle = document.getElementById("problem-title");
    const problemDescription = document.getElementById("problem-description");
    const rankingList = document.getElementById("ranking-list");

    let currentProblem = null;

    problemButtons.forEach(button => {
        button.addEventListener("click", event => {
            const problemId = parseInt(event.target.getAttribute("data-problem"));
            currentProblem = problems.find(p => p.id === problemId);
            if (currentProblem) {
                problemTitle.innerText = currentProblem.title;
                problemDescription.innerText = currentProblem.description;
                solutionForm.classList.remove("hidden");
            }
        });
    });

    document.getElementById("submit-solution").addEventListener("click", async () => {
        const code = document.getElementById("code").value;
        const username = document.getElementById("username").value;
        const language = document.getElementById("language").value;

        if (!code || !username || !currentProblem) {
            alert("Please ensure you selected a problem, entered your name, and provided a solution.");
            return;
        }

        const requestData = {
            script: code,
            language: language,
            stdin: currentProblem.input,
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

            if (!result.output) {
                alert("Error: No output returned from your code.");
                return;
            }

            const userOutput = result.output.trim();
            if (userOutput === currentProblem.expectedOutput) {
                addToRanking(username, currentProblem.title, language);
                alert("Congratulations! Your solution is correct.");
            } else {
                alert(`Incorrect solution.\nExpected: ${currentProblem.expectedOutput}\nReceived: ${userOutput}`);
            }
        } catch (error) {
            console.error("Error executing code:", error);
            alert("An error occurred while executing your code. Please check your solution.");
        }
    });

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
});

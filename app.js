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

    document.getElementById("submit-solution").addEventListener("click", () => {
        const code = document.getElementById("code").value;
        const username = document.getElementById("username").value;
        const language = document.getElementById("language").value;

        if (!code || !username) {
            alert("Please enter both your code and your name.");
            return;
        }

        if (!currentProblem) {
            alert("No problem selected.");
            return;
        }

        try {
            const userOutput = eval(code)(JSON.parse(currentProblem.input));
            if (JSON.stringify(userOutput) === currentProblem.expectedOutput) {
                addToRanking(username, currentProblem.title, language);
                alert("Congratulations! Your solution is correct.");
            } else {
                alert(`Incorrect solution.\nExpected: ${currentProblem.expectedOutput}\nReceived: ${JSON.stringify(userOutput)}`);
            }
        } catch (error) {
            console.error("Error executing user code:", error);
            alert("An error occurred while evaluating your solution. Please check your code.");
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

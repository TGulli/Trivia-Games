//fetches the question from opendb APi amount is equal to 10,meaning 10 questions
export function fetchQuestions() {
    return fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
}
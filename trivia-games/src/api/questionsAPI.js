export function fetchQuestions() {
    return fetch("https://opentdb.com/api.php?amount=10")
        .then(response => response.json())
}
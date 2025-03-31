// Example: A simple JavaScript to handle form validation or interactivity
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('habit-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            // Prevent default form submission for custom validation
            const userInput = form.querySelector('input[name="user"]').value;
            const habitName = form.querySelector('input[name="habitName"]').value;

            if (!userInput || !habitName) {
                event.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    }
});

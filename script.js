document.addEventListener('DOMContentLoaded', () => {
    // Fetch activities and populate the kingdom-activities section
    fetch('activities.json')
        .then(response => response.json())
        .then(data => {
            const activities = data.activities;
            const flexContainer = document.querySelector('#kingdom-activities .flex-container');
            flexContainer.innerHTML = ''; // Clear existing content

            activities.forEach(activity => {
                const activityElement = document.createElement('p');
                activityElement.classList.add('kingdom-activity');
                activityElement.innerHTML = `
                    <span class="activity">${activity.name}
                        <span class="activity-tooltip"> Description: ${activity.description}</span>
                    </span>
                `;
                flexContainer.appendChild(activityElement);
            });
        })
        .catch(error => console.error('Error loading activities:', error));

    // Dark mode toggle functionality
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const nav = document.querySelector('nav');
    const activities = document.querySelectorAll('.activity');
    const tooltips = document.querySelectorAll('.activity-tooltip');

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        nav.classList.toggle('light-mode');
        activities.forEach(activity => activity.classList.toggle('light-mode'));
        tooltips.forEach(tooltip => tooltip.classList.toggle('light-mode'));
    });
});
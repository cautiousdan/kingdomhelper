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
                const descriptionWithLineBreaks = activity.description.replace(/\n/g, '<br>');
                activityElement.innerHTML = `
                    <span class="activity">${activity.name}
                        <span class="activity-tooltip"> Description: ${descriptionWithLineBreaks}</span>
                    </span>
                `;
                flexContainer.appendChild(activityElement);
            });

            // Select activities and tooltips after they are created
            const activityElements = document.querySelectorAll('.activity');
            const tooltipElements = document.querySelectorAll('.activity-tooltip');

            // Dark mode toggle functionality
            const toggleButton = document.getElementById('dark-mode-toggle');
            const body = document.body;
            const nav = document.querySelector('nav');

            toggleButton.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                nav.classList.toggle('light-mode');
                activityElements.forEach(activity => activity.classList.toggle('light-mode'));
                tooltipElements.forEach(tooltip => tooltip.classList.toggle('light-mode'));
            });

            // Add popup text to kingdom-turn-steps
            const turnSteps = document.querySelectorAll('.turn-step');
            turnSteps.forEach(step => {
                const stepData = data.turnSteps.find(item => item.id === step.dataset.step);
                if (stepData) {
                    const tooltip = document.createElement('span');
                    tooltip.classList.add('activity-tooltip');
                    const stepDescriptionWithLineBreaks = stepData.description.replace(/\n/g, '<br>');
                    tooltip.innerHTML = ` Description: ${stepDescriptionWithLineBreaks}`;
                    step.style.position = 'relative'; // Ensure the tooltip is positioned correctly
                    step.appendChild(tooltip);
                }
            });
        })
        .catch(error => console.error('Error loading activities:', error));
});
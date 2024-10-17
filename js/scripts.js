   
   
   document.addEventListener("DOMContentLoaded", function() {
    // Toggle modal visibility when clicking on the "Edit" button
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", function() {
            const componentId = this.getAttribute("data-component-id");
            const modal = document.getElementById("modal-" + componentId);
            modal.style.display = "block";
        });
    });

    // Close the modal when clicking on the close button
    document.querySelectorAll(".close-modal").forEach(closeBtn => {
        closeBtn.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal-id");
            const modal = document.getElementById("modal-" + modalId);
            modal.style.display = "none";
        });
    });

    // Swap component when selecting a new one from the list
    document.querySelectorAll(".select-component").forEach(button => {
        button.addEventListener("click", function() {
            const newComponentId = this.getAttribute("data-component-id");
            const parentComponentId = this.getAttribute("current-component-id");

            swapComponent(parentComponentId, newComponentId);
        });
    });
});

function swapComponent(currentComponentId, newComponentId) {
    // Send an AJAX request to swap the component
    const request = new Request('/ajax/swap-component', {
        method: 'POST',
        body: JSON.stringify({
            current_component_id: currentComponentId,
            new_component_id: newComponentId
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': drupalSettings.ajaxPageState.token // Ensure to send a CSRF token
        }
    })
    fetch(request)
        .then(response => response.json())
        .then(data => {
            // Replace the component content with the new one
            const componentContainer = document.getElementById(`component-container-${currentComponentId}`);
            const componentContent = componentContainer.querySelector('.component-content');
            componentContent.innerHTML = data.newComponentHTML;

            // Hide the modal after swapping
            const modal = document.getElementById(`modal-${currentComponentId}`);
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error swapping component:', error);
        })
    }

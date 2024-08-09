// Variable to keep track of the next candidate number
let candidateNumber = 0;

// Function to initialize counters and remove button functionality for all cards
function initialiseCounters() {
    // Get all counter containers
    const counterContainers = document.querySelectorAll('.counter-container');

    counterContainers.forEach(container => {
        // Get the elements within the specific container
        const decrementButton = container.querySelector('.decrement');
        const incrementButton = container.querySelector('.increment');
        const counterValue = container.querySelector('.counter-value');

        // Initialize the counter value
        let counter = parseInt(counterValue.textContent, 10);

        // Function to update the displayed counter value
        function updateCounter() {
            counterValue.textContent = counter;
        }

        // Event listener for the decrement button
        decrementButton.addEventListener('click', function() {
            if (counter > 0) {
                counter--;
                updateCounter();
            }
        });

        // Event listener for the increment button
        incrementButton.addEventListener('click', function() {
            counter++;
            updateCounter();
        });
    });

    // Add functionality to remove buttons
    const removeButtons = document.querySelectorAll('.btn-outline-danger');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.card');
            const candidateName = card.querySelector('.candidate-name').textContent;
            const votes = card.querySelector('.counter-value').textContent;
            
            const confirmRemoval = confirm(`Are you sure you want to remove this candidate's data?\n\nCandidate Name: ${candidateName}\nNo. of Votes: ${votes}`);

            if (confirmRemoval) {
                card.remove();
                updateCandidateHeaders();
            }
        });
    });

    // Add functionality to edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            handleEditSave(button);
        });

        const card = button.closest('.card');
        const nameInput = card.querySelector('.candidate-input');
        
        // Add event listener to save on Enter key press
        nameInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                handleEditSave(button);
            }
        });
    });
}

// Function to handle both the button click and Enter key press
function handleEditSave(button) {
    const card = button.closest('.card');
    const nameSpan = card.querySelector('.candidate-name');
    const nameInput = card.querySelector('.candidate-input');

    if (button.classList.contains('editing')) {
        // Save the edited name
        nameSpan.textContent = nameInput.value;
        nameInput.classList.add('d-none');
        nameSpan.classList.remove('d-none');
        // Change button to edit state
        button.innerHTML = `
            <button type="button" class="btn btn-light pb-3 edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </button>
        `;
        button.classList.remove('editing');
    } else {
        // Switch to edit mode
        nameInput.classList.remove('d-none');
        nameSpan.classList.add('d-none');
        nameInput.focus();
        // Change button to save state
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>
        `;
        button.classList.add('editing');
    }
}

// Function to add a new card dynamically
function addCard() {
    const cardContainer = document.getElementById('card-container');
    
    candidateNumber++; // Increment candidate number for new card
    
    const newCard = document.createElement('div');
    newCard.className = "card text-bg-light mb-3 mx-auto";
    newCard.style.maxWidth = "20rem";
    
    newCard.innerHTML = `
    <div class="card-header">Candidate ${candidateNumber}</div>
    <div class="card-body">
        <h5 class="card-title mb-4 mt-2 text-center fs-2 d-flex align-items-center justify-content-center">
            <span class="candidate-name text-truncate me-2">Candidate ${candidateNumber}</span>
            <input type="text" class="candidate-input form-control d-none me-2" value="Candidate ${candidateNumber}" />
            
            <button type="button" class="btn btn-light pb-3 edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </button>
        </h5>

        <div class="row justify-content-md-center counter-container">
            <div class="col-sm-auto">
                <button type="button" class="increment btn btn-success">+</button>
            </div>
            <div class="col-sm-auto">
                <h3 class="counter-value mx-3">0</h3>
            </div>
            <div class="col-sm-auto">
                <button type="button" class="decrement btn btn-danger">-</button>
            </div>
        </div>

        <div class="row w-75 mt-4 mb-2 mx-auto">
            <button type="button" class="btn btn-outline-danger">Remove Candidate</button>
        </div>
    </div>
    `;

    cardContainer.appendChild(newCard);
    
    // Reinitialize counters and remove button functionality for the new card
    initialiseCounters();
}

// Function to update candidate headers
function updateCandidateHeaders() {
    const cards = document.querySelectorAll('.card');
    candidateNumber = 0; // Reset candidate number

    cards.forEach(card => {
        candidateNumber++; // Increment candidate number
        const header = card.querySelector('.card-header');
        const title = card.querySelector('.candidate-name');
        header.textContent = `Candidate ${candidateNumber}`;
        title.textContent = `Candidate ${candidateNumber}`;
    });
}

function initialiseNullVotesCounter() {
    const incrementButton = document.getElementById('increment-null-votes');
    const decrementButton = document.getElementById('decrement-null-votes');
    const counterValue = document.getElementById('null-votes-counter');

    let counter = parseInt(counterValue.textContent, 10);

    function updateCounter() {
        counterValue.textContent = counter;
    }

    incrementButton.addEventListener('click', function() {
        counter++;
        updateCounter();
    });

    decrementButton.addEventListener('click', function() {
        if (counter > 0) {
            counter--;
            updateCounter();
        }
    });
}

initialiseNullVotesCounter();

// Add event listener to the "Add Card" button
document.getElementById('add-card').addEventListener('click', addCard);

// Initialize counters and remove button functionality for existing cards on page load
document.addEventListener('DOMContentLoaded', initialiseCounters);
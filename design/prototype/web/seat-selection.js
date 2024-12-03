// Select all available seats
const seats = document.querySelectorAll('.seat.available');
const confirmButton = document.querySelector('.confirm-btn');

let selectedSeat = null;

// Handle seat click
seats.forEach(seat => {
  seat.addEventListener('click', () => {
    // Deselect previously selected seat
    if (selectedSeat) {
      selectedSeat.classList.remove('selected');
    }

    // Select new seat
    seat.classList.add('selected');
    selectedSeat = seat;
  });
});

// Confirm button handler
confirmButton.addEventListener('click', () => {
  if (!selectedSeat) {
   
    alert('Please select a seat before confirming!');
  }
});

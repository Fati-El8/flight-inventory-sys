// Handle payment form submission
const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form refresh

  const cardNumber = document.getElementById('card-number').value;
  const cardHolder = document.getElementById('card-holder').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  const email = document.getElementById('email').value;

  if (cardNumber && cardHolder && expiryDate && cvv && email) {
    alert('Payment successful! Your trip is booked.'); // Simulate payment success
    // Redirect to a confirmation page (optional)
    // window.location.href = "confirmation.html";
  } else {
    alert('Please fill out all required fields.');
  }
});

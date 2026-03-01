function handleContact(e) {
  // Prevent the page from reloading when the form is submitted
  e.preventDefault();
  
  // Get values from the input fields and remove extra spaces
  let name = document.getElementById("cname").value.trim();
  let email = document.getElementById("cemail").value.trim();
  let msg = document.getElementById("cmsg").value.trim();
  let status = document.getElementById("contactMsg");

  // Check if any field is empty
  if (!name || !email || !msg) {
    status.style.color = "red";
    status.innerText = "Please fill out all fields.";
    return;
  }

  // If validation passes, show success message
  status.style.color = "green";
  status.innerText = "Thank you! Your inquiry has been submitted.";
  
  // Clear the form fields automatically
  document.getElementById("contactForm").reset();
}

const issuedList = document.getElementById("issuedContainer");

function renderIssuedBooks() {
  if (!issuedList) return;
  const loggedInUser = localStorage.getItem("libUser");
  
  if (!loggedInUser) {
    issuedList.innerHTML = "<p style='text-align:center;'>Please <a href='login.html'>login</a> to view your issued books.</p>";
    return;
  }

  let issuedRecords = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  // Only show books issued by the currently logged-in user
  let myBooks = issuedRecords.filter(record => record.user === loggedInUser);

  issuedList.innerHTML = "";

  if (myBooks.length === 0) {
    issuedList.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>You have no issued books at the moment.</p>";
    return;
  }

  myBooks.forEach(record => {
    let bookDetails = libraryBooks.find(b => b.id === record.bookId);
    if(bookDetails) {
      issuedList.innerHTML += `
        <div class="card">
          <img src="${bookDetails.img}" alt="${bookDetails.title}">
          <h3>${bookDetails.title}</h3>
          <p><strong>Author:</strong> ${bookDetails.author}</p>
          <p style="color:var(--secondary); font-weight:bold; margin-top:10px;">Issued On: ${record.date}</p>
          <button class="btn-return" onclick="returnBook(${record.bookId})" style="margin-top:15px;">Return Book</button>
        </div>
      `;
    }
  });
}

function returnBook(bookId) {
  let issuedRecords = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  // Remove the specific book record
  let updatedRecords = issuedRecords.filter(record => record.bookId !== bookId);
  
  localStorage.setItem("issuedBooks", JSON.stringify(updatedRecords));
  alert("Book returned successfully!");
  renderIssuedBooks(); // Refresh UI
}

if(issuedList) renderIssuedBooks();

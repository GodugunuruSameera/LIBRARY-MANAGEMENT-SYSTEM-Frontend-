const bookList = document.getElementById("bookList");

function displayBooks(booksToRender) {
  if (!bookList) return;
  bookList.innerHTML = "";
  
  if(booksToRender.length === 0) {
    bookList.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>No books found.</p>";
    return;
  }

  // Get currently issued books to check availability status
  let issuedRecords = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  const loggedInUser = localStorage.getItem("libUser");

  booksToRender.forEach(book => {
    // Check if THIS book is currently issued by ANYONE
    let isIssued = issuedRecords.some(record => record.bookId === book.id);
    
    let statusClass = isIssued ? "status-issued" : "status-available";
    let statusText = isIssued ? "Currently Issued" : "Available";

    bookList.innerHTML += `
      <div class="card">
        <img src="${book.img}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <span class="status-badge ${statusClass}">${statusText}</span>
        <button onclick="issueBook(${book.id})" ${isIssued ? "disabled" : ""}>
          ${isIssued ? "Not Available" : "Issue Book"}
        </button>
      </div>
    `;
  });
}

function filterBooks() {
  let searchVal = document.getElementById("searchBox").value.toLowerCase();
  let categoryVal = document.getElementById("categoryFilter").value;

  let filtered = libraryBooks.filter(b => {
    let matchesSearch = b.title.toLowerCase().includes(searchVal) || b.author.toLowerCase().includes(searchVal);
    let matchesCategory = categoryVal === "" || b.category === categoryVal;
    return matchesSearch && matchesCategory;
  });

  displayBooks(filtered);
}

function issueBook(bookId) {
  const loggedInUser = localStorage.getItem("libUser");
  if (!loggedInUser) {
    alert("Please log in to issue books.");
    window.location.href = "login.html";
    return;
  }

  let issuedRecords = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  
  // Check if user already has 3 books (optional rule, makes it look professional)
  let userBooks = issuedRecords.filter(r => r.user === loggedInUser);
  if (userBooks.length >= 3) {
    alert("You have reached the maximum limit of 3 issued books. Please return a book first.");
    return;
  }

  let issueDate = new Date().toLocaleDateString();
  
  issuedRecords.push({
    bookId: bookId,
    user: loggedInUser,
    date: issueDate
  });

  localStorage.setItem("issuedBooks", JSON.stringify(issuedRecords));
  alert("Book issued successfully!");
  filterBooks(); // Refresh UI
}

if(bookList) displayBooks(libraryBooks);

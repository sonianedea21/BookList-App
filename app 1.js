// Book Class: Represents a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class: Handle UI Tasks
class UI {
	static displayBooks() {
		
		
		/* 
		dummy books if we do not have storage
		const StoredBooks = [
		{
			title: 'Book One',
			author: 'John Doe',
			isbn: '123424547'
		},
		{
			title: 'Book Two',
			author: 'Jane Doe',
			isbn: '123422347'
		}
		]; 
		
		*/
		
		
		const books = Store.getBooks();
		
		books.forEach((book) => UI.addBookToList(book));
	}
	
	static addBookToList(book) {
		const list = document.querySelector('#book-list');
		
		const row = document.createElement('tr');
		
		
		row.innerHTML= `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>
		`;
		
		list.appendChild(row);
	}
	
	static deleteBook(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	}
	
	
	static showAlert(message, className){
		
		// For new alerts to replace old ones		
		document.querySelector('.hidden').classList.remove('alert', 'alert-danger', 'alert-success', 'alert-info');
		document.querySelector('.hidden').innerHTML = '';
		
		// Add classes to alert div
		var div = document.querySelector('.hidden');
		div.className = `hidden alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
				
		// If you want to vanish alert
		// setTimeout(function(){wipe()}, 3000); 
	}
	
	
	
	 static clearFields () {
		 document.querySelector('#title').value='';
		 document.querySelector('#author').value='';
		 document.querySelector('#isbn').value='';
	 }
}

// Store Class: Handles Storage

class Store {
	static getBooks(){
		let books;
		if(localStorage.getItem('books') === null){
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		
		return books;
	}
	
	static addBook(book){
		const books = Store.getBooks();
		
		books.push(book);
		
		localStorage.setItem('books', JSON.stringify(books));
	}
	
	static removeBook(isbn){
		const books = Store.getBooks();
		
		books.forEach((book, index) => {
			if(book.isbn === isbn){
				books.splice(index, 1);
			}
		});
		
		// Reset local storage with removed book from the function above
		localStorage.setItem('books', JSON.stringify(books));		
	}
}

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();
	
	// Get form values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	
	// Validate
	if(title === '' || author === '' || isbn === ''){
		UI.showAlert('Please fill in all fields', 'danger');
	} else {
	
	// Instantiate book
	const book = new Book(title, author, isbn);
		
	// Add Book to UI
	UI.addBookToList(book);
	
	// Add Book to Store - after removing dummy storage and defining new storage
	Store.addBook(book);
	
	// Show success message
	UI.showAlert('Book Added', 'success');
	
	// Clear fields
	UI.clearFields();
	}
	
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	
	// Remove book from UI
	UI.deleteBook(e.target)
	
	// Remove book from Store: we take the element in which the delete button is, then the tb with parent Element, then the td above with previousElementSibling, then the content to see that it has "isbn" inside; daca sterg previousElementSibling nu se mai sterge din storage si textcontent nu mai apare null 
	
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	
	
	// Show success message
	UI.showAlert('Book Removed', 'info');
});






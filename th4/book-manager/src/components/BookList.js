import React from 'react'; 
 
function BookList({ books, onEdit, onDelete}) { 
  return ( 
    <div> 
      <h2>Danh sách sách</h2> 
      <ul class="list-group list-group-numbered"> 
        {books.map(book => ( 
          <li key={book.id} class="list-group-item"> 
            <strong>{book.title}</strong> - {book.author} ({book.year}) 
            {' '} 
            <button onClick={() => onEdit(book)} class="btn btn-primary disabled" tabindex="-1" role="button" aria-disabled="true">Sửa</button> 
            <button onClick={() => onDelete(book.id)} class="btn btn-secondary disabled" tabindex="-1" role="button" aria-disabled="true">Xóa</button>
          </li> 
          
          
        ))} 
      </ul> 
    </div> 
  ); 
}
 
export default BookList;
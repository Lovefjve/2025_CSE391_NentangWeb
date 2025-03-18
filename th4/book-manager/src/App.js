import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'React Cơ Bản', author: 'Nguyễn Văn A', year: 2023 },
    { id: 2, title: 'JavaScript Nâng Cao', author: 'Trần Thị B', year: 2022 },
  ]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái cho từ khóa tìm kiếm

  // Load từ localStorage khi component mount
  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) {
      setBooks(JSON.parse(stored));
    }
  }, []);

  // Lưu mỗi khi books thay đổi
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Hàm thêm sách
  const handleAddBook = (newBook) => {
    const newBookWithId = { ...newBook, id: Date.now() }; // Generate unique id based on timestamp
    setBooks([...books, newBookWithId]);
  };

  // Hàm cập nhật sách
  const handleUpdateBook = (updatedBook) => {
    const newList = books.map(b => (b.id === updatedBook.id ? updatedBook : b));
    setBooks(newList);
    setEditingBook(null); // Thoát chế độ sửa
  };

  // Hàm xóa sách
  const handleDeleteBook = (id) => {
    const newList = books.filter(b => b.id !== id);
    setBooks(newList);
  };

  // Khi bấm nút "Sửa" trong BookList
  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  // Hàm tìm kiếm sách
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Lọc danh sách sách dựa trên từ khóa tìm kiếm
  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           book.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ margin: '20px' }}>
      <h1>Quản Lý Sách</h1>
      
      
      {/* Form thêm và sửa sách */}
      <BookForm
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editingBook={editingBook}
      />
      
      {/* Tìm kiếm */}
      <form class="d-flex" role="search">
      <input
        type="text"
        placeholder="Tìm kiếm sách theo tiêu đề hoặc tác giả"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
      />
        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
      </form>

      
      {/* Danh sách sách đã lọc */}
      <BookList
        books={filteredBooks}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;

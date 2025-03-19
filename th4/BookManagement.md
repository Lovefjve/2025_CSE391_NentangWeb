
---
## HƯỚNG DẪN LÝ THUYẾT: XÂY DỰNG ỨNG DỤNG QUẢN LÝ SÁCH VỚI REACT

---

### 1. React là gì? Tại sao dùng React?
React là một thư viện JavaScript giúp chúng ta xây dựng giao diện người dùng (UI) một cách nhanh chóng và linh hoạt. Thay vì phải viết HTML rồi dùng JavaScript để cập nhật thủ công, React cho phép chúng ta viết các "component" (mảnh ghép giao diện) và tự động cập nhật giao diện khi dữ liệu thay đổi.

- **Ví dụ đơn giản**: Bạn có một danh sách sách, khi thêm một cuốn sách mới, React sẽ tự động hiển thị cuốn sách đó mà không cần bạn phải reload cả trang.
- **Lợi ích**: Code dễ quản lý, tái sử dụng được, và phù hợp với các ứng dụng lớn.

Trong bài này, chúng ta sẽ dùng React để tạo một ứng dụng "Quản Lý Sách" với các chức năng cơ bản: hiển thị danh sách, thêm, sửa, và xóa sách.

---

### 2. CRUD là gì?
CRUD là viết tắt của 4 thao tác cơ bản mà hầu hết ứng dụng nào cũng cần:
- **Create**: Tạo mới (thêm sách vào danh sách).
- **Read**: Đọc (hiển thị danh sách sách).
- **Update**: Cập nhật (sửa thông tin một cuốn sách).
- **Delete**: Xóa (xóa sách khỏi danh sách).

Ứng dụng "Quản Lý Sách" của chúng ta sẽ thực hiện đầy đủ 4 thao tác này. Đây là nền tảng quan trọng để các bạn làm quen với cách xử lý dữ liệu trong lập trình.

---

### 3. Các khái niệm quan trọng trong React

#### a. Component
Component là những "khối xây dựng" của ứng dụng React. Mỗi component giống như một mảnh ghép nhỏ, ví dụ:
- **BookList**: Hiển thị danh sách sách.
- **BookForm**: Form để thêm hoặc sửa sách.

Các component có thể "gắn" vào nhau để tạo thành giao diện hoàn chỉnh. Trong bài này, chúng ta sẽ tạo 2 component chính là `BookList` và `BookForm`.

#### b. State
State là nơi lưu trữ dữ liệu thay đổi được trong ứng dụng. Ví dụ:
- Danh sách sách (`books`) là một state, vì nó sẽ thay đổi khi bạn thêm, sửa, hoặc xóa sách.
- React dùng hàm `useState` để quản lý state. Khi state thay đổi, React sẽ tự động cập nhật giao diện.

**Ví dụ minh họa**:
```javascript
const [books, setBooks] = useState([]);
// books: dữ liệu hiện tại (mảng sách)
// setBooks: hàm để cập nhật books
```

#### c. Props
Props giống như "hành lý" mà bạn truyền từ component cha sang component con. Ví dụ:
- Trong `App.js`, bạn truyền danh sách sách (`books`) xuống `BookList` qua props để hiển thị.
- Cú pháp: `<BookList books={books} />`.

#### d. useEffect
`useEffect` là một công cụ giúp bạn chạy code khi có điều gì đó thay đổi (ví dụ: khi ứng dụng khởi động hoặc khi state thay đổi). Trong bài này, ta sẽ dùng nó để lưu dữ liệu vào Local Storage.

---

### 4. Quy trình xây dựng ứng dụng Quản Lý Sách

#### Bước 1: Khởi tạo dự án
Chúng ta sẽ dùng công cụ `Create React App` hoặc `Vite` để tạo một dự án React nhanh chóng. Đây là bước "dọn bàn" để bắt đầu viết code:
- Chạy lệnh: `npx create-react-app book-manager` hoặc dùng Vite.
- Sau khi tạo xong, mở trình duyệt (thường là `http://localhost:3000`) để kiểm tra xem dự án có chạy không.

#### Bước 2: Hiển thị danh sách sách
- Tạo một mảng sách mẫu trong `App.js` bằng `useState`.
- Tạo component `BookList` để hiển thị danh sách. Dùng hàm `map` để lặp qua mảng và hiển thị từng cuốn sách.

**Ý tưởng**: State `books` nằm ở `App.js`, sau đó truyền xuống `BookList` qua props.

#### Bước 3: Thêm sách
- Tạo component `BookForm` với các ô nhập liệu (input) cho tiêu đề, tác giả, năm xuất bản.
- Khi nhấn "Thêm", ta lấy dữ liệu từ form, tạo một object sách mới, rồi cập nhật state `books` bằng hàm `setBooks`.

**Mẹo**: Dùng `Date.now()` để tạo ID tạm thời cho mỗi cuốn sách.

#### Bước 4: Sửa sách
- Thêm nút "Sửa" cho mỗi cuốn sách trong `BookList`.
- Khi nhấn "Sửa", ta đưa thông tin sách vào `BookForm` để chỉnh sửa. Sau khi nhấn "Cập nhật", cập nhật lại state `books`.

**Cách làm**: Dùng một state `editingBook` để biết đang sửa sách nào. Nếu `editingBook` có giá trị, form sẽ hiển thị dữ liệu sách để sửa.

#### Bước 5: Xóa sách
- Thêm nút "Xóa" trong `BookList`.
- Khi nhấn "Xóa", ta dùng hàm `filter` để loại bỏ sách có ID tương ứng khỏi mảng `books`.

#### Bước 6 (Tùy chọn): Lưu vào Local Storage
- Local Storage là nơi lưu dữ liệu trên trình duyệt, không mất khi reload trang.
- Dùng `useEffect` để:
  - Load dữ liệu từ Local Storage khi ứng dụng khởi động.
  - Lưu dữ liệu vào Local Storage mỗi khi `books` thay đổi.

---

### 5. Một số mẹo khi làm bài
- **Kiểm tra từng bước**: Sau mỗi bước, chạy thử ứng dụng để xem có lỗi không.
- **Console.log là bạn thân**: Dùng `console.log(books)` để kiểm tra xem dữ liệu có đúng không.
- **Đừng ngại hỏi**: Nếu không hiểu chỗ nào, cứ hỏi giảng viên hoặc bạn bè nhé!

---

### 6. Ứng dụng này có thể cải tiến thế nào?
Sau khi hoàn thành, các bạn có thể thử:
- Thêm ô tìm kiếm để lọc sách.
- Làm giao diện đẹp hơn bằng CSS hoặc thư viện như Bootstrap.
- Kết nối với API giả (json-server) để mô phỏng ứng dụng thực tế.

---


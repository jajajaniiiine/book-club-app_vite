import axios from "axios";

async function getAllBooks() {
  return await axios
    .get(`${import.meta.env.VITE_LOCALHOST_API}/books`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function getBookById(id) {
  return await axios
    .get(`${import.meta.env.VITE_LOCALHOST_API}/books/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function addBook(values) {
  return await axios
    .post(`${import.meta.env.VITE_LOCALHOST_API}/books/add`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function updateBook(bookId, values) {
  return await axios
    .patch(
      `${import.meta.env.VITE_LOCALHOST_API}/books/${bookId}`,
      values
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

async function deleteBook(bookId) {
  return await axios
    .delete(`${import.meta.env.VITE_LOCALHOST_API}/books/delete/${bookId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

const BookApi = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};

export default BookApi;

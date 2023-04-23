import axios from "../custom-axios/axios";

const LibraryService = {
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchBookCategories: () => {
        return axios.get("/books/categories");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put(`/books/update/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    reserveBookCopies: (id, requestedCopies) => {
        return axios.get(`/books/reserve/${id}`, {
            params: {
                requestedCopies: requestedCopies
            }
        });
    },
    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/create", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    }
}

export default LibraryService;
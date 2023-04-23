import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import LibraryService from "../../repository/libraryRepository";
import Books from "../Books/BookList/books";
import Header from "../Head/header";
import BookEdit from "../Books/BookEdit/bookEdit";
import BookAdd from "../Books/BookAdd/bookAdd";
import Categories from "../Categories/categories";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            bookCategories: [],
            books: [],
            selectedBook: {},
            isLoading: true
        };
    }

    renderBookEdit() {
        console.log(this.state.selectedBook.id);
        if (!this.state.isLoading) {
            return <BookEdit
                authors={this.state.authors}
                categories={this.state.bookCategories}
                book={this.state.selectedBook}
                onEditBook={this.editBook}
            />;
        }
        return null;
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Route path={["/", "/books"]} exact
                               render={() => <Books books={this.state.books}
                                                    onDelete={this.deleteBook}
                                                    onEdit={this.getBook}
                                                    onReserveBookCopies={this.reserveBookCopies}/>}/>
                        <Route path={"/books/categories"} exact
                               render={() => <Categories bookCategories={this.state.bookCategories}/>}/>
                        <Route path={"/books/add"} exact
                               render={() => <BookAdd authors={this.state.authors}
                                                      categories={this.state.bookCategories}
                                                      onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact
                               render={() => this.renderBookEdit()}/>
                        <Redirect to={"/"}/>
                    </div>
                </main>
            </Router>
        );
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                });
            });
    }

    loadBookCategories = () => {
        LibraryService.fetchBookCategories()
            .then((data) => {
                this.setState({
                    bookCategories: data.data
                });
            });
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            });
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    reserveBookCopies = (id, requestedCopies) => {
        LibraryService.reserveBookCopies(id, requestedCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        this.setState({
            isLoading: true
        });

        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data,
                    isLoading: false
                });
            });
    }


    editBook = (id, name, category, authorId, availableCopies) => {
        LibraryService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, category, authorId, availableCopies) => {
        LibraryService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    componentDidMount() {
        this.loadAuthors();
        this.loadBookCategories();
        this.loadBooks();
    }
}

export default App;

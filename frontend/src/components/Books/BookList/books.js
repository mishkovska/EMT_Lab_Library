import React, {Component} from "react";
import BookTerm from "../BookTerm/bookTerm";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    getBooksOnPage = (start, end) => {
        return this.props.books.map((term) =>
            <BookTerm term={term}
                      onDelete={this.props.onDelete}
                      onEdit={this.props.onEdit}
                      onReserveBookCopies={this.props.onReserveBookCopies}/>
        ).filter((book, index) => index >= start && index < end);
    }

    handlePageChange = (data) => {
        this.setState({
            page: data.selected
        });
    }


    render() {
        const start = this.state.page * this.state.size;
        const end = start + this.state.size;
        const books = this.getBooksOnPage(start, end);
        const totalPageCount = Math.ceil(this.props.books.length / this.state.size);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Available Copies</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>
                    </div>
                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add A New Book</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               breakLabel={<a href={"/#"}>...</a>}
                               breakClassName={"break-me"}
                               pageClassName={"ml-1"}
                               pageCount={totalPageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={3}
                               onPageChange={this.handlePageChange}
                               containerClassName={"pagination m-4 justify-content-center"}
                               activeClassName={"active"}
                />
            </div>
        );
    }
}

export default Books;
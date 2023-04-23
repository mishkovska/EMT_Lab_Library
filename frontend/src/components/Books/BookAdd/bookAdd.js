import React from "react";
import {useHistory} from "react-router-dom";

const BookAdd = (props) => {
    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: undefined,
        category: undefined,
        authorId: undefined,
        availableCopies: undefined
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
        console.log(formData);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onAddBook(formData.name, formData.category, formData.authorId, formData.availableCopies);
        history.push("/books");

    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book Name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Book Category</label>
                        <select id="category" name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) => {
                                return <option value={term}>{term}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <select id="author" name="authorId" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                    return <option value={term.id}>{term.name}&nbsp;&nbsp;{term.surname}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               required
                               placeholder="Enter number of available copies"
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BookAdd;
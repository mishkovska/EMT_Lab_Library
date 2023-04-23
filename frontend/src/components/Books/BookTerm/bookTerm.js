import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.author.name}&nbsp;&nbsp;&nbsp;{props.term.author.surname}</td>
            <td>{props.term.category}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <Link className={"btn btn-danger"}
                      onClick={() => props.onDelete(props.term.id)}
                      to={"/"}>
                    Delete
                </Link>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <Link className={"btn btn-success"}
                      onClick={() => props.onReserveBookCopies(props.term.id, 1)}
                      to={"/"}>
                    Mark As Taken
                </Link>
            </td>
        </tr>
    );
}

export default bookTerm;
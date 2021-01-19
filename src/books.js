import React, { Fragment } from 'react'
import './App.css'


const Books  = ({books, loading, currentPage, booksPerPage, isSelected}) => {
    if(loading){
        return <h2>...loading</h2>;
    }

    //create tablebody
    const tableBody = (book, index) => {
        var rating_int = Math.floor(book.average_rating);
        var rating = [];
        for(let i = 0; i < rating_int; i++){
            rating.push(i);
        }
        const ind = ((currentPage * booksPerPage) + index) - booksPerPage;
        return (
        <tr key={book.bookID}>
                <th scope="row">{ind + 1}</th>
                <td>{book.bookID}</td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td colSpan="2">
                <Fragment>
                {rating.map(function(rate, index){
                    return <i className="fa fa-star checked" key={index}></i>;
                })}
                </Fragment>
                </td>
                <td>{book.isbn}</td>
                <td>{book.price}</td>
                <td>
                    <input type="checkbox" onClick={(e) => isSelected(e, book.bookID)}></input>
                </td>
        </tr>
        )
    }
    return (
        <div>
        <table className="table">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">bookID</th>
            <th scope="col">Title</th>
            <th scope="col">Authors</th>
            <th scope="col" colSpan="2">Rating</th>
            <th scope="col">ISBN</th>
            <th scope="col">Price</th>
            <th scope="col">Cart</th>
            </tr>
        </thead>
        <tbody>
            {books.map( (book, index) => {
                return(
                tableBody(book, index)
                )
            })}
        </tbody>
         </table>
        </div>
    )
}

export default Books
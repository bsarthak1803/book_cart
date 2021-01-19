import {React, useEffect, useState} from 'react'
import './App.css'
import Books from './books'
import Pagination from './pagination'

function App(){
    const [books, setBooks] = useState([])
    const [loading , setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [cart, setCart] = useState([]);

    // const [booksPerPage, setBooksPerPage] = useState(300)
    const booksPerPage = 10

    useEffect ( () => {
        const fetchBooks = async () =>{
            setLoading(true);
            const res = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json')
            var data = await res.json();
            setLoading(false);
            //sort the books in alphabetical order by title
            data = data.sort(function(a,b){
              //convert the title to string to avoid any issues
              var x = String(a.title).toLowerCase();
              var y = String(b.title).toLowerCase();
              if(x > y){
                return 1;
              }
              if(x < y){
                return -1;
              }
              return 0;
            });
            setBooks(data);
            setFilteredBooks(data);
        }

        //call the function, the call should be within useEffect
        fetchBooks()
    }, [])

    //set current page
    const paginate = (page_number) => {
        let number  = parseInt(page_number);
        setCurrentPage(number);
    }

    //add books to cart
    const isSelected = (e, id) => {

      //set cart with selected books
      if(e.target.checked === true){
        var row = {
          book_id : id,
          is_checked : e.target.checked
      }
      cart.push(row);
      setCart(cart);
      }
      else{
        var cart_dup = [{}];
        cart_dup = cart.filter( (book) => book.book_id !== id);
        setCart(cart_dup);
      }
    }

    //filter books acc to search item
    const filterBooks = (e) => {
      let val = e.target.value;
      var filtered_books = [];
      filtered_books = books.filter((book) =>  {
        //check if the val is present as a substr of book.title
        return ( String(book.title).toLowerCase().indexOf(val.toLowerCase()) !== -1 )
       });
      //if the seearch item is empty
      if (val === ''){
         setFilteredBooks(books);
       }
       else{
        setFilteredBooks(filtered_books);
       }
    }

    //display cart as alert
    const onShowCart = (e) => {
      if (cart.length > 0){
      alert("Book_ids in the Cart are " + cart.map( (book) => {
        return book.book_id
      }));
    }
    else{
      alert("There are no books in the Cart");
    }
    }

    //calculate first index, last index and current books
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

    return (
        <div className = 'container mt-5'>
            <span><input type="text" className="mb-4" style={{marginLeft:"40%"}} placeholder="Search" onChange={(e) => filterBooks(e)}></input>
            <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <p style={{marginLeft:"39%"}}>*Select books to add to Cart</p>
            <Books books={currentBooks} loading={loading} currentPage = {currentPage} booksPerPage = {booksPerPage} isSelected = {isSelected}/>
            <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate}/>
            <button type="button" style={{marginLeft:"43%"}} className="btn btn-primary mt-4" onClick={(e) => onShowCart(e)}>Checkout</button>
        </div>
    )
}

export default App
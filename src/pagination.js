import React from 'react'

function Pagination({ booksPerPage, totalBooks, paginate}){

    //increment the anchor numbers
    const onNext = (e) => {
        let page_3 = parseInt(document.getElementById("page3").innerText);
        if (page_3 <= Math.ceil( totalBooks/booksPerPage )){
            page_3 = page_3 + 1;
        }
        document.getElementById("page1").innerText = page_3 - 2;
        document.getElementById("page2").innerText = page_3 - 1;
        document.getElementById("page3").innerText = page_3;
    }

    //decrement the anchor numbers
    const onPrevious = (e) => {
        let page_1 = parseInt(document.getElementById("page1").innerText);
        if (page_1 > 1 ){
            page_1 = page_1 - 1;
        }
        document.getElementById("page1").innerText = page_1;
        document.getElementById("page2").innerText = page_1 + 1;
        document.getElementById("page3").innerText = page_1 + 2;
    }

    return (
        <nav>
            <ul className="pagination" style={{marginLeft:"39%"}}>
                <li className="page-item">
                <a className="page-link" href="!#" aria-label="Previous" onClick={(e) => onPrevious(e)}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
                </li>
                <li className="page-item"><a id="page1" className="page-link" href="!#" onClick={(e) => paginate(e.target.innerText)}>1</a></li>
                <li className="page-item"><a id="page2" className="page-link" href="!#" onClick={(e) => paginate(e.target.innerText)}>2</a></li>
                <li className="page-item"><a id="page3" className="page-link" href="!#" onClick={(e) => paginate(e.target.innerText)}>3</a></li>
                <li className="page-item">
                <a className="page-link" href="!#" onClick={(e) => onNext(e)} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
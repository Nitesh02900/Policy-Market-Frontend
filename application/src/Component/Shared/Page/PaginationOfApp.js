import React from 'react'
import Pagination from 'react-bootstrap/Pagination';


const PaginationOfApp = ({numberOfPages,getFunction,pageNumber, setPageNumber}) => {

    let items = [];
    for (let number = 0; number < numberOfPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === pageNumber}  onClick={(e) =>{
            setPageNumber(number)
            getFunction()
            }
        }>

          {number+1}
        </Pagination.Item>
      );
     
    }

    const handleNextClick = () => {
      if (pageNumber < numberOfPages) {
        setPageNumber(pageNumber + 1);
        // getFunction();
      }
    };
  
    const handlePreviousClick = () => {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
        // getFunction();
      }
    }

  return (
    <>
    <div>
        <Pagination > 
          <Pagination.Prev onClick={handlePreviousClick} disabled={pageNumber === 1} />
          {items}
          <Pagination.Next onClick={handleNextClick} disabled={pageNumber === numberOfPages} />
        </Pagination>
    </div>
    </>
  )
}

export default PaginationOfApp

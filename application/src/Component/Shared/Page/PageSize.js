import React from 'react'



const PageSize = ({ pageSize,setPageSize, setNumberOfPages,totalNumberOfRecords}) => {

  return (
   <>
     <div style ={{"margin-top": "2rem"}}>
        <div className=" s-blur1" style={{ background: "#ABF1FF94" }}></div>
            <select className="form-select" aria-label="Default select example"  onChange={
                    (e) => {
                        setPageSize(e.target.value)
                        setNumberOfPages(Math.ceil(totalNumberOfRecords/ e.target.value))
                    }
            }>
                <option selected >Page Size</option>
                <option value="1" selected={1==pageSize}>1</option>
                <option value="2" selected={2==pageSize}>2</option>
                <option value="3" selected={3==pageSize}>3</option>
            </select>
        <div className=" s-blur2" style={{ background: "#ABF1FF94" }}></div>
     </div>
        
    
    
   </>
  )
}

export default PageSize

// import React, {useState, useEffect} from 'react'
// import { FindAllQuery } from '../../../Service/QueryService'
// import { SaveQueryAnswer } from '../../../Service/QueryService'
// import { useNavigate } from 'react-router-dom';
// import './Query.css'

// const Query = () => {
//   const [data,setData] =useState([])
//   const [answers, setAnswers] = useState({});
//   const navigate = new useNavigate();


//   const getAllQuery = async() =>{
//     try{
     
//       let response = await  FindAllQuery()
//       console.log(response)
//       if(response)
//       {
//         setData(response.data)
//       }
//     }
//     catch(error)
//     {
//       console.log(error)
//       alert(error)
//     }
//   }
//   useEffect(()=>{
//     getAllQuery()  
//   },[])

//   const handleAnswerChange = async(questionId, event) => {
//   try{
//       const newAnswers = { ...answers, [questionId]: event.target.value };
//       setAnswers(newAnswers);

//         let response =await  SaveQueryAnswer(questionId, answers)
//         console.log(response)
        
//     }
//     catch(error)
//     {
//       console.log(error)
//       alert(error)
//     }
//   };
   
//   return (
//     <>
        
//         <div className='query-box'>
//         <div className='title-card'>
//           <h1 className='query-title'>Questions</h1>
//         </div>
//         <div className='question-container'>
//           {data.content &&
//             data.content.map((item) => (
//               <div key={item.id} className='question'>
//                 <p>
//                   <b>Question:</b>&nbsp;{item.question}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 </p>
//                 <label>
//                   <b>Answer:</b>&nbsp;
//                   <input
//                     className='answer-input'
//                     type='text'
//                     value={answers[item.id] || ''}
//                     onChange={(e) => handleAnswerChange(item.id, e)}
//                   />
//                 </label>
//                 <button className='submit-button' onClick={(e) => handleAnswerChange(item.id, e)}>
//                   Submit Answer
//                 </button>
//                 <hr style={{ margin: '.2rem' }} />
//               </div>
//             ))}
//         </div>
//         <button className='goBack-button' onClick={() => navigate(-1)}>
//           Go Back
//         </button>
//       </div>

    
    
//     </>
//   )
// }

// export default Query
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FindAllQuery, SaveQueryAnswer } from '../../../Service/QueryService';
import { useNavigate } from 'react-router-dom';
import './Query.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Query = () => {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const getAllQuery = async () => {
    try {
      const response = await FindAllQuery();
      console.log("find all query", response);

      if (response && response.data) {
        const newData = Array.isArray(response.data)
          ? response.data
          : response.data.content;
        setData(newData);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching queries');
    }
  };

  useEffect(() => {
    getAllQuery();
  }, []);

  const handleAnswerChange = (event) => {
    const newAnswers = { ...answers, [selectedQuery.id]: event.target.value };
    setAnswers(newAnswers);
  };

  // const handleAnswerSubmit = async () => {
  //   try {
  //     const response = await SaveQueryAnswer(
  //       selectedQuery.id,
  //       answers[selectedQuery.id]
  //     );
  //     console.log('save querydata', response);

  //     // Fetch the latest status from the backend
  //     await getAllQuery();

  //     setModalIsOpen(false);
  //     setSelectedQuery(null);
  //   } catch (error) {
  //     console.error(error);
  //     alert('Error submitting answer');
  //   }
  // };

  const handleAnswerSubmit = async () => {
    try {
      
      if (!answers[selectedQuery.id] || answers[selectedQuery.id].trim() === '') {
        
        toast.error('Answer cannot be empty. Please provide an answer.');
        return;
      }
      const response = await SaveQueryAnswer(selectedQuery.id, answers[selectedQuery.id]);
      console.log('save query data', response);
      if (response && response.status === 201) {
       
        toast.success('Query submitted successfully!');
       
        await getAllQuery();
        setModalIsOpen(false);
        setSelectedQuery(null);
        setAnswers({});
      } else {
        
        toast.error('Error submitting answer. Please try again.');
      }
    } catch (error) {
      
      console.error(error);
      toast.error('Error submitting answer. Please try again.');
    }
  };

  const openAnswerModal = (query) => {
    setModalIsOpen(true);
    setSelectedQuery(query);
    setAnswers({ [query.id]: '' });
  };

  const closeAnswerModal = () => {
    setModalIsOpen(false);
    setSelectedQuery(null);
  };

  return (
    <>
      <div className="query-box">
        <div className="title-card text-center">
          <h1 className="query-title">Queries</h1>
        </div>
        <table className="query-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Question</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName+" "+item.lastName}</td>
                  <td>{item.question}</td>

                  <td>
                    <button
                      className="action-button"
                      onClick={() => openAnswerModal(item)}
                      disabled={item.status === 'Answered'}
                    >
                      Answer
                    </button>
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        
        <button
          className="btn btn-primary goBack-button" onClick={() => navigate(-1)}
        
          style={{
          width: '6rem',
          height: '2.5rem',
          padding: '2px',
          backgroundColor: 'rgb(34, 52, 100)',
          border:'none',
          marginLeft: '81%',
          // marginTop:'1rem',
          color: 'white',
          }}
      >
          Go Back
      </button>
                        
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeAnswerModal}
        contentLabel="Answer Modal"
      >
        <div className="form-card  ">
       
          <h2>Question:</h2>
          <p>{selectedQuery?.question}</p>
 
          <label>
            <b>Answer:</b>
            <textarea
              className="answer-input"
              value={answers[selectedQuery?.id] || ''}
              onChange={handleAnswerChange}
              rows={6} // Adjust the number of rows as needed
            />
          </label>

          <button className="submit-button" onClick={handleAnswerSubmit}>
            Submit Answer
          </button>
          {/* <button className="goBack-button" onClick={() => navigate(-1)}>
          Go Back
        </button> */}
        </div>
      </Modal>
      <ToastContainer position="top-center" autoClose={3000} />


    </>
  );
};

export default Query;
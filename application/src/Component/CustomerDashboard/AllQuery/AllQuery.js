
import React, { useState, useEffect } from 'react';
import { GetAllQuery } from '../../../Service/QueryService';
import { useLocation } from 'react-router-dom';
import "./AllQuery.css"
import { useNavigate } from 'react-router-dom';



const AllQuery = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const navigate = new useNavigate();


  const receivedData = location.state || {};

  const getAllQuery = async () => {
    try {
      console.log(receivedData.username);
      let response = await GetAllQuery(receivedData.username);
      console.log(response);
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getAllQuery();
  }, []);

  const parseAnswer = (answer) => {
    try {
      const parsedAnswer = JSON.parse(answer);
      return parsedAnswer.answer;
    } catch (error) {
      console.error('Error parsing answer:', error);
      return 'Invalid answer format';
    }
  };
  

  return (
    <>
      <div className='query-box'>
        <div className='query-title text-center' >
          <h1>Questions and Answers</h1>
        </div>

        <table className='query-table'>
          <thead >
            <tr style={{background:"gb(34, 52, 100)"}}>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.content &&
              data.content.map((item) => (
                <tr key={item.id}>
                  <td>{item.question}</td>
                  {/* <td>{item.answer ? JSON.parse(item.answer).answer : 'Not answered yet'}</td> */}
                  <td>
                  {item.answer ? (
                    parseAnswer(item.answer)
                  ) : (
                    'Not answered yet'
                  )}
                </td>

                </tr>
              ))}
          </tbody>
        </table>
        <button
                onClick={() => navigate(-1)}
                style={{
                width: '5rem',
                height: '2.5rem',
                padding: '2px',
                backgroundColor: 'rgb(34, 52, 100)',
                border:'none',
                marginLeft: '82.5%',
                color: 'white',
                }}
            >
                Go Back
      </button>
      </div>
      
    </>
  );
};

export default AllQuery;
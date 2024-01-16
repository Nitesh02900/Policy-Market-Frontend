import axios from "axios";
export const getAllAgent = async(pageNumber, pageSize)=>{
    try{
         let response = await axios.get('http://localhost:8080/insuranceapp/agents',{
           params:{
             pagesize: pageSize,
             pagenumber: pageNumber
         }
           
         })
         console.log('Geting data:', response);
         return response;
       
   }
   catch (error){
     throw error
   }
}
export const addAgent = async(firstname,lastname,username,password,email,totalCommission,mobileNumber,dateOfBirth)=>{

  let response = await axios.post('http://localhost:8080/insuranceapp/agent',{
     
  

      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      emailId: email,
      totalCommission: totalCommission,
      mobileNumber:mobileNumber,
      dateOfBirth: dateOfBirth,
     
  }
  )
  console.log('Data saved successfully:', response.data);
  return response;
}
export const getAgentByUserName =async(username)=>{
  let response = await axios.get('http://localhost:8080/insuranceapp/agent',{
      params:{
        username:username
      }
      
        
      })
      console.log('Geting data:', response);
      return response;
}

export const updateAgentDetails = async (username, dataForUpdate, authToken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/insuranceapp/updateagent/${username}`,
      {
        firstname: dataForUpdate.firstName,
        lastname: dataForUpdate.lastName,
        emailId: dataForUpdate.email,
      }
      // {
      //   headers: {
      //     Authorization: Bearer ${authToken},
      //     'Content-Type': 'application/json',
      //   },
      // }
    );
    console.log('Agent details updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating agent details:', error);
    throw error;
  }
};
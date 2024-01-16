import axios from "axios";
export const addEmployee = async(firstname,lastname,username,password,email,salary,mobileNumber,dateOfBirth)=>{

    let response = await axios.post('http://localhost:8080/insuranceapp/employee',{
       
    

        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        emailId: email,
        salary: salary,
        mobileNumber:mobileNumber,
        dateOfBirth: dateOfBirth,
       
    }
    )
    console.log('Data saved successfully:', response.data);
    return response;
  }


  export const getAllEmployee = async(pageNumber, pageSize)=>{
    try{
         let response = await axios.get('http://localhost:8080/insuranceapp/employees',{
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

 export const getEmployeeByUserName =async(username)=>{
  let response = await axios.get('http://localhost:8080/insuranceapp/employee',{
      params:{
        username:username
      }
      // headers :{
      //     Authorization: 'Bearer '+localStorage.getItem('authentication')
      //   }
        
      })
      console.log('Geting data:', response);
      return response;
}

export const updateEmployeeActive = async(username,status) => {
  try{ 
      let response = await axios.put(`http://localhost:8080/insuranceapp/employee/${username}/${status}`)
     
      console.log('Data saved successfully:', response.data)
      return response
  }
  catch (error) {
    throw error
  }

}

export const updatePassword = async (username,  newPassword) => {
  try {
    const response = await axios.put(`http://localhost:8080/insuranceapp/updatepassword/${username}`, {
     
      newPassword,
    });
    console.log('Password updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const updateEmployeeDetails = async (username, dataForUpdate, authToken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/insuranceapp/updateemployee/${username}`,
      {
        firstname: dataForUpdate.firstName,
        lastname: dataForUpdate.lastName,
        emailId: dataForUpdate.email,
      }
      
    );
    console.log('Employee details updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating Employee details:', error);
    throw error;
  }
};
import axios from "axios";
export const getAdminByUserName =async(username)=>{
    let response = await axios.get('http://localhost:8080/insuranceapp/admin',{
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
export const updateAdminDetails = async (username, dataForUpdate, authToken) => {
  try {
    const response = await axios.put(`http://localhost:8080/insuranceapp/updateadmin/${username}`,
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
    console.log('Admin details updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating admin details:', error);
    throw error;
  }
};
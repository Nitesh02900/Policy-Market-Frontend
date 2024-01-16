import axios from "axios";

export const getAllPlans = async(pageNumber, pageSize)=>{
    try{
         let response = await axios.get('http://localhost:8080/insuranceapp/plans',{
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

 export const addPlan = async(planName, planDetails)=>{
  try{
      let response = await axios.post('http://localhost:8080/insuranceapp/insuranceplan',{
            planName:planName,
            planDetails:planDetails,
            active:true
        },{
        })
        console.log('Data saved successfully:', response.data);
        return response;
    }
    catch (error){
        throw error
    }
  }

  export const updatePlanActive = async(planId,status) => {
 
    try{ 
        let response = await axios.put(`http://localhost:8080/insuranceapp/plan/${planId}/${status}`)
       
        console.log('Data saved successfully:', response.data)
        return response
    }
    catch (error) {
      throw error
    }
  
  }
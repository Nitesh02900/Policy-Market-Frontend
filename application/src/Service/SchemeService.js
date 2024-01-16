import axios from "axios"

export const getSchemeDetails= async (schemeId) => {
    try{
      console.log("schemeId---->",schemeId)
      let response = await axios.get('http://localhost:8080/insuranceapp/insuranceScheme',{
        params:{
            schemeId:schemeId
        }
      })
      console.log(response)
      return response
  
    }
    catch (error){
        throw error
    }
  }

  export const getAllSchemes = async(pageNumber, pageSize,planId)=>{
    try{
         let response = await axios.get('http://localhost:8080/insuranceapp/planschemes',{
           params:{
             pagesize: pageSize,
             pagenumber: pageNumber,
             planId:planId
         }
           
         })
         console.log('Geting data:', response);
         return response;
       
   }
   catch (error){
     throw error
   }
 }

 export const addScheme = async(planId,  schemeName, minAmount, maxAmount, minAge,maxAge,minTime,maxTime,profitRatio,totalCommission)=>{
  try{
      let response = await axios.post('http://localhost:8080/insuranceapp/insurancescheme',{
           schemeName:schemeName,
           minAmount:minAmount,
           maxAmount:maxAmount,
           minAge:minAge,
           maxAge:maxAge,
           minTime:minTime,
           maxTime:maxTime,
           profitRatio:profitRatio,
           totalCommission:totalCommission
           
        },
        {
          params:{
           planId:planId
          }
        }
        )
        console.log('Data saved successfully:', response.data);
        return response;
    }
    catch (error){
        throw error
    }
  }


  export const updateSchemeActive = async(schemeId,status) => {
 
    try{ 
        let response = await axios.put(`http://localhost:8080/insuranceapp/scheme/${schemeId}/${status}`)
      
        console.log('Data saved successfully:', response.data)
        return response
    }
    catch (error) {
      throw error
    }
  
  }
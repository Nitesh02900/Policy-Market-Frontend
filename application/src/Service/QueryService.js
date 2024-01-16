import axios from "axios"

export const addQuery = async(query,username)=>{
    console.log(username)
    try{
    let response = await axios.post('http://localhost:8080/insuranceapp/query',{
          question:query
      },{
        params:{
            username:username
        }
      })
      console.log('Data saved successfully:', response.data);
      return response;
    }
    catch (error){
      throw error
    }
  }

  export const GetAllQuery = async(username)=>{
    console.log(username)
    try{
    let response = await axios.get('http://localhost:8080/insuranceapp/query',{
        params:{
            username:username
        }
      })
      console.log('Getting data', response.data);
      return response;
    }
    catch (error){
      throw error
    }
  }

  export const FindAllQuery = async()=>{
    
    try{
        let response = await axios.get('http://localhost:8080/insuranceapp/querys',)
        console.log('Getting data', response.data);
        return response;
    }
    catch (error){
      throw error
    }
  }

  export const SaveQueryAnswer = async(questionId, answer) => {
    try{ 
        let response = await axios.put('http://localhost:8080/insuranceapp/query',{
            answer:answer
        },
        {
          params:{
            id:questionId
          },
          
        })
        console.log(response)
        console.log('Data saved successfully:', response.data)
        return response
      }
      catch (error){
        throw error
      }
  }




  
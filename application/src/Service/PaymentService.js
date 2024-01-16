import axios from "axios";



export const  addPayment= async(installmentNo,amount,policyNumber,cardNumber,nameOnCard) => {
    try{ 
        let response = await axios.post(`http://localhost:8080/insuranceapp/payment/${policyNumber}`,{
            installmentNo:installmentNo,
            amount:amount,
            cardNumber:cardNumber,
            nameOnCard:nameOnCard
        }
        )
        console.log('Data saved successfully:', response.data)
        return response
    }
    catch (error) {
      throw error
    }
  
  }

  export const getAllPayment = async()=>{
    try{
         let response = await axios.get('http://localhost:8080/insuranceapp/payments')
         console.log('Geting data:', response);
         return response;
       
   }
   catch (error){
     throw error
   }
 }
  
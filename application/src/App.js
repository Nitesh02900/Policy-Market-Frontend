import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/FrontPage/Home/Home';
import Admin from './Component/AdminDashboard/Admin/Admin'
import Agent from './Component/AgentDashboard/Agent/Agent';
import Employee from './Component/EmployeeDashboard/Employee/Employee';
import Customer from './Component/CustomerDashboard/Customer/Customer';
import SchemeHome from './Component/Scheme/SchemeHome'
import AddPolicy from './Component/CustomerDashboard/AddPolicy/AddPolicy'
import GetCustomer from './Component/Shared/AllCustomer/GetCustomer';
import GetEmployee from './Component/Shared/AllEmployee/GetEmployee';
import MyProfile from './Component/CustomerDashboard/MyProfile/MyProfile'
import Plan from './Component/Plans/Plan/Plan';
import GetAgent from './Component/Shared/AllAgent/GetAgent';
import AdminProfile from './Component/AdminDashboard/MyProfile/AdminProfile';
import AdminPlan from './Component/AdminDashboard/AdminPlan/AdminPlan';
import AdminScheme from "./Component/AdminDashboard/Scheme/AdminScheme"
import EmployeeProfile from "./Component/EmployeeDashboard/MyProfile/EmployeeProfile"
import EmployeePlan from './Component/EmployeeDashboard/EmployeePlan/EmployeePlan';
import EmployeeScheme from "./Component/EmployeeDashboard/EmployeeScheme/EmployeeScheme"
import AllQuery from './Component/CustomerDashboard/AllQuery/AllQuery';

// import AgentPlan from './Component/AgentDashboard/AgentPlan/AgentPlan';
// import AgentScheme from './Component/AgentDashboard/AgentScheme/AgentScheme'
import Query from './Component/EmployeeDashboard/Query/Query';
import Policy from './Component/EmployeeDashboard/Policy/Policy'
import CustomerPolicy from './Component/CustomerDashboard/Policy/CustomerPolicy';
import ViewCustomer from './Component/EmployeeDashboard/View Customer/ViewCustomer';
import AdminPolicy from './Component/AdminDashboard/AdminPolicy/AdminPolicy';
import Payment from './Component/CustomerDashboard/Payment/Payment';
import AgentPolicy from './Component/AgentDashboard/AgentPolicy/AgentPolicy'
import AgentViewCustomer from './Component/AgentDashboard/AgentViewCustomer/AgentViewCustomer';
import Viewpolicy from './Component/AgentDashboard/ViewPolicy/Viewpolicy';
import Installment from './Component/AgentDashboard/Installment/Installment';
import AgentProfile from './Component/AgentDashboard/MyProfile/AgentProfile'

function App() {
  return (
    <>
    
     <Routes>
        <Route exact path='/' element ={<Home/>}/>
        <Route path="/insurance-plan" element={<SchemeHome/>} />
        <Route exact path='/adminDashboard' element={<Admin/>} />
        <Route exact path='/adminDashboard/viewCustomer' element={<GetCustomer/>} />
        <Route exact path='/adminDashboard/viewEmployee' element={<GetEmployee/>} />
        <Route exact path='/adminDashboard/viewAgent' element={<GetAgent/>} />
        <Route exact path='/adminDashboard/profile' element={<AdminProfile/>} />
        <Route exact path='/adminDashboard/scheme' element={<AdminScheme/>} />
        <Route exact path='/adminDashboard/policy' element={<AdminPolicy/>} />
        

        <Route exact path='/plan' element={<Plan/>} /> //plan for the customer and agent
        <Route exact path='/plandetails' element={<AdminPlan/>} />  //plan for the admim plan

       
        <Route exact path='/customerDashboard' element={<Customer/>} />
        <Route exact path='/customerDashboard/policy' element={<AddPolicy/>} />
        <Route exact path='/customerDashboard/profile' element={<MyProfile/>} />
        <Route exact path='/customerDashboard/query' element={<AllQuery/>} />
        <Route exact path='/customerDashboard/PolicyDetails' element={<CustomerPolicy/>} />
        <Route exact path='/customerDashboard/payment' element={<Payment/>} />
       

       <Route exact path='/agentDashboard' element={<Agent/>} />
       {/* <Route exact path='/agentDashboard/plandetails' element={<AgentPlan/>} /> */}
       {/* <Route exact path='/agentDashboard/scheme' element={<AgentScheme/>} /> */}
       <Route exact path='/agentDashboard/Policy' element={<AgentPolicy/>} />
       <Route exact path='/agentDashboard/viewCustomer' element={<AgentViewCustomer/>} />
       <Route exact path='/agentDashboard/viewPolicy' element={<Viewpolicy/>} />
       <Route exact path='/agentDashboard/installment' element={<Installment/>} />
       <Route exact path='/agentDashboard/profile' element={<AgentProfile/>} />
       


        <Route exact path='/employeeDashboard' element={<Employee/>} />
        <Route exact path='/employeeDashboard/viewCustomer' element={<ViewCustomer/>} />
        <Route exact path='/employeeDashboard/viewAgent' element={<GetAgent/>} />
        <Route exact path='/employeeDashboard/profile' element={<EmployeeProfile/>} />
        <Route exact path='/employeeDashboard/plandetails' element={<EmployeePlan/>} />
        <Route exact path='/employeeDashboard/scheme' element={<EmployeeScheme/>} />
        <Route exact path='/employeeDashboard/query' element={<Query/>} />
        <Route exact path='/employeeDashboard/policy' element={<Policy/>} />
        

      </Routes>
    </>
  );
}

export default App;

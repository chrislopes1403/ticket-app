import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SideBar from '../sidebarComponents/SideBar';
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css';
import { library } from '@fortawesome/fontawesome-svg-core'
  import { fas } from '@fortawesome/free-solid-svg-icons'
  import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
  import userPremissions from '../helperFunctions/userPremissions_func'



  library.add(fas,faTicketAlt)
const Dashboard = (props) => {
   


//----------------------------------------------------------------------
const [premissions,setPremissions]= useState(null)  

const[pagenumber,setPageNumber] = useState(0)
const[ticID,setTicID] = useState(0)

//---------------------------------------------------------------

useEffect(() => {
  setPremissions(userPremissions())
},[]);

const handlePage=(page)=>
{
setPageNumber(page)
}

const handleAllTicketsPage=()=>
{
setPageNumber(6)
}

const handleAllProjectsPage=()=>
{
setPageNumber(7)
}
const handleTicketPage=(id)=>
{
setTicID(id)
setPageNumber(8)
console.log(id)
}



return  ( 
  <div>
  <NavBar/>
  <div className="d-flex" id="wrapper">
    <div className="bg-light border-right" id="sidebar-wrapper">
      <SideBar premissions={premissions} />
    </div>

    <div id="page-content-wrapper">

      <div className="container-fluid">
       
      </div>
    </div>

  </div>
  </div>

  )
}


export default Dashboard;
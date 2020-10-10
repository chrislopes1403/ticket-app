import React, { useState,useEffect } from 'react';
import SideBarLink from './SideBarLink';
import 'bootstrap/dist/css/bootstrap.css';
import userPremissions from '../helperFunctions/userPremissions_func'
const SideBar = (props) => {
 
  

  const [loading,setLoading]= useState(true)
  const [premissions, setPremissions] = useState(null)
    const [sidelinks, setSideLinks] = useState([
     
      {
        id:   0,
        name: 'ManageOverveiw',
        displayLink: true,
        icon:"tasks",
        role:"admin teamleader"
      },
     
      {
        id:   1,
        name: 'MyProjects',
        displayLink: true,
        icon:"bars",
        role:"admin teamleader dev"
      },
      {
        id:   2,
        name: 'MyTickets',
        displayLink: true,
        icon:"ticket-alt",
        role:"admin teamleader dev"

      }, 
      {
        id:   3,
        name: 'MyProfile',
        displayLink: true,
        icon:"user",
        role:"admin teamleader dev"

      }
    ] 
     
    );

    useEffect(() => {
      // handlePremissons()
      //console.log(props.premissions)
      loadPremissons();
     },[]);
   

    const  loadPremissons =async() =>
    {
        var pre = await userPremissions();   
        setPremissions(pre);
        setLoading(false);

    setSideLinks(
      sidelinks.map(item => 
          (item.role.search(pre.userlvl) < 0)
          ? {...item, displayLink : !item.displayLink} 
          : item 
  ))
      
    }

   
  const  handlePremissons =() =>
   {
     console.log(premissions)
     
    setSideLinks(
      sidelinks.map(item => 
          (item.role.search(premissions.username) < 0)
          ? {...item, displayLink : !item.displayLink} 
          : item 
  ))
  
   }
 


  if(loading)
  {
    return <h3>Loading</h3>
  }
  else
  {
  return( <div className="bg-light border-right" id="sidebar-wrapper">
  <div className="list-group list-group-flush">
 <h5 className="ml-3">  Welcome: {premissions.username}!</h5>          
      {
          sidelinks.map((link, i) => {
                if(link.displayLink)
                {
                  return <SideBarLink key={i} {...link}  />
                }
            })
        }
      </div>
  </div>)

 
  }
    
}
 
export default SideBar;

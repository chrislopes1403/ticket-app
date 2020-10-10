import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBarLink = ( props ) => {
  
  return (
    <div>
    <a className="list-group-item list-group-item-action bg-light" onClick={()=>props.handlePage(props.id)}>
    <FontAwesomeIcon className="mr-1" icon={["fas", props.icon]} />
    {props.name}
    </a>
    
    </div>
  )
 };
 
 export default SideBarLink;
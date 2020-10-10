const authenticateUser = async(u,p) => {
    var data=await fetch(`/api/authenticate`,{
    method: 'POST', 
    credentials:'include',
    mode: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify ({ "user": u ,"password": p})
    })
    .then(response=>response.json())
    .then(response=>{return response})

     .catch(err=>{console.log(err)})
     
     
     return data.success
      
}


export default authenticateUser;
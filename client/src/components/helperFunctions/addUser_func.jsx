

const addUser = async(u,p) => {

        var data=await fetch(`/api/addUser`,{
        method: 'POST', 
        credentials:'include',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify ({ "user": u ,"password": p,"lvl":"dev"})
        })
        .then(response=>response.json())

        .then(response=>{return response})

         .catch(err=>{console.log(err)})

          if(data.success===true)
          {
            return true
          }
          else
          {
            return false
          }
          
    }

 
export default addUser;
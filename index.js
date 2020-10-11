const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
var router = express.Router();

const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')
var crypto = require('crypto');

const {MongoClient} = require('mongodb');


const uri = "/*mongo key*/";
app.use(cookieParser('/*cookie key*/'));


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }


  app.post('/api/adduser',  async(req,res)=>{
      
    const user=req.body.user;
    const password = req.body.password;
    const lvl = req.body.lvl;
    console.log(req.body)
    
    bcrypt.hash(password, 10,  async function(err, hash) {

        const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});

        try {
            // Connect to the MongoDB cluster
            await client.connect();
    
            // Make the appropriate DB calls
            await client.db("ticketdatabase").collection("ticketdb").updateOne(
                { title: "Users" },
                {
                $push: {
                        userList:{
                                        $each: [ { 
                                            Username:user,
                                            Password:hash,
                                            Userlvl:lvl,
                                            assignedTicketIDs:[],
                                            assignedProjectIDs:[],
                                            freeUser:true,
                                            sessionID:""
                                        } ]
                                    }
                        }
                }
        );
            

        res.status(200).send({success: true, message: 'mongo success '});

    
        } catch (e) {
            console.error(e);
            res.status(403).send({success: false, message: 'mongo failed'});
        } finally {
            await client.close();
        }

    });

})


app.post('/api/authenticate', async(req,res)=>{
    
    const user=req.body.user;
    const password = req.body.password;
    console.log(user,password)

    const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
    var sesh_id = generate_key();

    try {
        // Connect to the MongoDB cluster
        await client.connect();

       const results=await client.db("ticketdatabase").collection("ticketdb").findOne({ title:"Users"},
       {projection: { "userList.Username":1, "userList.Password":1, _id:0 }});
       
        const Results=await client.db("ticketdatabase").collection("ticketdb").updateOne(
        { "userList.Username": user }, 
        { "$set": { "userList.$.sessionID" : sesh_id } });
    
        console.log(user)
    if(results.userList.some(item=>item.Username===user))
    {
        var obj=results.userList.find(item=>item.Username===user)
        bcrypt.compare(password, obj.Password, function(err, result) {
            if(err)
            {
                return res.send(err);
            }
            else
            {
               if(result)
               {
                console.log("success")
                res.cookie('session_id', sesh_id, {
                    maxAge: 60*10*1000, // 60 secs
                    httpOnly: true,
                    //secure: true, // need https
                    sameSite: true,
                    signed: true,
                  })
                return res.status(200).send({success: true, message: 'passwords  match'});

               }
               else
               {
                console.log("failed")
               return  res.status(401).send({success: false, message: 'passwords do not match'});
               }
            }
        })

    }
    else
    {
        return res.status(401).send({success: false, message: 'mongo success but auth failed '});
    }


    } catch (e) {
        console.error(e);
        res.status(403).send({success: false, message: 'mongo failed'});
    } finally {
        await client.close();
    }



})
function  generate_key() {
    // 16 bytes is likely to be more than enough,
    // but you may tweak it to your needs
    return crypto.randomBytes(16).toString('base64');
};

app.post('/api/authorize', authorize_cookie,async(req,res,next)=>{
   


    const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const results=await client.db("ticketdatabase").collection("ticketdb").findOne({ title:"Users"},
        {projection: { "userList.Username":1, "userList.sessionID":1, "userList.Userlvl":1,_id:0 }});
       
        var obj=results.userList.find(item=>item.sessionID=== req.signedCookies.session_id)
       console.log("obj..."+obj.Username)
    
      return res.status(200).send({success: true, user:obj.Username,userlvl:obj.Userlvl })

    } catch (e) {
        console.error(e);
        res.status(403).send({success: false, message: 'mongo failed'});
    } finally {
        await client.close();
    }
    
})

function authorize_cookie(req,res,next)
{
    if(req.signedCookies.session_id)
    {
        next();
        return;
    }
    else
    {
        res.status(401).send({success: false, message: 'not authorized'})
        return;
    }

    
}

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

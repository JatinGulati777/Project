var express = require('express')
var app = express()
app.use(express.json());

var fs = require('fs');

//to get the data of colleges
let college = require('./data.json');

app.get("/colleges",(req,res)=>{

    res.send(college)
})


//to add new college
app.post("/college",(req,res)=>{
    var fs = require('fs')
    var colleges = require('./data.json')
    var id=Math.floor(Math.random() * 100);

    if(colleges.findIndex(obj => obj.id == id)){
        while(colleges.findIndex(obj => obj.id != id)){
            id=Math.floor(Math.random() * 100);
        }
    }


    
    var name=req.body.name;
    var departments = req.body.departments;
    var address = req.body.address;
    var TotalStudents = req.body.TotalStudents;
    var city = req.body.address.city
    var pinCode = req.body.address.pinCode
    var state = req.body.address.state
    
    var response = {  
        id:id,  
        name:name,  
        departments:departments,
        address:{
            city:city,
            pinCode:pinCode,
            state:state
        },
        TotalStudents:TotalStudents
    }
    if(!name){
        response["name"] = "Chitkara"
    }
    if(!departments){
        response["departments"] = ["a","b","c"]
    }
    if(!address.city){
        response["address"].city = "Rajpura"
    }
    if(!address.pinCode){
        response["address"].pinCode = 134005
    }
    if(!address.state){
        response["address"].state = "Punjab"
    }
    if(!TotalStudents){
        response["TotalStudents"] = 100
    }
    
   
    colleges.push(response);
    var newData2 = JSON.stringify(colleges);
    fs.writeFile("data.json", newData2, (err) => {
        // Error checking
        if (err) res.status(404);
        res.send("new college added").sendFile('post.html')
      });
    
})


//to post the college with 400(bad request/ unfilled form)
// app.post('/college',(req,res)=>{

//     var colleges = require('./data.json')

//     var id = Math.floor(Math.random()*100)
//     if(colleges.findIndex(obj => obj.id == id)){
//         while(colleges.findIndex(obj => obj.id != id)){
//             id=Math.floor(Math.random() * 100);
//         }
//     }

//     var name = req.body.name
//     var departments = req.body.departments
//     var address = req.body.address
//     var TotalStudents = req.body.TotalStudents
//     var city = req.body.address.city
//     var pinCode = req.body.address.pinCode
//     var state = req.body.address.state


//     if(!name || !departments || !address || !TotalStudents){
//         res.status(400).send("don't keep the fields empty")
//         return
//     }
//     else{
//         var response = {  
//             id:id,  
//             name:name,  
//             departments:departments,
//             address:{
//                 city:city,
//                 pinCode:pinCode,
//                 state:state
//             },
//             TotalStudents:TotalStudents
//         }
//         colleges.push(response);
//         var newData2 = JSON.stringify(colleges);
//         fs.writeFile("data.json", newData2, (err) => {
//             // Error checking
//             if (err) res.status(404);
//             res.send("new college added").sendFile('post.html')
//           });

//     }


// })

//to update the college if existing

app.put("/colleges/:id", (req,res)=>{
    var fs = require('fs')
    var colleges = require('./data.json')
    var  id  = req.params.id
    var newID = id.slice(1)
    id = newID
    var name = req.body.name
    var departments = req.body.department
    var address = req.body.address
    var city = req.body.address.city
    var state = req.body.address.state
    var pinCode = req.body.address.pinCode
    var TotalStudents = req.body.TotalStudents



    var clgIdx = colleges.findIndex(obj => obj.id == id)
    console.log(clgIdx)
    if(name)
    colleges[clgIdx].name = name

    if(departments)
    colleges[clgIdx].departments = departments

    if(address){
    if(state)
    colleges[clgIdx].address.state = address.state

    if(city)
    colleges[clgIdx].address.city = address.city

    if(pinCode)
    colleges[clgIdx].address.pinCode = address.pinCode
     }

    if(TotalStudents)
    colleges[clgIdx].TotalStudents = TotalStudents

    



        var newData2 = JSON.stringify(colleges);
        fs.writeFile("data.json", newData2, (err) => {
            // Error checking
            if (err) res.status(404);
          });
    res.status(200).json({success:true,data:colleges})

})


//To delete the existing college
app.delete("/colleges/:id",(req,res) => {
    var fs = require('fs')
    var colleges = require('./data.json')
    // var emptyfl = require('./data2.json')
    var id  = req.params.id
    var newID2 =id.slice(1)
    console.log(newID2)
   
    if(newID2=="all"){
        var emptyfile = fs.readFileSync('./data2.json','utf8')
        fs.writeFile("data.json","[{}]", (err) => {
            // Error checking
            if (err) res.status(404);
            res.send("all colleges deleted")
          });
        return;
    }

    var newID = parseInt(id.slice(1))

    const newColleges = colleges.filter(el => el.id != newID);
    fs.writeFile("data.json", JSON.stringify(newColleges), (err) => {
        // Error checking
        if (err) res.status(404);
        res.send("college deleted")
      });

})

//to get the college of specific id
app.get("/colleges/:id",(req,res)=>{
    var fs = require('fs')
    var colleges = require('./data.json')
    var id  = req.params.id
    var newID = parseInt(id.slice(1))
    
    var clgIdx = colleges.findIndex(obj => obj.id == newID)
    res.send(colleges[clgIdx])

})

app.listen(8000)
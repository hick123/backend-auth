const uuidv4 = require('uuid/v4');
const controller ={};

var jwt = require('jsonwebtoken');
// var jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// login method
controller.login =(request, response)=>{
    var username = request.body.username;
    var password = request.body.password;
    let member_id;
    let sql="SELECT * FROM `members` WHERE username= '" + username + "' OR email = '" + username + "'";
    console.log(sql);
    console.log('',username);
    console.log('',password);
    // console.log('',results);

    conn.query(sql, function(err, results, fields) {
      console.log(results);
      if (results.length > 0){
        console.log('entered if stat..');
        if (results[0].password) {
          bcrypt.compare(request.body.password, results[0].password, function(err, result) {
           console.log('>>>>>> ', password)
           console.log('>>>>>> ', results[0].password)
           if(result) {
            const token= jwt.sign({
              data:results,
             username: request.body.username,
             password: request.body.password
           },
           'secret',
            {
              expiresIn: '2h'
            },
             results
            
            );
            response.send({token});
            
           }
           else {
             return response.status(400).send();
           }
         })
        }
  
      }
      else {
        return response.status(400).send();
      }
     }); 
  };
  // registration
controller.signup =(request, response) => {
    console.log(request.body);
     var ministry=request.body.ministryId.selectedministryIds;
    var username= request.body.registerForm.username;
    // console.log(ministry);
    var password = request.body.registerForm.password;
    var member_id = uuidv4();
    var first_name = request.body.registerForm.first_name;
    var other_names = request.body.registerForm.other_names;
    var email = request.body.registerForm.email;
    var age = request.body.registerForm.age;
    var gender = request.body.registerForm.gender;
    var occupation = request.body.registerForm.occupation;
    var location = request.body.registerForm.location;
    var phone = request.body.registerForm.phone;
    var marital_status = request.body.registerForm.marital_status;
    var members_ministry_id=uuidv4();
    var created_by= 'user';
  
    ministry.forEach((item,member_id) => {
          member_id
      });
      console.log(ministry);
  conn.beginTransaction(function(err) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
  
        let sql ="INSERT INTO `members` ( member_id, username, password, first_name, other_names, email,phone,gender, occupation, location,marital_status, age, created_by) VALUES ('" + member_id + "','" +
        username + "', '" + hash + "', '" + first_name + "', '" + other_names + "', '"  + 
        email + "','" + phone + "', '" + gender + "', '" + occupation + "', '" + location + "','" + marital_status + "','" + 
        age + "', '" + created_by + "')";
        console.log(sql);
        conn.query(sql, (err,results)=>{
          if(err){
            response.send(err)
            // console.log('could not insert details to members',err);
              return conn.rollback(function() {
              throw err;
            });
          }
          console.log(results);
  
  //another insert here
            ministry.forEach(function(element){
              var members_ministry_id=uuidv4();
              let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( '" + members_ministry_id + "','" + element + "','" + member_id + "')";
            conn.query( sql,(err, members_ministry) => {
            if (err) {
              console.log('occured during members_ministry insertion',err);
              response.json(err);
            }
            // next();
            console.log('member inserted into members_ministry successfully');
            // response.send('member inserted into members_ministry successfully');
            console.log(members_ministry);
          });
            });
          conn.commit(function(err) {
            if (err) {
              return conn.rollback(function() {
                throw err;
              });
            }
            console.log(results);
            console.log('success!');
            return response.send(results);
          });
          
        })
      });
    });
    
    });
  
  
  };
  
 //check email if it exists
 controller.checkemail=(request,response)=>{
  let email=request.params.email;
  console.log('email checking', email)

  var sql='SELECT * FROM `members` WHERE email = "' + email + '"';


  conn.query(sql, (err, email) => {
   if (err) {
    response.json(err);
   }
   console.log(email);
   return response.send(email);
 });
  
}
 //check username if it exists
 controller.checkusername=(request,response)=>{
  let username=request.params.username;
  console.log('username checking....', username)

  var sql='SELECT * FROM `members` WHERE username = "' + username + '"';


  conn.query(sql, (err, username) => {
  if (err) {
    response.json(err);
  }
  console.log(username);
  return response.send(username);
});   

}

  module.exports = controller;
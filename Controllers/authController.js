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
    let sql='SELECT * FROM `members` WHERE username= "' + username + '"';
    console.log(sql);
    console.log('',username);
    console.log('',password);
  
     conn.query(sql, function(error, results, fields) {
      console.log(results);
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
            expiresIn: '1hr'
          }          
          );
          response.send({token});
          
         }
         else {
           return response.status(400).send();
         }
       })
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
  
    ministry.forEach((item,member_id) => {
          member_id
      });
      console.log(ministry);
  conn.beginTransaction(function(err) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
  
        let sql ="INSERT INTO `members` ( member_id, username, password, first_name, other_names, email,phone,gender, occupation, location,marital_status, age) VALUES ('" + member_id + "','" +
        username + "', '" + hash + "', '" + first_name + "', '" + other_names + "', '"  + 
        email + "','" + phone + "', '" + gender + "', '" + occupation + "', '" + location + "','" + marital_status + "','" + 
        age + "')";
        console.log(sql);
        conn.query(sql, (err,results)=>{
          if(err){
            response.send(err)
            console.log('could not insert details to members',error);
              return conn.rollback(function() {
              throw error;
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
          // function ministr(member_id, ministry) {
          //     if (ministry.length>0){
          //       for (let i = 0; i < ministry.length; i++) {
          //         let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( uuid(),'" + ministry[i] + "','" + member_id + "')";
          //           conn.query( sql,(err, members_ministry) => {
          //           if (err) {
          //             console.log('occured during members_ministry insertion',err);
          //             response.json(err);
          //           }
          //           console.log('member inserted into members_ministry successfully');
          //           response.send('member inserted into members_ministry successfully');
          //           console.log(members_ministry);
          //         });               
          //       }
  
          //     }
          
          // }
          
            
            // var ministry=request.body.ministryId.selectedministryIds;
            // var arrayLength = ministry.length;
            // for (var i = 0; i < arrayLength; i++) {
            //     console.log(ministry[i]);
            //     let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( '"+ members_ministry_id +"' ,'" + ministry[i] + "','" + member_id + "')";
            //     conn.query( sql,(err, members_ministry) => {
            //     if (err) {
            //       console.log('occured during members_ministry insertion',err);
            //       response.json(err);
            //     }
            //     console.log('member inserted into members_ministry successfully');
            //     // response.send('member inserted into members_ministry successfully');
            //     console.log(members_ministry);
            //   });
            //     //Do something
            // }
  
  
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
  module.exports = controller;
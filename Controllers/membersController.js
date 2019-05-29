const uuidv4 = require('uuid/v4');

var jwt = require('jsonwebtoken');
// var jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const controller = {};

controller.list = (request, response) => {
    conn.query('SELECT * FROM members', (err, members) => {
     if (err) {
      response.json(err);
     }
     console.log(members);
     return response.send(members);
   });
};
controller.newmembers = (request, response) => {
  conn.query('SELECT COUNT(*) FROM members', (err, members) => {
   if (err) {
    response.json(err);
   }
   console.log(members);
   return response.send(members);
 });
};
// get user details after sign in
controller.getLoggedInMemberById= (request,response)=>{
  let memberId= request.body.member_id;
  console.log(memberId);
  let sql='SELECT * FROM `members` WHERE member_id=  "' + memberId + '"';
   conn.query(sql, (err,results)=>{
     if(err){
       response.json(err);
     }
     console.log(results)
     response.send(results);
   });
}
// login method

controller.login =(request, response)=>{
  var username = request.body.username;
  var password = request.body.password;
  let member_id;
  let sql='SELECT * FROM `members` WHERE username= "' + username + '" AND password= "' + password + '"';
  console.log(sql);
  console.log('',username);
  console.log('',password);

if (username && password) {
  conn.query(sql, function(error, results, fields) {
    console.log(results);
    if (results.length > 0) {
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
      
    //   const token = jwt.sign({data: results}, 'shhhhh', {
    //     expiresIn: 4800 // 1 week
    //   });
      response.send({token});
    //   response.json({
    //     success: true,
    //     token: 'JWT '+token,
    //     member: {
    //       member_id: results.member_id,
    //       username: request.body.username,
    //       email: request.body.email
    //     }
    // });
    } else {
              response.send('Incorrect Username and/or Password!');
    }			
    response.end();
  });
}
    else {
      response.send('Please enter Username and Password!');
      response.end();
    }
};
 controller.getmemberDetails=( request,response)=>{
  jwt.verify(token, 'shhhhh', function(err, decoded) {
    console.log(decoded.foo) // bar
  });

 }
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
        //   ministry.forEach(function(element,i){
        //     let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( '"+ members_ministry_id +"' ,'" + element + "','" + member_id + "')";
        //   conn.query( sql,(err, members_ministry) => {
        //   if (err) {
        //     console.log('occured during members_ministry insertion',err);
        //     response.json(err);
        //   }
        //   console.log('member inserted into members_ministry successfully');
        //   response.send('member inserted into members_ministry successfully');
        //   console.log(members_ministry);
        // });
        //   });
          
          var ministry=request.body.ministryId.selectedministryIds;
          var arrayLength = ministry.length;
          for (var i = 0; i < arrayLength; i++) {
              console.log(ministry[i]);
              let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( '"+ members_ministry_id +"' ,'" + ministry[i] + "','" + member_id + "')";
              conn.query( sql,(err, members_ministry) => {
              if (err) {
                console.log('occured during members_ministry insertion',err);
                response.json(err);
              }
              console.log('member inserted into members_ministry successfully');
              // response.send('member inserted into members_ministry successfully');
              console.log(members_ministry);
            });
              //Do something
          }


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

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM member WHERE id = ?', [id], (err, rows) => {
      res.render('members_edit', {
        data: rows[0]
      })
    });
  });
};

controller.getmemberbyid = (request, response) => {
 let memberId = request.params.member_id;
//  let memberId = "ke";
console.log(memberId);

  let sql='SELECT * FROM `members` WHERE member_id = "' + memberId + '"';

  conn.query(sql, (err, members) => {
   if (err) {
    response.json(err);
   }
   console.log(members);
   return response.send(members);
 });
};
controller.update = (req, res) => {
  const { id } = req.params;
  const newMember = req.body;
  conn.query('UPDATE member set ? where id = ?', [newMember, id], (err, rows) => {
    res.redirect('/');
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM member WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
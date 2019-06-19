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
  // let sql='select * from members m inner join members_ministry mm on mm.member_id= m.member_id inner join ministry ms on ms.ministry_id = mm.ministry_id where m.member_id="' + memberId + '"';
  let sql='SELECT * FROM `members` WHERE member_id=  "' + memberId + '"';
   conn.query(sql, (err,results)=>{
     if(err){
       response.json(err);
     }
     console.log(results)
     response.send(results);
   });

}
//get member ministries
controller.getLoggedInMemberByIdMinistries= (request,response)=>{
  let memberId= request.body.member_id;
  console.log(memberId);
  // let sql='select * from members m inner join members_ministry mm on mm.member_id= m.member_id inner join ministry ms on ms.ministry_id = mm.ministry_id where m.member_id="' + memberId + '"';
  let sql='select ministry_name from  ministry ms inner join members_ministry mm on mm.ministry_id = ms.ministry_id inner join members m on m.member_id = mm.member_id where m.member_id= "' + memberId + '"';
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
  console.log('',username);
  console.log('',password)

  let member_id;
  let sql='SELECT * FROM `members` WHERE username= "' + username + '"';
  console.log(sql);
  console.log('',username);
  // console.log('',password);

   conn.query(sql, function(error, results, fields) {
    console.log(results);
    if (!results.length){
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
controller.searchmember=(request,response)=>{
  let username=request.params.username;
  console.log('username checking....', username)

  var sql='SELECT * FROM `members` WHERE username = "' + username + '"';


  conn.query(sql, (err, results) => {
  if (err) {
    response.json(err);
  }
  console.log(results);
  return response.send(results);
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
          return response.sendStatus(200).send('ok')
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
//select member by id
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
//update profile for  members
controller.editprofile=(request,response)=>{
    console.log(request.body);
     var ministry=request.body.ministryId.selectedministryIds;
    var username= request.body.registerForm.username;
    var member_id = request.body.member_id;
    var first_name = request.body.registerForm.first_name;
    var other_names = request.body.registerForm.other_names;
    var email = request.body.registerForm.email;
    var age = request.body.registerForm.age;
    var gender = request.body.registerForm.gender;
    var occupation = request.body.registerForm.occupation;
    var location = request.body.registerForm.location;
    var phone = request.body.registerForm.phone;
    var marital_status = request.body.registerForm.marital_status;

      console.log(ministry);
  conn.beginTransaction(function(err) {
    
    let sql ="UPDATE `members` SET `username`= '" + username + "', `username` ='" + username + "',  first_name= '" + first_name + "', `other_names` = '" + other_names + "', `email`= '" + email + "', `phone`='" + phone + "',`gender`= '" + gender + "', `occupation`='" + occupation + "' , `location`='" + location + "',`marital_status`='" + marital_status + "', `age`='" + age + "' WHERE `member_id` = '" + member_id + "'";
        console.log(sql);
        conn.query(sql, (err,results)=>{
          if(err){
            response.send(err)
            console.log('could not update details',error);
              return conn.rollback(function() {
              throw error;
            });
          }
        //   console.log(results);
        //  ministry.forEach(function(element){
        //       var members_ministry_id=uuidv4();
        //       let sql ="INSERT INTO `members_ministry` ( members_ministry_id, ministry_id, member_id) VALUES ( '" + members_ministry_id + "','" + element + "','" + member_id + "')";
        //     conn.query( sql,(err, members_ministry) => {
        //     if (err) {
        //       console.log('occured during members_ministry update',err);
        //       response.json(err);
        //     }
        //     // next();
        //     console.log('member updated into members_ministry successfully');
        //     console.log(members_ministry);
        //   });
        //     });
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
}
//activate member
controller.activateMember=(request, response)=>{
  let member_number =request.body.member_number;
  let active =1;
  let member_id =request.body.member_id;
  
  let sql="SELECT * FROM `members` WHERE member_number='"+ member_number + "'";

  conn.query(sql, (err, results)=>{
    // Object.keys(req.query).length === 0

    if(err){
      response.json(err);
    }
    console.log(results);
    if(results.length>0){
      return response.send('Member number already taken');      
    }else{
      let sql = 'UPDATE `members` SET `member_number`="'+ member_number +'", `active`="'+active+'" WHERE `member_id`= "'+member_id+'"';
        conn.query(sql, (err, results) => {
          if (err) {
          response.json(err);
          }
          console.log(results);
          return response.send(results);
      });
    }
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
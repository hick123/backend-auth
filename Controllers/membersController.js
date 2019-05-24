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
controller.login =(request, response)=>{
  var username = request.body.username;
  var password = request.body.password;
  let sql='SELECT * FROM `members` WHERE username= "' + username + '" AND password= "' + password + '"';
  console.log(sql);
  console.log('',username);
  console.log('',password);

if (username && password) {
  conn.query(sql, function(error, results, fields) {
    console.log(results);
    if (results.length > 0) {
     const token= jwt.sign({
      username: request.body.username,
      password: request.body.password
    },
    'secret',
     {
       expiresIn: '2h'
     });
      
      // const token = jwt.sign({data: results}, 'shhhhh', {
      //   expiresIn: 4800 // 1 week
      // });
      response.send({token});
    //   response.json({
    //     success: true,
    //     token: 'JWT '+token,
    //     member: {
    //       member_id: request.body.member_id,
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

controller.signup =(request, response) => {
  let username= request.body.username;
  var password = request.body.password;
  var member_id = uuidv4();
  var first_name = request.body.first_name;
  var other_names = request.body.other_names;
  var email = request.body.email;
  var age = request.body.age;
  var gender = request.body.gender;
  var occupation = request.body.occupation;
  var location = request.body.location;
  var phone = request.body.phone;
  var marital_status = request.body.marital_status;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

      var sql ="INSERT INTO `members` ( member_id, username, password, first_name, other_names, email,phone,gender, occupation, location,marital_status, age) VALUES ('" + member_id + "','" +
      username + "', '" + hash + "', '" + first_name + "', '" + other_names + "', '"  + 
      email + "','" + phone + "', '" + gender + "', '" + occupation + "', '" + location + "','" + marital_status + "','" + 
      age + "')";
       conn.query( sql,(err, members) => {
       if (err) {
        console.log('occured during registration',err);
        response.json(err);
       }
       response.send('Registered successfully');
       console.log(members);
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
 var memberId = request.params.member_id;
//  var memberId = "ke";
console.log(memberId);

  var sql='SELECT * FROM `members` WHERE member_id = "' + memberId + '"';

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
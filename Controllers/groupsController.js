const controller ={};
const uuidv4 = require('uuid/v4');
// controller for creating groups
controller.createGroup =(request,response)=>{
    let churchGroupId = uuidv4();
    let group_name= request.body.group_name;

    let sql ="INSERT INTO `churchgroups` ( churchgroups_id, group_name) VALUES ( '"+ churchGroupId +"' ,'" + group_name + "')";
     conn.query( sql,(err, churchgroups) => {
     if (err) {
      console.log('occured during group creation',err);
      response.json(err);
     }
     response.send('Group created successfully');
     console.log(churchgroups);
   });
}

//adding members to selected groups 
controller.addtochurchgroup =(request,response)=>{
  let members_churchgroups_id = uuidv4();
  let churchgroups_id= request.body.churchgroups_id;
  let member_id= request.body.member_id;
  let is_admin= request.body.is_admin;

  console.log('inserting member to group');

  let sql ="INSERT INTO `members_churchgroups` (members_churchgroups_id, member_id, churchgroups_id, is_admin) VALUES ( '"+ members_churchgroups_id +"','" + member_id + "','" + churchgroups_id + "','" + is_admin + "')";
   conn.query( sql,(err, members_churchgroups) => {
   if (err) {
    console.log('occured during group creation',err);
    response.json(err);
   }
   response.send('Add to groups successfully');
   console.log(members_churchgroups);
 });
}

controller.getchurchgroups= (request, response) => {
    conn.query('SELECT * FROM churchgroups', (err, churchgroups) => {
     if (err) {
       console.log('error here',err);
      response.json(err);
     }
     console.log(churchgroups);
     return response.send(churchgroups);
   });
};
controller.getchurchbyid = (request, response) => {
  var churchGroupId = request.params.churchgroups_id;
 
   var sql='SELECT * FROM `churchgroups` WHERE churchgroups_id = "' + churchGroupId + '"';
 
   conn.query(sql, (err, groupdetails) => {
    if (err) {
     response.json(err);
    }
    console.log(groupdetails);
    return response.send(groupdetails);
  });
 };
 controller.getchurchgroupmember=(request,response)=>{
  var churchGroupId = request.params.churchgroups_id;

 console.log('group members',churchGroupId);
  
   var sql='SELECT * FROM members m INNER JOIN members_churchgroups mc ON mc.member_id = m.member_id INNER JOIN churchgroups cg ON cg.churchgroups_id = mc.churchgroups_id WHERE cg.churchgroups_id =  "' + churchGroupId + '"';
 console.log(sql);
   conn.query(sql, (err, groupmembers) => {
    if (err) {
     response.json(err);
    }
    console.log(groupmembers);
    return response.send(groupmembers);
  });

 }
module.exports =controller;
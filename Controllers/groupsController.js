const controller ={};
const uuidv4 = require('uuid/v4');
// controller for creating groups
controller.createGroup =(request,response)=>{
    let churchGroupId = uuidv4();
    let group_name= request.body.group_name;
    let created_by='admin';


    let sql ="INSERT INTO `churchgroups` ( churchgroups_id, group_name,created_by) VALUES ( '"+ churchGroupId +"' ,'" + group_name + "',,'" + created_by + "')";
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
  console.log('json ', request.body);
  let members_churchgroups_id = uuidv4();
  let churchgroups_id= request.body.churchgroups_id.churchgroups_id;
  let member_id= request.body.form.member_id;
  let is_admin= request.body.form.is_admin;
  let created_by='admin';

  console.log('inserting member to group');
  let sqlselect ="SELECT * FROM `members_churchgroups` WHERE member_id ='"+ member_id+"'";
  conn.query(sqlselect, (error, results)=>{
    // console.log(results);
      //    results.forEach(element => {
      // if(element.member_id===member_id){
      //   response.send('Member already already enrolled to this group or another');
      // }
      if(error){
        console.log('occured during group creation',error);
        response.json(error);
      }
      if(results.length>0){
        return response.send('Member enrolled to a group unrell first');
      }else{
        let sql ="INSERT INTO `members_churchgroups` (members_churchgroups_id, member_id, churchgroups_id, is_admin,created_by) VALUES ( '"+ members_churchgroups_id +"','" + member_id + "','" + churchgroups_id + "','" + is_admin + "','" + created_by + "')";
        conn.query( sql,(err, members_churchgroups) => {
  
        if (err) {
         console.log('occured during group creation',err);
         response.json(err);
        }
        response.send(results);
       //  console.log(members_churchgroups);
      });
      }
    });
};
//unenroll member from group
controller.unEnrolledFromGroup=(request,response)=>{
  let member_id = request.params.member_id;
  console.log('removing ......', request.body, member_id)
  
  let sql= 'delete mc from members_churchgroups mc left join members m on m.member_id = mc.member_id where m.member_id ="' + member_id + '"';
  conn.query(sql, (err, churchgroups) => {
    if (err) {
      console.log('error here',err);
     response.json(err);
    }
    console.log(churchgroups);
    return response.send(churchgroups);
  });

};

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
 //get list groups member has enrolled in 
controller.getGroupsEnrolled =(request,response)=>{
  // console.log(request.body);
  let memberId = request.params.member_id;
  console.log(memberId);
  let sql ='select  ch.churchgroups_id, ch.group_name, ch.created_date from churchgroups ch join members_churchgroups mcg on mcg.churchgroups_id = ch.churchgroups_id join members m on m.member_id= mcg.member_id where m.member_id = "' + memberId + '"';
  conn.query(sql, (err, groupsenrollement) => {
    if (err) {
     response.json(err);
    }
    console.log(groupsenrollement);
    return response.send(groupsenrollement);

  });
}
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
const uuidv4 = require('uuid/v4');
const controller ={};
controller.createcluster =(request,response)=>{
    let clusters_id= uuidv4();
    let cluster_name= request.body.cluster_name;

    let sql ="INSERT INTO `clusters` ( clusters_id, cluster_name) VALUES ( '" + clusters_id + "' ,'" + cluster_name + "')";
     conn.query( sql,(err, clusters) => {
     if (err) {
      console.log('occured during cluster creation',err);
      response.json(err);
     }
     response.send('Cluster created successfully');
     console.log(clusters);
   });
}
 //get list clusters member has enrolled in 
 controller.getclustersEnrolled =(request,response)=>{
  let clusterId = request.body.clusters_id;
  let sql ='select  c.clusters_id, c.cluster_name, c.created_date from clusters c join members_clusters mc on mc.clusters_id = c.clusters_id join members m on m.member_id= mc.member_id where m.member_id = "' + clusterId + '"';
  conn.query(sql, (err, clustersenrollement) => {
    if (err) {
     response.json(err);
    }
    console.log(clustersenrollement);
    return response.send(clustersenrollement);
  });
}
//adding members to selected groups 
controller.addmemberstocluster =(request,response)=>{
    let clusters_id= request.body.clusters_id;
    let member_id= request.body.member_id;
    let is_admin= request.body.is_admin;
    let members_clusters_id =uuidv4();
  
    console.log('inserting member to cluster');
  
    let sql ="INSERT INTO `members_clusters` (members_clusters_id, member_id, clusters_id, is_admin) VALUES ( '" + members_clusters_id  + "','" + member_id + "','" + clusters_id + "','" + is_admin + "')";
     conn.query( sql,(err, members_clusters) => {
     if (err) {
      console.log('occured during adding member to cluster',err);
      response.json(err);
     }
     response.send('Added member to cluster successfully');
     console.log(members_clusters);
   });
  }

controller.getclusters= (request, response) => {
    conn.query('SELECT * FROM clusters', (err, clusters) => {
     if (err) {
       console.log('error here',err);
      response.json(err);
     }
     console.log(clusters);
     return response.send(clusters);
   });
};
controller.getclusterbyid =(request,response)=>{
  let clusterId = request.params.clusters_id;
  let sql = 'SELECT * FROM `clusters` WHERE clusters_id ="'+ clusterId +'"';
  conn.query(sql, (err, clusterdetails)=>{
    if(err){
      console.log('getmcluster by id');
      response.json(err);
      }
      console.log('selected cluster', clusterdetails);
      return response.send(clusterdetails);
  })    
};

controller.getcluctermembers=(request,response)=>{
  var clusterId = request.params.clusters_id;

 console.log('group members',clusterId);
  
   var sql='SELECT * FROM members m INNER JOIN members_clusters mc ON mc.member_id = m.member_id INNER JOIN clusters c ON c.clusters_id = mc.clusters_id WHERE c.clusters_id =  "' + clusterId + '"';
 console.log(sql);
   conn.query(sql, (err, clustermembers) => {
    if (err) {
     response.json(err);
    }
    console.log(clustermembers);
    return response.send(clustermembers);
  });

 }
  //get list clusters member has enrolled in 
// controller.getGroupsEnrolled =(request,response)=>{
//   let memberId = request.body.member_id;
//   let sql ='select * from churchgroups ch join members_churchgroups mcg on mcg.churchgroups_id = ch.churchgroups_id join members m on m.member_id= mcg.member_id where m.member_id = "' + memberId + '"';
//   conn.query(sql, (err, groupsenrollement) => {
//     if (err) {
//      response.json(err);
//     }
//     console.log(groupsenrollement);
//     return response.send(groupsenrollement);
//   });
// }
module.exports =controller;
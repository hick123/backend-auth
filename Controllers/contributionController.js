const uuidv4 = require('uuid/v4');
const controller ={};

controller.addContribution=(request,response)=>{
  console.log(request.body);


let contribution_id = uuidv4();
let member_number=request.body.member_number;
let amount =request.body.amount;
let description= request.body.description;
let contribution_date=request.body.contribution_date;

let sql="SELECT * FROM `members` WHERE member_number ='"+ member_number + "'";
 conn.query(sql, (err,results)=>{
    if(err){
      response.json(err);
    }
    console.log(results);
    if(results.length>0){
      console.log('inside if......',results);
      
      let sql ="INSERT INTO `contribution` (contribution_id, member_id, amount, contribution_description,contribution_date) VALUES ( '" + contribution_id  + "','" + results[0].member_id + "','" + amount + "','" + description + "','" + contribution_date+ "')";

             conn.query(sql, (err, results) => {
            if (err) {
            response.json(err);
            }
            // return response.send('Successfully add the contribution');
            return response.send(results);
          });
    }
    else{
      return response.send('Member does not exist or not activated yet !');
    }
 });
};
controller.allContributions=(request,response)=>{
  let sql='SELECT m.username,m.member_number, m.first_name, m.other_names,c.amount, c.Contribution_description, c.contribution_date FROM contribution c inner join members m on c.member_id = m.member_id;'
  conn.query(sql, (err,results)=>{
    if(err){
      response.json(err);
    }
    return response.send(results);
  });
};
//gets members contributions (sums)
// controller.groupedContributions=(request,response)=>{
//   let sql='SELECT m.username,m.member_number, m.first_name, m.other_names, c.Contribution_description, c.contribution_date,sum(amount) FROM contribution c inner join members m on c.member_id = m.member_id group by m.member_id;'
//   conn.query(sql, (err,results)=>{
//     if(err){
//       response.json(err);
//     }
//     return response.send(results);
//   });
// };
//get members contributions in there respective groups
controller.contributionWithGroups=(request,response)=>{
  let sql ='SELECT m.username, m.member_number, m.first_name, m.other_names, c.amount,c.Contribution_description,c.contribution_date,cg.group_name,cg.churchgroups_id FROM contribution c INNER JOIN members m ON c.member_id = m.member_id INNER JOIN members_churchgroups mc ON mc.member_id= m.member_id INNER JOIN churchgroups cg ON cg.churchgroups_id= mc.churchgroups_id';
  conn.query(sql, (err,results)=>{
    if(err){
      response.json(err);
    }
    return response.send(results);
  });
};
controller.contributionWithClusters=(request,response)=>{
  let sql ='SELECT m.username, m.member_number, m.first_name, m.other_names, c.amount,c.Contribution_description,c.contribution_date,cl.cluster_name,cl.clusters_id FROM contribution c INNER JOIN members m ON c.member_id = m.member_id INNER JOIN members_clusters mc ON mc.member_id= m.member_id INNER JOIN clusters cl ON cl.clusters_id= mc.clusters_id';
  conn.query(sql, (err,results)=>{
    if(err){
      response.json(err);
    }
    return response.send(results);
  });
};
controller.groupContribu
module.exports =controller;
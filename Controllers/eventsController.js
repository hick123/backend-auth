const uuidv4 = require('uuid/v4');
const controller ={};

controller.createclusterevent =( request,response)=>{

  console.log('body.......json',request.body);      // your JSON

     console.log('recieved post..................')
    //churchevents
    let event_title =request.body.eventForm.event_title;
    console.log(event_title);
    let event_description = request.body.eventForm.event_description;
    let  start_date =  request.body.eventForm.event_description;
    let end_date = request.body.eventForm.end_date;
    let created_by = request.body.eventForm.created_by;
    let active =request.body.active.active;
    // let active =request.body.active.active;

    console.log('activeeee......',active);

    //churchevents_transanctions
    let descriptor = request.body.desc.descriptor;
    let descriptor_id = request.body.id.clusters_id;
    console.log('descripto id',descriptor_id);
    let churchevents_id= uuidv4();
    let churchevents_transanctions_id = uuidv4();

    conn.beginTransaction(function(err) {
      console.log('Beginning transaction');
      let sqlchurchevents ="INSERT INTO `churchevents` ( churchevents_id, event_title, event_description, start_date, end_date, created_by) VALUES ( '" + churchevents_id + "','" + event_title + "','" + event_description + "' ,'" + start_date + "','" + end_date + "','" + created_by + "')";
        if (err) { throw err; }
        conn.query(sqlchurchevents, function (error, results, fields) {
          if (error) {
            return conn.rollback(function() {
              throw error;
            });
          }
          console.log('sqlchurchevents id', churchevents_id);
       console.log(results);

          let sqlchurcheventtransactions ="INSERT INTO `churchevents_transanctions` ( churchevents_transanctions_id,descriptor, descriptor_id,churchevents_id,active ) VALUES ( '" + churchevents_transanctions_id + "','" + descriptor + "','" + descriptor_id + "' ,'" + churchevents_id + "','" + active + "')";
          conn.query(sqlchurcheventtransactions, function (error, results, fields) {
            if (error) {
              return conn.rollback(function() {
                throw error;
              });
            }
            conn.commit(function(err) {
              if (err) {
                return conn.rollback(function() {
                  throw err;
                });
              }
              console.log('sqlchurcheventtransactions id', churchevents_id);
              console.log(results);
              console.log('success!');
              return response.send(results);
            });
          });
        });
      });
}
controller.createevent =( request,response)=>{

  console.log('body.......json',request.body);      // your JSON

     console.log('recieved post..................')
    //churchevents
    let event_title =request.body.eventForm.event_title;
    console.log(event_title);
    let event_description = request.body.eventForm.event_description;
    let  start_date =  request.body.eventForm.start_date;
    let end_date = request.body.eventForm.end_date;
    let created_by = request.body.eventForm.created_by;
    let active =request.body.active.active;
    console.log('activeeee......',active);

    //churchevents_transanctions
    let descriptor = request.body.desc.descriptor;
    let descriptor_id = request.body.id.churchgroups_id;
    console.log('descripto id',descriptor_id);
    let churchevents_id= uuidv4();
    let churchevents_transanctions_id = uuidv4();

    conn.beginTransaction(function(err) {
      console.log('Beginning transaction');
      let sqlchurchevents ="INSERT INTO `churchevents` ( churchevents_id, event_title, event_description, start_date, end_date, created_by) VALUES ( '" + churchevents_id + "','" + event_title + "','" + event_description + "' ,'" + start_date + "','" + end_date + "','" + created_by + "')";
        if (err) { throw err; }
        conn.query(sqlchurchevents, function (error, results, fields) {
          if (error) {
            return conn.rollback(function() {
              throw error;
            });
          }
          console.log('sqlchurchevents id', churchevents_id);
       console.log(results);

          let sqlchurcheventtransactions ="INSERT INTO `churchevents_transanctions` ( churchevents_transanctions_id,descriptor, descriptor_id,churchevents_id,active ) VALUES ( '" + churchevents_transanctions_id + "','" + descriptor + "','" + descriptor_id + "' ,'" + churchevents_id + "','" + active + "')";
          conn.query(sqlchurcheventtransactions, function (error, results, fields) {
            if (error) {
              return conn.rollback(function() {
                throw error;
              });
            }
            conn.commit(function(err) {
              if (err) {
                return conn.rollback(function() {
                  throw err;
                });
              }
              console.log('sqlchurcheventtransactions id', churchevents_id);
              console.log(results);
              console.log('success!');
              return response.send(results);
            });
          });
        });
      });
}

controller.listeventsspecificclusters=(request,response)=>{

  let clusterId = request.params.clusters_id;

  console.log('clusters_id ........................................',clusterId);

  
  let sql ='SELECT * FROM churchevents ce JOIN churchevents_transanctions cet ON cet.churchevents_id = ce.churchevents_id JOIN clusters c ON c.clusters_id = cet.descriptor_id WHERE c.clusters_id = "' + clusterId + '"';

  conn.query(sql,(err,results)=>{
    if(err){
      response.json(err);
    }
    console.log(results);
    return response.send(results);
  })
}
controller.listeventsspecifics=(request,response)=>{
  var churchGroupId = request.params.churchgroups_id;

 console.log('event select group id..........................',churchGroupId);
  
   var sql='SELECT * FROM churchevents ce JOIN churchevents_transanctions cet ON cet.churchevents_id = ce.churchevents_id JOIN churchgroups cg ON cg.churchgroups_id = cet.descriptor_id WHERE cg.churchgroups_id = "' + churchGroupId + '"';
 
   conn.query(sql, (err, events) => {
    if (err) {
     response.json(err);
    }
    console.log(events);
    return response.send(events);
  });

 }
controller.getAllEvents=(request,response)=>{
  let sql="SELECT * FROM `churchevents`";
  conn.query(sql,(error,events)=>{
    if(error){
      console.log('Error occured during fetching events');
      response.json(error);
    }
    console.log('All events',events);
    return response.send(events);
  })
};
//get specific event by id 
controller.geteventsbyid = (request, response) => {
  let churchevents_id  = request.params.churchevents_id; 
   let sql='SELECT * FROM `churchevents` WHERE churchevents_id = "' + churchevents_id + '"';
 
   conn.query(sql, (err, event) => {
    if (err) {
     response.json(err);
    }
    console.log(event);
    return response.send(event);
  });
 };

 controller.editEvent=(request, response)=>{
  let event_title =request.body.eventForm.event_title;
  let event_description = request.body.eventForm.event_description;
  let  start_date =  request.body.eventForm.start_date;
  let end_date = request.body.eventForm.end_date;
   
  let sql = 'UPDATE `churchevents` SET `event_title`="'+event_title+'", `event_description`="'+event_description+'", `start_date`="'+start_date+'", `end_date`="'+end_date+'" WHERE `churchevents_id`= "'+churchevents_id+'"';

  conn.query(sql, (err, event) => {
    if (err) {
     response.json(err);
    }
    console.log(event);
    return response.send(event);
  });

 }
module.exports = controller;
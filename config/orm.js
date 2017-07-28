var connection = require("./connection.js");

  function listBurgers(num){
    var arr = [];
    for (var i=0; i<num; i++){
      arr.push('?')
    }
    return arr.toString();
  }

  function objToSql(obj){
  //column1=value, column2=value2,...
    var arr = [];
    for (var key in obj) {
      arr.push(key + '=' + obj[key]);
    }

    return arr.toString();
  }

// Define db ORM functions all, create, and update
var orm = {
  // Display all burgers in burgers_db, table burgers
   all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
            console.log("Result all: ", result);
        });
    },
  // Add new burger to table burgers with create ORM
  create: function(table, cols, vals, cb) {
        var queryString = 'INSERT INTO ' + table; 

         queryString +=  ' (';
         queryString += cols.toString();  
         queryString += ') ';
         queryString += 'VALUES (';
         queryString += listBurgers(vals.length);
         queryString += ') ';

          // queryString = 'INSERT INTO burgers (burger_name) VALUES ?'
         console.log(queryString); 

         connection.query(queryString, vals, function(err, result) {
           if (err) throw err;
           cb(result);
           console.log("Result new: ", result);
         });
    },
  // Update the burgers table with update ORM  
    update : function(table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;
        // UPDATE burgers SET devoured= true WHERE id= req.params.id
        queryString += ' SET '; 
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err) throw err;
            cb(result);
        });
    },
    delete: function(table, condition, cb){
      var queryString = 'DELETE FROM ' + table;
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;

      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    }
};

module.exports = orm;
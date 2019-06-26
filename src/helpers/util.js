



export function detailDataProcess(data, name) {
  //Change nested object into a list of objects
  var parent = {};
  var objectsList = [];

  Object.keys(data).forEach(function(key) {
    if( data[key] === null ) parent[key] = "N/A"
    else if(typeof data[key] === "object" && !(data[key] instanceof Array) ) {
      detailDataProcess(data[key],key).forEach(function (e) {
        if(e instanceof Array)
        objectsList.push(e)
      })
    }
    else parent[key] = data[key] 
  });

  return [[name, parent]].concat(objectsList)
}

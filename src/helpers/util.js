const BASE_URL = 'http://127.0.0.1:8000/api/'

export function listUrl(type) {
  return BASE_URL+"kudu" + type+ "_list/"
}

export function detailUrl(type ,pk) {
  if(type === "dlplibrary") type = "library"
  return BASE_URL + type + "/" + pk
}


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

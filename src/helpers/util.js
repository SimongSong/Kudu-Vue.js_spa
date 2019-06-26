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

export function detailEditForm(data, form) {
  Object.keys(form).forEach(function(key) {
    if(key !== "children") form[key]["value"] = data[key]
  })
  Object.keys(form["children"]).forEach(function(key) {
    console.log("KEY")
    console.log(key)
    Object.keys(data[key]).forEach(function(children_key) {
      console.log("cHILDREN KEY")
      console.log(children_key)
      if (Object.keys(form["children"][key]).includes(children_key)) form["children"][key][children_key]["value"] = data[key][children_key]
    })
  })
  console.log("FORM")
  console.log(form)
  return form
}


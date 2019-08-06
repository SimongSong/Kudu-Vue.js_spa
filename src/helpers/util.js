
// export function detailDataProcess(data, name) {
//   //Change nested object into a list of objects
//   var parent = {};
//   var objectsList = [];

//   Object.keys(data).forEach(function(key) {
//     if( key )
//     if( data[key] === null ) parent[key] = "N/A"
//     else if(typeof data[key] === "object" && !(data[key] instanceof Array) ) {
//       detailDataProcess(data[key],key).forEach(function (e) {
//         if(e instanceof Array)
//         objectsList.push(e)
//       })
//     }
//     else parent[key] = data[key] 
//   });

//   return [[name, parent]].concat(objectsList)
// }

export function detailEditForm(data, form) { 
  form.fields = Object.assign({id: {"type": "Id", value : data.id}}, form.fields);
  Object.keys(form.fields).forEach(function(key){
    if(data[key]) form.fields[key].value = data[key]
    else form.fields[key].value = null
  })
  Object.keys(form.children).forEach(function(key){
    form.children[key].fields = Object.assign({id: {"type": "Id", value : null}}, form.children[key].fields);
    Object.keys(data[key]).forEach(function(children_key) {
      if (Object.keys(form.children[key].fields).includes(children_key)) form.children[key].fields[children_key].value = checkDataFormat(data[key][children_key])
      else form.children[key].fields = Object.assign({[children_key]: {"type": "String", value : data[key][children_key]}}, form.children[key].fields);
      
    })
  })
  Object.keys(form.relations).forEach(function(key){
    form.relations[key].selected = []
    
    console.log(key)
    if (Object.keys(data).includes(key)){
      if(form.relations[key].many) {
        console.log("MANY NUMBER")
        if (Number.isInteger(data[key][0])) form.relations[key].selected = data[key]
        else {
          data[key].forEach(function(item) {
            form.relations[key].selected = [item.id]
          })
        }
      }
      else {
        console.log("SINGLE LIKE ME FOR REST OF MY LIFE")
        form.relations[key].selected = data[key].id
      }
    }
  })
  console.log("FORM READY")
  console.log(form)
  return form
}

function checkDataFormat(input) {
  if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(input)) {
    return  new Date(input.replace("-"," "))}
  else return input
};

export function listSearch(search, data) {
  return data.filter(o =>
    Object.keys(o).some(k => String(o[k]).toLowerCase().includes(search.toLowerCase())));
}
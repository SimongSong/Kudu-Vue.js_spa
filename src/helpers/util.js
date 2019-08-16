export const BASE_URL = 'http://127.0.0.1:8000/api/'

export function checkTokenExpiration(token){
  this.$store.dispatch('login',{token: token})
  .then( response => {console.log(response); },
    error => { this.$router.push('/') })
}


export function titleEdit(title){
  var res = title.split("_")
  res.forEach((r,i) => {res[i] = r.charAt(0).toUpperCase() + r.slice(1);})
  return res.join(" ")
}

export function printNone(val){
  if(val) return val
  else return "None"
}

export function getTitle (app, model) {
  return this.$store.getters.getModelTitle(app, model)
}

export function detailEditForm(data, form) { 
  console.log("DETAIL FORM")
  console.log(data)
  console.log(form)
  console.log("1")
  form.fields = Object.assign({id: {"type": "Id", value : data.id}}, form.fields);
  console.log("2")
  Object.keys(form.fields).forEach(function(key){
    if(data[key]) {
      if(form.fields[key].type === "Date") form.fields[key].value = checkDataFormat(data[key])
      if(form.fields[key].type === "Select") form.fields[key].value = form.fields[key].choices[data[key]]
      else form.fields[key].value = data[key]
    }
    else form.fields[key].value = ""
  })
  console.log("3")
  if("children" in form) {
    Object.keys(form.children).forEach(function(key){
      console.log("3-1")
      console.log(key)
      console.log(form.children[key])
      console.log(data.children)
      form.children[key].fields = Object.assign({id: {"type": "Id", value : null}}, form.children[key].fields);
      Object.keys(data[key]).forEach(function(children_key) {
        console.log("3-2")
        if (Object.keys(form.children[key].fields).includes(children_key)){
          if(form.children[key].fields[children_key].type === "Date") form.children[key].fields[children_key].value = checkDataFormat(data[key][children_key])
          else if(form.children[key].fields[children_key].type === "Select") form.children[key].fields[children_key].value =form.children[key].fields[children_key].choices[data[key][children_key]]
          else form.children[key].fields[children_key].value = data[key][children_key]
        }
      })
    })
  }
  console.log("4")
  console.log("RELATION")
  if("relations" in form) {
    Object.keys(form.relations).forEach(function(key){
      console.log(key)
      form.relations[key].selected = []
      if (Object.keys(data).includes(key)){
        if(form.relations[key].many) {
          if (Number.isInteger(data[key][0])) form.relations[key].selected = data[key]
          else {
            data[key].forEach(function(item) {
              form.relations[key].selected = [item.id]
            })
          }
        }
        else {
          form.relations[key].selected.push(data[key].id)
        }
      }
    })
  }
  console.log("FORM READY")
  console.log(form)
  // return form
}

function checkDataFormat(input) {
  if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(input)) {
    return  new Date(input.replace("-"," ")).toISOString().substr(0, 10)}
  else return input
};

export function listSearch(search, data) {
  return data.filter(o =>
    Object.keys(o).some(k => String(o[k]).toLowerCase().includes(search.toLowerCase())));
}
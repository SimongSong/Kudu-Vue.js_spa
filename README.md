# kudu
Webiste generator for effectively displaying ORM Database(Ideally for **Django** Backend). 
This was initally designed to serve as a front end for https://github.com/shahcompbio/colossus.

Ideally, JSON file containing database schema will automatically generate a front end, 
providing users with `datatable`, `edit form`, `detail page` and `summary page`.

Made using Vue JS with Vuex and Veutify UI.

With Jira Integration.


Basic Concept:
The core part of this project relies on **Vuex**. 
Firstly, structure of the database are defined as a json variables, and are saved to `structure/structure.js`, `structure/formFields.js` and `choiceMapping.js`.


We are assuming the project's database will follow similar pattern to that of Django:
Where a project would have multiple Apps, each with their own models. 
          
`structure/structure.js`: 
  eg.) 
  ```
    App1: {
        Model1_App1: {
            title: "Name of the Model",
            url: "/list/{APP_NAME}/{MODEL_NAME}",
            list_api: "{URL FOR LIST API}/",
            detail_api: "{URL FOR DETAIL API}/",
            form_fields: form.Model1_App1,
            name: "VERBOSE NAME",
        },
       }
   ```
`structure/formFields.js`:
  eg.)
```
    Model1_App1: {
        fields: {
            //Fields of its own model
            name: { type: "String", must: true },
            description: { type: "String" },
        },
        relations: {
            //One to Many, and Many to Many Relationship
            related_model1: {
                model: ["{APP}", "{MODEL}"],
                name: "pool_id",
                many: true
            },
        },
        children: {
            //One to One Model
            one_to_one_model: {
                title: "VERBOSE NAME",
                fields: {
                    tissue_state: { type: "Select", choices: choices.tissue_state },
                    cancer_type: { type: "String" },
                    cancer_subtype: { type: "String" },
                    disease_condition: { type: "String" },
                    sex: { type: "String" },
                    patient_biopsy_date: { type: "Date" },
          }
    },
```
`choiceMapping.js`:
```
    //USED TO MAP KEYWORDS
    run_status: {
        "IDLE": 'Idle',
        "ERROR": 'Error',
        "RUNNING": 'Running',
        "ARCHIVING": 'Archiving',
        "COMPLETE": 'Complete',
        "ALIGN_COMPLETE": 'Align Complete',
        "HMMCOPY_COMPLETE": 'Hmmcopy Complete',
    },

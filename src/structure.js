export default {
  core : {
    sample : {
      title : "Colossus Samples",
      url : "/list/core/sample",
      list_api: "kudusample_list/",
      detail_api: "sample/",
      form_fields : {
        sample_id : {
          type : "String",
          must : true
        },
        taxonomy_id : {
          type : "Integer"
        },
        sample_type : {
          type : "Select",
          choices : ["Patient", "Xenograft", "Organid", "Cell Line", "Other"]
        },
        anonymous_patient_id : {
          type : "String"
        },
        cell_line_id : {
          type : "String"
        },
        xenograft_id : {
          type : "String"
        },
        children : {
          additional_sample_information : {
            tissue_state : {
              type : "Select",
              choices : ["None", "Frozen", "Fresh", "Digested-Fresh", "Other"]
            },
            cancer_type : {
              type : "String"
            },
            cancer_subtype : {
              type : "String"
            },
            disease_condition: {
              type : "String"
            },
            sex: {
              type : "String"
            },
            patient_biopsy_date : {
              type : "Date"
            },	
            anatomic_site :	{
              type : "String"
            },
            anatomic_sub_site : {
              type : "String"
            },	
            developmental_stage : {
              type : "String"
            },	
            tissue_type : {
              type : "String"
            },	
            cell_type : {
              type : "Select",
              choices : ["normal", "benign", "pre-malignment", "malignment", "non-neoplastic disease", "undetermind", "hyperplasia", "displasia", "metaplasia"]
            },	
            pathology_name : {
              type : "String"
            },
            additional_pathology_information : {
              type : "String"
            }, 	
            grade : {
              type : "String"
            },
            stage : {
              type : "String"
            },	
            tumor_content :	{
              type : "String"
            },
            pathology_occurrence : {
              type : "Select",
              choices : ["Primary", "Recurrent or Relapse", "Metastatic", "Remission", "Undetermind", "Unspecified"]
            },	
            treatment_status : {
              type : "Select",
              choices : ["Pre-treatment", "In-treatment", "Post-treatment", "N/A", "Unkown"]
            },	
            family_information : {
              type : "String"
            },
          }
        }
      }
    },
    projects : {
      title : "Colossus Projects",
      url : "/list/core/project",
      list_api: "kuduproject_list/",
      detail_api: "project/",
    },
    analysis : {
      title : "Colossus Analyses",
      url : "/list/core/analysis",
      list_api: "kuduanalysis_list/",
      detail_api:"analysis/"
    },
    summary : false
  },
  dlp : {
    library : {
      title : "DLP Libraries",
      url : "/list/dlp/library",
      list_api: "kududlplibrary_list/",
      detail_api: "library/"
    },
    sequencing : {
      title : "DLP Sequencings",
      url : "/list/dlp/sequencing",
      list_api: "kududlpsequencing_list/",
      detail_api: "sequencing/"
    },
    analysis : {
      title : "DLP Analyses",
      url : "/list/dlp/analysis",
      list_api: "kududlpanalysis_list/",
      detail_api: "analysis/"
    },
    summary : true
  },
  tenx : {
    chip : {
      title : "Tenx Chips",
      url : "/list/tenx/tenxchip",
      list_api: "kudutenxchip_list/",
      detail_api: "tenxchip/"
    },
    pool : {
      title : "Tenx Pools",
      url : "/list/tenx/tenxpool",
      list_api: "kudutenxpool_list/",
      detail_api: "tenxpool/"
    },
    library : {
      title : "Tenx Libraries",
      url : "/list/tenx/library",
      list_api: "kudutenxlibrary_list/",
      detail_api: "tenxlibrary/"
    },
    sequencing : {
      title : "Tenx Sequencings",
      url : "/list/tenx/sequencing",
      list_api: "kudutenxsequencing_list/",
      detail_api: "tenxsequencing/"
    },
    summary : true
  }
}
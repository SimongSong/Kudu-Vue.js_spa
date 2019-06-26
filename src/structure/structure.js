import form from './formFields'
export default {
  core : {
    sample : {
      title : "Colossus Samples",
      url : "/list/core/sample",
      list_api: "kudusample_list/",
      detail_api: "sample/",
      form_fields : form.sample
    },
    project : {
      title : "Colossus Projects",
      url : "/list/core/project",
      list_api: "kuduproject_list/",
      detail_api: "project/",
    },
    analysis : {
      title : "Colossus Analyses",
      url : "/list/core/analysis",
      list_api: "kuduanalysis_list/",
      detail_api:"analysis/",
      editable: false
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
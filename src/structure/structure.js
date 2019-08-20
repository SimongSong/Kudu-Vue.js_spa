import form from './formFields'
export default {
    core: {
        sample: {
            title: "Core Samples",
            url: "/list/core/sample",
            list_api: "kudusample_list/",
            detail_api: "sample/",
            form_fields: form.sample,
        },
        project: {
            title: "Core Projects",
            url: "/list/core/project",
            list_api: "kuduproject_list/",
            detail_api: "project/",
            form_fields: form.project,
        },
        summary: false
    },
    dlp: {
        library: {
            title: "DLP Libraries",
            url: "/list/dlp/library",
            list_api: "kududlplibrary_list/",
            detail_api: "library/",
            form_fields: form.dlplibrary,
        },
        sequencing: {
            title: "DLP Sequencings",
            url: "/list/dlp/sequencing",
            list_api: "kududlpsequencing_list/",
            detail_api: "sequencing/",
            form_fields: form.dlpsequencing
        },
        analysis: {
            title: "DLP Analyses",
            url: "/list/dlp/analysis",
            list_api: "kududlpanalysis_list/",
            detail_api: "analysis_information/",
            form_fields: form.dlpanalysis,
            noteditable: true
        },
        lane: {
            title: "DLP Lane",
            url: "/list/dlp/lane",
            list_api: "kududlplane_list/",
            detail_api: "lane/",
            form_fields: form.dlplane,
        },
        summary: true
    },
  tenx: {
    chip: {
      title: "Tenx Chips",
      url: "/list/tenx/chip",
      list_api: "kudutenxchip_list/",
      detail_api: "tenxchip/",
      form_fields: form.tenxchip,
      name: "name",
    },
    pool: {
      title: "Tenx Pools",
      url: "/list/tenx/pool",
      list_api: "kudutenxpool_list/",
      detail_api: "tenxpool/",
      form_fields: form.tenxpool,
      name: "pool_name",
    },
    library: {
      title: "Tenx Libraries",
      url: "/list/tenx/library",
      list_api: "kudutenxlibrary_list/",
      detail_api: "tenxlibrary/",
      form_fields: form.tenxlibrary,
      name: "name",
      jira: true, 
    },
    sequencing: {
      title: "Tenx Sequencings",
      url: "/list/tenx/sequencing",
      list_api: "kudutenxsequencing_list/",
      detail_api: "tenxsequencing/",
      form_fields: form.tenxsequencing,
      name: "",
      jira: true,
    },
    analysis: {
      title: "Tenx Analyses",
      url: "/list/tenx/analysis",
      list_api: "kudutenxanalysis_list/",
      detail_api: "tenxanalysis/",
      form_fields: form.tenxanalysis,
      noteditable: true,
      name: "jira_ticket"
    },
    summary: true
  }
}
import form from './formFields'
export default {
    core: {
        sample: {
            title: "Core Samples",
            url: "/list/core/sample",
            list_api: "kudusample_list/",
            detail_api: "sample/",
            form_fields: form.sample,
            name: "sample_id",
        },
        project: {
            title: "Core Projects",
            url: "/list/core/project",
            list_api: "kuduproject_list/",
            detail_api: "project/",
            form_fields: form.project,
            name: "name",
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
            name: "pool_id",
        },
        sequencing: {
            title: "DLP Sequencings",
            url: "/list/dlp/sequencing",
            list_api: "kududlpsequencing_list/",
            detail_api: "sequencing/",
            form_fields: form.dlpsequencing,
            name: "",
        },
        analysis: {
            title: "DLP Analyses",
            url: "/list/dlp/analysis",
            list_api: "kududlpanalysis_list/",
            detail_api: "analysis/",
            noteditable: true,
            name: "analysis_jira_ticket",
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
            name: "",
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
        },
        sequencing: {
            title: "Tenx Sequencings",
            url: "/list/tenx/sequencing",
            list_api: "kudutenxsequencing_list/",
            detail_api: "tenxsequencing/",
            form_fields: form.tenxsequencing,
            name: ""
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
        lane: {
            title: "Tenx Lane",
            url: "/list/tenx/lane",
            list_api: "kudutenxlane_list/",
            detail_api: "tenxlane/",
            form_fields: form.tenxlane,
        },
        summary: true
    }
}
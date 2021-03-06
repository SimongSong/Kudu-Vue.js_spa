import choices from './choiceMapping'

export default {
    project: {
        fields: {
            name: { type: "String", must: true },
            description: { type: "String" },
        },
        relations: {
            dlplibrary_set: {
                model: ["dlp", "library"],
                name: "pool_id",
                many: true
            },
            tenxlibrary_set: {
                model: ["tenx", "library"],
                name: "name",
                many: true
            },
        }
    },
    sample: {
        fields: {
            sample_id: { type: "String", must: true },
            taxonomy_id: { type: "Integer", default: 9606 },
            sample_type: { type: "Select", choices: choices.sample_type },
            anonymous_patient_id: { type: "String" },
            cell_line_id: { type: "String" },
            xenograft_id: { type: "String" },
            xenograft_recipient_taxonomy_id: { type: "String" },
            xenograft_treatment_status: { type: "String" },
            strain: { type: "String" },
            xenograft_biopsy_date: { type: "String" },
            notes: { type: "String" },
        },
        relations: {
            tenxlibrary_set: {
                model: ["tenx", "library"],
                name: "name",
                many: true
            },
            dlplibrary_set: {
                model: ["dlp", "library"],
                name: "pool_id",
                many: true
            },
        },
        children: {
            additionalsampleinformation: {
                title: "Additional Sample Information",
                fields: {
                    tissue_state: { type: "Select", choices: choices.tissue_state },
                    cancer_type: { type: "String" },
                    cancer_subtype: { type: "String" },
                    disease_condition: { type: "String" },
                    sex: { type: "String" },
                    patient_biopsy_date: { type: "Date" },
                    anatomic_site: { type: "String", must: true },
                    anatomic_sub_site: { type: "String" },
                    developmental_stage: { type: "String" },
                    tissue_type: { type: "Select", choices: choices.tissue_type, must: true },
                    cell_type: { type: "String" },
                    pathology_disease_name: { type: "String", must: true },
                    additional_pathology_information: { type: "String" },
                    grade: { type: "String" },
                    stage: { type: "String" },
                    tumor_content: { type: "String" },
                    pathology_occurrence: { type: "Select", choices: choices.pathology_occurrence },
                    treatment_status: { type: "Select", choices: choices.treatment_status },
                    family_information: { type: "String" },
                }
            }
        }
    },
    dlpanalysis: {
        fields: {
            version: { type: "String", must: true, default: 'v0.3.1' },
            analysis_jira_ticket: { type: "String" },
            analysis_submission_date: { type: "Date", default: Date.now() },
            aligner: { type: "Select", choices: choices.aligner, default: "A" },
            smoothing: { type: "Select", choices: choices.smoothing, default: "M" },
            montage_status: { type: "Select", choices: choices.montage_status },
            priority_level: { type: "Select", choices: choices.priority_level },
            verified: { type: "Select", choices: choices.verified, default: "F" },
        },
        relations: {
            library: {
                model: ["dlp", "library"],
                name: "pool_id",
                must: true,
                many: false
            },
            sequnecings: {
                model: ["dlp", "sequencing"],
                name: "id",
                many: true
            },
        },
        children: {
            analysis_run: {
                title: 'Analysis Run',
                fields: {
                    run_status: { type: "Select", choices: choices.run_status },
                    last_updated: { type: "Date" },
                }
            },
            reference_genome: {
                title: 'Reference Genome',
                fields: { reference_genome: { type: "String", must: true }, },
            }
        }
    },
    dlplibrary: {
        fields: {
            pool_id: { type: "String", must: true },
            jira_ticket: { type: "String" },
            description: { type: "String" },
            result: { type: "String" },
            title: { type: "String" },
            quality: { type: "Integer", default: 0.75 },
            exclude_from_analysis: { type: "Bool" },
            failed: { type: "Bool" },
        },
        relations: {
            projects: {
                model: ["core", "project"],
                name: "name",
                many: true
            },
            sample: {
                model: ["core", "sample"],
                name: "sample_id",
                must: true,
                many: false
            },
            dlpsequencing_set: {
                model: ["dlp", "sequencing"],
                name: "id",
                many: true
            }
        },
        schoolings: {
            doubletinformation: {
                title: "Doublet Information",
                pivot: true,
            },
            metadata: {
                title: "Metadata",
                many: false,
            },
            sublibraryinformation_set: {
                title: "Sublibrary",
                many: true,
                api: "kududlpsublibrary_list/",
                fields: {
                    sublibrary_csv: { type: 'File' },
                }
            }

        },
        children: {
            dlplibraryconstructioninformation: {
                title: "DLP Library Construction Information",
                fields: {
                    chip_format: { type: "Select", choices: choices.chip_format },
                    library_construction_method: { type: "String" },
                    library_type: { type: "String" },
                    library_notes: { type: "String" },
                    library_prep_date: { type: "Date" },
                    number_of_pcr_cycles: { type: "Integer" },
                    protocol: { type: "String" },
                    spotting_location: { type: "Select", choices: choices.spotting_location },
                }
            },
            dlplibrarysampledetail: {
                title: "DLP Library Sample Detail",
                fields: {
                    sample_spot_date: { type: "Date", default: Date.now() },
                    spotting_location: { type: "Select", choices: choices.spotting_location },
                    cell_state: { type: "Select", choices: choices.cell_state },
                    estimated_percent_viability: { type: "Integer" },
                    label_of_original_sample_vial: { type: "String" },
                    lims_vial_barcode: { type: "String" },
                    original_storage_temperature: { type: "Integer" },
                    passage_of_cell_line: { type: "Integer" },
                    sample_notes: { type: "String" },
                    sample_preparation_method: { type: "String" },
                    sample_preservation_method: { type: "String" }
                }
            },
            dlplibraryquantificationandstorage: {
                title: "DLP Quantification and Storage",
                fields: {
                    average_size: { type: "Integer" },
                    dna_concentration_nm: { type: "Integer" },
                    dna_concentration_ngul: { type: "Integer" },
                    dna_volume: { type: "String" },
                    freezer: { type: "String" },
                    rack: { type: "Integer" },
                    shelf: { type: "Integer" },
                    box: { type: "Integer" },
                    position_in_box: { type: "Integer" },
                    library_tube_label: { type: "String" },
                    quantification_method: { type: "String", default: "Bioanalyzer" },
                    size_range: { type: "String" },
                    size_selection_method: { type: "String", default: "AmpureXP" },
                    storage_medium: { type: "String", default: "TE 10:0.1" },
                    agilent_bioanalyzer_xad: { type: "File" },
                    agilent_bioanalyzer_image: { type: "File" },
                    qc_check: { type: "Select", choices: choices.qc_check },
                    qc_notes: { type: "String" },
                }
            },
        }
    },
    dlplane: {
        fields: {
            flow_cell_id: { type: "String" },
            sequencing_date: { type: "Date" },
            path_to_archive: { type: "String" },
        },
        relations: {
            sequencing: {
                model: ["dlp", "sequencing"],
                name: "id",
                many: false
            },
        }
    },
    dlpsequencing: {
        fields: {
            rev_comp_override: { type: "Select", choices: choices.rev_comp_override },
            adapter: { type: "String", default: "CTGTCTCTTATACACATCT" },
            format_for_data_submission: { type: "String", default: "fastq" },
            index_read_type: { type: "String", default: "Dual Index (i7 and i5)" },
            index_read1_length: { type: "Integer", default: 6 },
            index_read2_length: { type: "Integer", default: 6 },
            read_type: { type: "Select", choices: choices.read_type, default: "P" },
            read1_length: { type: "Integer", default: 150 },
            read2_length: { type: "Integer", default: 150 },
            sequencing_instrument: { type: "Select", choices: choices.sequencing_instrument_choices, default: "HX" },
            sequencing_output_mode: { type: "Select", choices: choices.sequencing_output_mode },
            short_description_of_submission: { type: "String" },
            submission_date: { type: "Date", default: Date.now() },
            number_of_lanes_requested: { type: "Integer", default: 1 },
            gsc_library_id: { type: "String" },
            sequencer_id: { type: "String" },
            sequencing_center: { type: "Select", choices: choices.sequencing_center, default: "BCCAGSC" },
            sequencer_notes: { type: "String" }
        },
        relations: {
            dlplibrary: {
                model: ["dlp", "library"],
                name: "pool_id",
                many: false,
                must: true,
            },
            dlplane_set: {
                model: ["dlp", "lane"],
                name: "flow_cell_id",
                many: true
            },
            relates_to: {
                model: ["dlp", "sequencing"],
                name: "id",
                many: true
            }
        }
    },
    tenxchip: {
        fields: {
            name: { type: "String" },
            lab_name: { type: "Select", choices: choices.lab_name, must: true },
        },
        relations: {
            tenxlibrary: {
                model: ["tenx", "library"],
                name: "name",
                many: true
            }
        },
    },
    tenxpool: {
        fields: {
            pool_name: { type: "String" },
            gsc_pool_name: { type: "String" },
            construction_location: { type: "Select", choices: choices.sequencing_center },
            constructed_date: { type: "Date" }
        },
        relations: {
            tenxlibrary_set: {
                model: ["tenx", "library"],
                name: "name",
                many: true,
                must: true
            },
            tenxsequencing: {
                model: ["tenx", "sequencing"],
                name: "id",
                many: true
            }
        }
    },
    tenxanalysis: {
        fields: {
            input_type: { type: "Select", choices: choices.input_type },
            version: { type: "String" },
            jira_ticket: { type: "String" },
            run_status: { type: "Select", choices: choices.run_status },
            submission_date: { type: "Date" },
            description: { type: "String" },
        },
        relations: {
            tenxsequencing_set: {
                model: ["tenx", "sequencing"],
                name: "id",
                dependent: 'tenx_library',
                many: true
            },
            tenx_library: {
                model: ["tenx", "library"],
                name: "name",
                many: false
            },
        },
    },
    tenxlane: {
        fields: {
            flow_cell_id: { type: "String" },
            sequencing_date: { type: "Date" },
            path_to_archive: { type: "String" },
        },
        relations: {
            sequencing: {
                model: ["tenx", "sequencing"],
                name: "id",
                many: false
            },
        }
    },
    tenxsequencing: {
        fields: {
            sequencing_instrument: { type: "Select", choices: choices.sequencing_instrument_choices, default: "HX" },
            sequencing_center: { type: "Select", choices: choices.sequencing_center, default: "BCCAGSC" },
            submission_date: { type: "Date", default: Date.now() },
            sequencer_id: { type: "String" },
            number_of_lanes_requested: { type: "Integer", default: 1 },
        },
        relations: {
            tenxlane_set: {
                model: ["tenx", "lane"],
                name: "flow_cell_id",
                many: true
            },
            tenxlibrary: {
                model: ["tenx", "library"],
                name: "name",
                many: false
            },
            tenxpool: {
                model: ["tenx", "pool"],
                name: "pool_name",
                many: false,
                must: true,
            },
        }
    },
    tenxlibrary: {
        fields: {
            name: { type: "String" },
            jira_ticket: { type: "String" },
            description: { type: "String" },
            result: { type: "String" },
            num_sublibraries: { type: "Integer", default: "0" },
            experimental_condition: { type: "String" },
            chip_well: { type: "Integer" },
            condition: { type: "String" },
            google_sheet: { type: "String" },
            failed: { type: "Bool" },
        },
        relations: {
            projects: {
                model: ["core", "project"],
                name: "name",
                many: true
            },
            tenxchip: {
                model: ["tenx", "chip"],
                name: "name",
                many: false,
                must: true
            },
            sample: {
                model: ["core", "sample"],
                name: "sample_id",
                many: false,
                must: true
            },
            tenxpool: {
                model: ["tenx", "pool"],
                name: "pool_name",
                many: false
            },
            tenxsequencing: {
                model: ["tenx", "sequencing"],
                name: "id",
                many: true
            }
        },
        children: {
            tenxlibraryconstructioninformation: {
                title: "TenX Library Construction Information",
                fields: {
                    library_construction_method: { type: "String", default: "10x Genomics" },
                    submission_date: { type: "Date" },
                    library_prep_location: { type: "String", default: "BCCRC" },
                    chip_lot_number: { type: "Integer" },
                    reagent_lot_number: { type: "Integer" },
                    library_type: { type: "Select", choices: choices.library_type, default: "3'" },
                    index_used: { type: "Select", choices: choices.index_used },
                    pool: { type: "String" },
                    concentration: { type: "Integer" },
                    chemistry_version: { type: "Select", choices: choices.chemistry_version, default: "VERSION_3" },
                }
            },
            tenxlibrarysampledetail: {
                title: "TenX Library Sample Detail",
                fields: {
                    sample_spot_date: { type: "Date", default: Date.now() },
                    spotting_location: { type: "Select", choices: choices.spotting_location },
                    cell_state: { type: "Select", choices: choices.cell_state },
                    num_cells_targeted: { type: "Integer", default: 3000 },
                    estimated_percent_viability: { type: "Integer" },
                    label_of_original_sample_vial: { type: "String" },
                    lims_vial_barcode: { type: "String" },
                    original_storage_temperature: { type: "Integer" },
                    passage_of_cell_line: { type: "Integer" },
                    sample_notes: { type: "String" },
                    sample_preparation_method: { type: "String" },
                    sample_preservation_method: { type: "String" }
                }
            },
            tenxlibraryquantificationandstorage: {
                title: "TenX Quantification And Storage",
                fields: {
                    agilent_bioanalyzer_xad: { type: "String" },
                    agilent_bioanalyzer_image: { type: "String" },
                    qc_check: { type: "Select", choices: choices.qc_check },
                    qc_notes: { type: "String" },
                }
            }
        }
    }
}
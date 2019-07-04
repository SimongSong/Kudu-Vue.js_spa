import choices from './choiceMapping'

export default {
  project : {
    fields : {
      name : { type : "String" },
      description : { type : "String" },
      dlplibrary_set : {},
      pballibrary_projects : {},
      tenxlibrary_set : {}
    },
    relations : {
      dlplibrary_set : {
        model : ["dlp","library"],
        name: "pool_id",
        many : true
      },
      tenxlibrary_set : {
        model : ["tenx","library"],
        name: "name ",
        many : true
      },
    }
  },
  // analysis : {
  //   input_type : { type : "String" },
  //   version : { type : "String" },
  //   jira_ticket : { type : "String" },
  //   run_status : null,
  //   submission_date : null,
  //   description : "",
  //   dlp_library : null,
  //   pbal_library : null,
  //   tenx_library : null,
  //   tenxsequencing_set : [],
  //   dlpsequencing_set : [],
  //   pbalsequencing_set : [],
  // },
  sample : {
    fields : {
      sample_id : { type : "String", must : true },
      taxonomy_id : { type : "Integer" },
      sample_type : { type : "Select", choices : choices.sample_type },
      anonymous_patient_id : { type : "String" },
      cell_line_id : { type : "String" },
      xenograft_id : { type : "String" },
    },
    children : {
      additionalsampleinformation : {
        tissue_state : { type : "Select", choices : choices.tissue_state },
        cancer_type : { type : "String" },
        cancer_subtype : { type : "String" },
        disease_condition: { type : "String" },
        sex: { type : "String" },
        patient_biopsy_date : { type : "Date" },	
        anatomic_site :	{ type : "String" },
        anatomic_sub_site : { type : "String" },	
        developmental_stage : { type : "String" },	
        tissue_type : { type : "Select", choices : choices.tissue_type },	
        cell_type : { type : "String" },	
        pathology_disease_name : { type : "String" },
        additional_pathology_information : { type : "String" }, 	
        grade : { type : "String" },
        stage : { type : "String" },	
        tumor_content :	{ type : "String" },
        pathology_occurrence : { type : "Select", choices : choices.pathology_occurrence },	
        treatment_status : { type : "Select", choices : choices.treatment_status },	
        family_information : { type : "String" },
      }
    }
  },
  dlplibrary : {
    fields : {
      pool_id : { type : "String" },
      jira_ticket : { type : "String" },
      description : { type : "String" },
      result : { type : "String" },
      title : { type : "String" },
      quality : { type : "Integer" },
      exclude_from_analysis : { type : "Bool" },
      failed : { type : "Bool" },
    },
    relations : {
      projects : {
        model : ["core","project"],
        name : "name",
        many : true
      }
    },
    children : {
      dlplibraryconstructioninformation : {
        chip_format : { type : "Select", choices : choices.chip_format },
        library_construction_method : { type : "String" },
        library_type : { type : "String" },
        library_notes : { type : "String" },
        library_prep_date : { type : "Date" },
        number_of_pcr_cycles : { type : "Integer" },
        protocol : { type : "String" },
        spotting_location : { type : "Select", choices : choices.spotting_location },
      },
      dlplibrarysampledetail : {
        sample_spot_date : { type : "Date" },
        spotting_location : { type : "Select", choices : choices.spotting_location },
        cell_state : { type : "Select", choices : choices.cell_state },
        estimated_percent_viability : { type : "Integer" },
        label_of_original_sample_vial : { type : "String" },
        lims_vial_barcode : { type : "String" },
        original_storage_temperature : { type : "Integer" },
        passage_of_cell_line : { type : "Integer" },
        sample_notes : { type : "String" },
        sample_preparation_method : { type : "String" },
        sample_preservation_method : { type : "String" }
      },
      dlplibraryquantificationandstorage : {
        average_size : { type : "Integer" },
        dna_concentration_nm : { type : "Integer" },
        dna_concentration_ngul : { type : "Integer" },
        dna_volume : { type : "String" },
        freezer : { type : "String" },
        rack : { type : "Integer" },
        shelf : { type : "Integer" },
        box : { type : "Integer" },
        position_in_box : { type : "Integer" },
        library_tube_label : { type : "String" },
        quantification_method : { type : "String" },
        size_range : { type : "String" },
        size_selection_method : { type : "String" },
        storage_medium : { type : "String" },
        agilent_bioanalyzer_xad : { type : "String" },
        agilent_bioanalyzer_image : { type : "String" },
        qc_check : { type : "Select", choices : choices.qc_check },
        qc_notes : { type : "String" },        
      }
    }
  },
  dlpsequencing : {
    fields : {
      rev_comp_override : { type : "Select", choices : choices.rev_comp_override },
      adapter : { type : "String" },        
      format_for_data_submission : { type : "String" },        
      index_read_type : { type : "String" },        
      index_read1_length : { type : "Integer" },        
      index_read2_length : { type : "Integer" },
      read_type : { type : "Select", choices : choices.read_type },
      read1_length : { type : "Integer" },
      read2_length : { type : "Integer" },
      sequencing_instrument : { type : "Select", choices : choices.sequencing_instrument },
      sequencing_output_mode : { type : "Select", choices : choices.sequencing_output_mode },
      short_description_of_submission : { type : "String" },        
      submission_date : { type : "Date" }, 
      number_of_lanes_requested : { type : "Integer" },        
      gsc_library_id : { type : "String" },        
      sequencer_id : { type : "String" },        
      sequencing_center : { type : "Select", choices : choices.sequencing_center },
      sequencer_notes : { type : "String" }
    }     
  },
  tenxchip : {
    fields : {
      name : { type : "String" },        
      lab_name : { type : "Select", choices : choices.lab_name },
    }
  },
  tenxpool : {
    fields : {
      pool_name : { type : "String" },        
      gsc_pool_name : { type : "String" },        
      construction_location : { type : "Select", choices : choices.sequencing_center },
      constructed_date : { type : "Date" }
    }
  },
  tenxsequencing : {
    fields : {
      sequencing_instrument : { type : "Select", choices : choices.sequencing_instrument },
      sequencing_center : { type : "Select", choices : choices.sequencing_center },
      submission_date : { type : "Date" },
      sequencer_id : { type : "String" },
      number_of_lanes_requested : { type : "Integer" },
    }
  },
  tenxlibrary : {
    fields : {
      name : { type : "String" },
      jira_ticket : { type : "String" },
      description : { type : "String" },
      result : { type : "String" },
      num_sublibraries : { type : "String" },
      experimental_condition : { type : "String" },
      chip_well : { type : "Integer" },
      condition : { type : "String" },
      google_sheet : { type : "String" },
      failed : { type : "Bool" },
    },
    relations : {
      projects : {
        model : ["core","project"],
        name : "name",
        many : true
      }
    },
    children : {
      tenxlibraryconstructioninformation : {
        library_construction_method : { type : "String" },
        submission_date : { type : "Date" },
        library_prep_location : { type : "String" },
        chip_lot_number : { type : "Integer" },
        reagent_lot_number : { type : "Integer" },
        library_type : { type : "Select", choices : choices.library_type },
        index_used : { type : "Select", choices : choices.index_used },
        pool : { type : "String" },
        concentration : { type : "Integer" },
        chemistry_version : { type : "Select", choices : choices.chemistry_version },
      },
      tenxlibrarysampledetail : {
        sample_spot_date : { type : "Date" },
        spotting_location : { type : "Select", choices : choices.spotting_location },
        cell_state : { type : "Select", choices : choices.cell_state },
        estimated_percent_viability : { type : "Integer" },
        label_of_original_sample_vial : { type : "String" },
        lims_vial_barcode : { type : "String" },
        original_storage_temperature : { type : "Integer" },
        passage_of_cell_line : { type : "Integer" },
        sample_notes : { type : "String" },
        sample_preparation_method : { type : "String" },
        sample_preservation_method : { type : "String" }
      },
      tenxlibraryquantificationandstorage : {
        agilent_bioanalyzer_xad : { type : "String" },
        agilent_bioanalyzer_image : { type : "String" },
        qc_check : { type : "Select", choices : choices.qc_check },
        qc_notes : { type : "String" },        
      }
    }
  }
}
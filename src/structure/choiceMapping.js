export default {
    sample_type: { P: "Patient", X: "Xenograft", Or: "Organid", C: "Cell Line", O: "Other" },
    tissue_state: { NONE: 'None', FROZ: 'Frozen', FRES: 'Fresh', 'DIG-FRES': 'Digested-Fresh' },

    tissue_type: {
        'N': 'Normal',
        'B': 'Benign',
        'PM': 'Pre-malignant',
        'M': 'Malignant',
        'NNP': 'Non-neoplastic Disease',
        'U': 'Undetermined',
        'HP': 'Hyperplasia',
        'MP': 'Metaplasia',
        'DP': 'Dysplasia',
    },

    input_type: {
        'DLP': "DLP",
        'PBAL': "PBAL",
        'TENX': "TenX"
    },

    aligner: {
        'A': 'bwa-aln',
        'M': 'bwa-mem',
    },

    smoothing: {
        'M': 'modal',
        'L': 'loess',
    },

    montage_status: {
        'Success': 'Success',
        'Error': 'Error',
        'Ignore': 'Ignore',
        'Pending': 'Pending'
    },

    priority_level: {
        'L': 'Low',
        'M': 'Medium',
        'H': 'High',
    },

    verified: {
        'T': 'True',
        'F': 'False',
    },

    run_status: {
        "IDLE": 'Idle',
        "ERROR": 'Error',
        "RUNNING": 'Running',
        "ARCHIVING": 'Archiving',
        "COMPLETE": 'Complete',
        "ALIGN_COMPLETE": 'Align Complete',
        "HMMCOPY_COMPLETE": 'Hmmcopy Complete',
    },

    pathology_occurrence: {
        'PR': 'Primary',
        'RC': 'Recurrent or Relapse',
        'ME': 'Metastatic',
        'RM': 'Remission',
        'UN': 'Undetermined',
        'US': 'Unspecified'
    },

    treatment_status: {
        'PR': 'Pre-treatment',
        'IN': 'In-treatment',
        'PO': 'Post-treatment',
        'NA': 'N/A',
        'UN': 'unkown'
    },

    chip_format: {
        'W': 'Wafergen',
        'M': 'Microfluidic',
        'B': 'Bulk',
        'O': 'Other'
    },

    spotting_location: {
        'AD': 'Aparicio Lab - Deckard',
        'AR': 'Aparicio Lab - Rachael',
        'H': 'Hansen Lab',
        'G': 'GSC',
    },

    cell_state: {
        'C': 'Cells',
        'N': 'Nuclei',
        'M': 'Mixed',
        'U': 'Unknown'
    },

    qc_check: {
        'P': 'Will sequence',
        'N': 'Will not sequence'
    },

    rev_comp_override: {
        'i7,i5': 'No Reverse Complement',
        'i7,rev(i5)': 'Reverse Complement i5',
        'rev(i7),i5': 'Reverse Complement i7',
        'rev(i7),rev(i5)': 'Reverse Complement i7 and i5'
    },

    read_type: {
        'P': 'PET',
        'S': 'SET',
    },

    sequencing_instrument: {
        'i7,i5': 'No Reverse Complement',
        'i7,rev(i5)': 'Reverse Complement i5',
        'rev(i7),i5': 'Reverse Complement i7',
        'rev(i7),rev(i5)': 'Reverse Complement i7 and i5'
    },

    sequencing_instrument_choices: {
        'HX': 'HiSeqX',
        'H2500': 'HiSeq2500',
        'N500': 'NextSeq500',
        'N550': 'NextSeq550',
        'MI': 'MiSeq',
        'O': 'other',
    },

    sequencing_output_mode: {
        'L': 'Low',
        'M': 'Medium',
        'H': 'High'
    },

    sequencing_center: {
        'BCCAGSC': 'BCCAGSC',
        'UBCBRC': 'UBCBRC',
    },

    lab_name: { 'SA': 'Sam Aparicio', 'DH': 'David Huntsman' },

    library_type: { "5'": "5'", "3'": "3'", "V(D)J": "V(D)J", "CNV": "CNV" },

    chemistry_version: { "VERSION_2": "v2", "VERSION_3": "v3" },

    index_used: {
        "SI_GA_A1": "SI-GA_A1",
        "SI_GA_A2": "SI-GA-A2",
        "SI_GA_A3": "SI-GA-A3",
        "SI_GA_A4": "SI-GA-A4",
        "SI_GA_A5": "SI-GA-A5",
        "SI_GA_A6": "SI-GA-A6",
        "SI_GA_A7": "SI-GA-A7",
        "SI_GA_A8": "SI-GA-A8",
        "SI_GA_A9": "S:I-GA-A9",
        "SI_GA_A10": "SI-GA-A10",
        "SI_GA_A11": "SI-GA-A11",
        "SI_GA_A12": "SI-GA-A12",
        "SI_GA_B1": "SI-GA-B1",
        "SI_GA_B2": "SI-GA-B2",
        "SI_GA_B3": "SI-GA-B3",
        "SI_GA_B4": "SI-GA-B4",
        "SI_GA_B5": "SI-GA-B5",
        "SI_GA_B6": "SI-GA-B6",
        "SI_GA_B7": "SI-GA-B7",
        "SI_GA_B8": "SI-GA-B8",
        "SI_GA_B9": "SI-GA-B9",
        "SI_GA_B10": "SI-GA-B10",
        "SI_GA_B11": "SI-GA-B11",
        "SI_GA_B12": "SI-GA-B12",
        "SI_GA_C1": "SI-GA-C1",
        "SI_GA_C2": "SI-GA-C2",
        "SI_GA_C3": "SI-GA-C3",
        "SI_GA_C4": "SI-GA-C4",
        "SI_GA_C5": "SI-GA-C5",
        "SI_GA_C6": "SI-GA-C6",
        "SI_GA_C7": "SI-GA-C7",
        "SI_GA_C8": "SI-GA-C8",
        "SI_GA_C9": "SI-GA-C9",
        "SI_GA_C10": "SI-GA-C10",
        "SI_GA_C11": "SI-GA-C11",
        "SI_GA_C12": "SI-GA-C12",
        "SI_GA_D1": "SI-GA-D1",
        "SI_GA_D2": "SI-GA-D2",
        "SI_GA_D3": "SI-GA-D3",
        "SI_GA_D4": "SI-GA-D4",
        "SI_GA_D5": "SI-GA-D5",
        "SI_GA_D6": "SI-GA-D6",
        "SI_GA_D7": "SI-GA-D7",
        "SI_GA_D8": "SI-GA-D8",
        "SI_GA_D9": "SI-GA-D9",
        "SI_GA_D10": "SI-GA-D10",
        "SI_GA_D11": "SI-GA-D11",
        "SI_GA_D12": "SI-GA-D12",
        "SI_GA_E1": "SI-GA-E1",
        "SI_GA_E2": "SI-GA-E2",
        "SI_GA_E3": "SI-GA-E3",
        "SI_GA_E4": "SI-GA-E4",
        "SI_GA_E5": "SI-GA-E5",
        "SI_GA_E6": "SI-GA-E6",
        "SI_GA_E7": "SI-GA-E7",
        "SI_GA_E8": "SI-GA-E8",
        "SI_GA_E9": "SI-GA-E9",
        "SI_GA_E10": "SI-GA-E10",
        "SI_GA_E11": "SI-GA-E11",
        "SI_GA_E12": "SI-GA-E12",
        "SI_GA_F1": "SI-GA-F1",
        "SI_GA_F2": "SI-GA-F2",
        "SI_GA_F3": "SI-GA-F3",
        "SI_GA_F4": "SI-GA-F4",
        "SI_GA_F5": "SI-GA-F5",
        "SI_GA_F6": "SI-GA-F6",
        "SI_GA_F7": "SI-GA-F7",
        "SI_GA_F8": "SI-GA-F8",
        "SI_GA_F9": "SI-GA-F9",
        "SI_GA_F10": "SI-GA-F10",
        "SI_GA_F11": "SI-GA-F11",
        "SI_GA_F12": "SI-GA-F12",
        "SI_GA_G1": "SI-GA-G1",
        "SI_GA_G2": ":SI-GA-G2",
        "SI_GA_G3": "SI-GA-G3",
        "SI_GA_G4": "SI-GA-G4",
        "SI_GA_G5": ":SI-GA-G5",
        "SI_GA_G6": "SI-GA-G6",
        "SI_GA_G7": "SI-GA-G7",
        "SI_GA_G8": "SI-GA-G8",
        "SI_GA_G9": "SI-GA-G9",
        "SI_GA_G10": "SI-GA-G10",
        "SI_GA_G11": "SI-GA-G11",
        "SI_GA_G12": "SI-GA-G12",
        "SI_GA_H1": "SI-GA-H1",
        "SI_GA_H2": "SI-GA-H2",
        "SI_GA_H3": "SI-GA-H3",
        "SI_GA_H4": "SI-GA-H4",
        "SI_GA_H5": "SI-GA:-H5",
        "SI_GA_H6": "SI-GA-H6",
        "SI_GA_H7": "SI-GA-H7",
        "SI_GA_H8": "SI-GA-H8",
        "SI_GA_H9": "SI-GA-H9",
        "SI_GA_H10": "SI-GA-H10",
        "SI_GA_H11": "SI-GA-H11",
        "SI_GA_H12": "SI-GA-H12"
    },
}
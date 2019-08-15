import structure from '../structure/structure'

export default {
    account: {
        username: "Simong",
        authenticated: false,
        colour: null,
    },

    loading: false,

    view: "list",
    model: {
        form_fields: {}
    },
    // detail: {},
    structure: structure,
    form: {},
    // Tuple of (URL Path, Title)
    history: []
}

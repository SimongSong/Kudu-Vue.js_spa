import structure from '../structure/structure'

export default {
    account: {
        authorized: false,
        username: "Simong",
        token: "",
        expired: false        
    },

    loading: false,

    view: "list",
    model: {},
    detail: {},
    structure: structure,
    form: {},
    // Tuple of (URL Path, Title)
    history: []
}

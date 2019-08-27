<template>
    <v-container fluid>  
        {{this.$route.params}}  
        <v-card flat>
            <v-card-title>
                <h2 :class="`display-2 font-weight-light mb-4`" :style="{'color':colour}">Confirm</h2>
            </v-card-title>
        </v-card>
        title: {{defaultTitle}}  description: {{defaultDescription}}
        <v-form class="pl-4 pr-4" >
            <v-text-field
                :value="getTitle"
                id="title"
                label="Title"
                name="title"
                clearable
                :color="colour"
            ></v-text-field>

            <v-textarea
                v-model="getDescription"
                label="Description"
                counter
                maxlength="120"
                full-width
                single-line
                outlined
                clearable
                no-resize
                :color="colour"
            ></v-textarea>
            {{projectSelected}} {{reporterSelected}}
            <v-overflow-btn
                v-model="projectSelected"
                class="my-2"
                :items="projects"
                label="Project"
                item-text="name"
                item-value="key"
                :color="colour"
                editable
            >
                <template slot="no-data">
                    <v-alert :value="true">
                        No project found.
                    </v-alert>
                </template>
            </v-overflow-btn>

            <v-overflow-btn
                v-model="reporterSelected"
                class="my-2"
                :items="users"
                label="Reporter"
                item-text="name"
                item-value="user"
                :color="colour"
                editable
            >
                <template slot="no-data">
                    <v-alert :value="true">
                        No user found.
                    </v-alert>
                </template>
            </v-overflow-btn>
        </v-form>
        <v-layout align-end justify-end>
            <v-btn class="ma-1" :color="colour" @click="create">Create</v-btn>
        </v-layout>
    </v-container>  
</template>



<script>
    import { BASE_URL } from '../helpers/util';
	import Vue from "vue";
    export default {
        name: "CreateTicket",
        props: ["title", "description", "structure"],
        data(){
            return {
                defaultTitle : "", //SAMPLE - LIBRARY - ADDITIONAL TITLE
                defaultDescription: "",
                projects: [],
                users: [],
                app: this.$route.params.app,
                model: this.$route.params.type,
                info: this.structure,
                sampleName: "",
                libraryName: "",
                projectSelected: "",
                reporterSelected: "",
            }
        },
        created() {
            if (this.model == "library") {
                this.getSample
            }
            else if (this.model == "analysis") {
                this.getLibrary
            }
            // this.getSample
            this.getProjects()
            this.getUsers()
            
        },
		computed: {
            getTitle() {
                if (this.model === "library") {
                    this.getSample
                    console.log("model is library")
                    this.defaultTitle = `${this.sampleName} - ${this.info.fields.pool_id.value} - ${this.info.fields.description.value}`
                }
                else if (this.model === "analysis") {
                    console.log("model is analysis")
                    this.defaultTitle = `Analysis for ${this.libraryName} with ${this.info.fields.aligner.value}`
                }
                return (this.defaultTitle)
            },
			colour() {
				return this.$store.getters.colourGetter;
            },

            getModelName() {
                if (this.model === "library") {
                    console.log("model is library")
                    this.getSample()
                }
                else if (this.model === "analysis") {
                    console.log("model is analysis")
                    this.getLibrary()
                }
            },
            async getSample(){
                return new Promise((resolve, reject) => {
                    console.log("in get sample")
                    this.$store
                    .dispatch("loadData", {
                        app: "core",
                        type: "detail",
                        model: "sample",
                        token: localStorage.getItem("user-token"),
                        pk: this.info.relations.sample.selected,
                    })
                    .then(
                        response => {
                            console.log(response)
                            this.sampleName = response["sample_id"]
                            console.log(this.sampleName)
                            console.log("ok")
                            resolve(this.sampleName)
                        },
                        error => {
                            console.log("failed to get sample")
                            reject("not ok")
                        }
                    )
                })

            },
            // getTitle: {
            //     get() {
            //         return this.defaultTitle
            //     },
            //     set(input){
            //         if (input) {
            //             console.log(input)
            //             this.defaultTitle = input
            //             console.log(this.defaultTitle)
            //         }
            //         else if (this.model === "library") {
            //             console.log("model is library")
            //             this.defaultTitle = `${this.sampleName} - ${this.info.fields.pool_id.value} - ${this.info.fields.description.value}`
            //         }
            //         else if (this.model === "analysis") {
            //             console.log("model is analysis")
            //             this.defaultDescription = `Analysis for ${this.libraryName} with ${this.info.fields.aligner.value}`

            //         }



            //     }
            // },

            getDescription() {
                this.defaultDescription = `For more information about this ${this.model}, visit ${BASE_URL}`
                return (this.defaultDescription)

            },
        },

        methods: {

            create() {
                var properties = {
                    title: this.defaultTitle,
                    description: this.defaultDescription,
                    project: this.projectSelected,
                    reporter: this.reporterSelected,
                }
                this.$store.dispatch("createTicket", properties).then(
                    response => {
                        console.log(response)
                        console.log("ok")
                    },
                    error => {
                        console.log("not ok")
                    }
                )

            },

            getProjects() {
                this.$store.dispatch("jiraProjects").then(
                    response => {
                        this.projects = response
                        console.log(response)
                        console.log("got projects")

                    },
                    error => {
                        console.log("couldnt get projects")
                    }
                )
            },
            getUsers() {
                this.$store.dispatch("jiraUsers").then(
                    response => {
                        this.users = response
                        console.log(response)
                        console.log("got users")

                    },
                    error => {
                        console.log("couldnt get users")
                    }
                )
            },

            async getLibrary(){
                return new Promise((resolve, reject) => {
                    console.log("in get sample")
                    this.$store
                    .dispatch("loadData", {
                        app: this.app,
                        type: "detail",
                        model: "library",
                        token: localStorage.getItem("user-token"),
                        pk: this.info.relations.library.selected,
                    })
                    .then(
                        response => {
                            console.log(response)
                            this.libraryName = response[this.$store.state.structure[this.app]["library"]["name"]]
                            console.log(this.libraryName)
                            console.log("ok")
                            resolve(this.libraryName)
                        },
                        error => {
                            console.log("failed to get sample")
                            reject("not ok")
                        }
                    )
                })

            }

        }
    };
</script>                          
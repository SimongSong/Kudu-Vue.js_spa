<template>
    <v-container fluid>  
        <v-card flat>
            <v-card-title>
                <h2 :class="`display-2 font-weight-light mb-4`" :style="{'color':colour}">Confirm</h2>
            </v-card-title>
        </v-card>
        <v-form class="pl-4 pr-4" >
            <v-text-field
                :value="getTitle"
                id="title"
                label="Title"
                name="title"
                readonly
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
    import { BASE_URL, COLOSSUS_URL } from '../helpers/util';
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
                jiraTicket: "",
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
                    if (this.info.fields.title.value) {
                        this.defaultTitle = this.info.fields.title.value
                    }
                    else if (this.info.relations.sample.selected && this.info.fields.pool_id.value && this.info.fields.description.value) {
                        this.getSample
                        this.defaultTitle = `${this.sampleName} - ${this.info.fields.pool_id.value} - ${this.info.fields.description.value}`                   
                    }
                }
                else if (this.model === "analysis") {
                    if (this.info.relations.library.selected && this.info.fields.aligner.value) {
                        this.getLibrary
                        this.defaultTitle = `Analysis for ${this.libraryName} with ${this.info.fields.aligner.value}`
                    }

                }
                return (this.defaultTitle)
            },
			colour() {
				return this.$store.getters.colourGetter;
            },

            getModelName() {
                if (this.model === "library") {
                    this.getSample()
                }
                else if (this.model === "analysis") {
                    this.getLibrary()
                }
            },
            async getSample(){
                return new Promise((resolve, reject) => {
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
                            resolve(this.sampleName)
                        },
                        error => {
                            console.log("failed to get sample")
                            reject("not ok")
                        }
                    )
                })

            },

            async getLibrary(){
                return new Promise((resolve, reject) => {
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
                            resolve(this.libraryName)
                        },
                        error => {
                            console.log("failed to get sample")
                            reject("not ok")
                        }
                    )
                })

            },

            getDescription() {
                const path = require('path');
                this.library = 
                this.defaultDescription = `For more information about this ${this.model}, visit ${COLOSSUS_URL}`
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
                        this.jiraTicket = response.data
                        console.log(this.jiraTicket)
                    },
                    error => {
                    }
                )

            },

            getProjects() {
                this.$store.dispatch("jiraProjects").then(
                    response => {
                        this.projects = response
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

                    },
                    error => {
                        console.log("couldnt get users")
                    }
                )
            },

        }
    };
</script>                          
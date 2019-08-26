<template>
    <v-container fluid>  
        {{this.$route.params}}  
        {{this.info.relations.sample.selected}}
        <!-- {{structure}} -->
        {{this.info.fields.pool_id.value}}
        <v-card flat>
            <v-card-title>
                <h2 :class="`display-2 font-weight-light mb-4`" :style="{'color':colour}">Confirm</h2>
            </v-card-title>
        </v-card>

        <v-form class="pl-4 pr-4" >
            <v-text-field
                id="title"
                label="Title"
                name="title"
                v-model="defaultTitle"
                clearable
            ></v-text-field>

            <v-textarea
                v-model="defaultDescription"
                label="Description"
                counter
                maxlength="120"
                full-width
                single-line
                outlined
                clearable
                no-resize
            ></v-textarea>

            <v-overflow-btn
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
            <!-- <v-select
                :items="projects"
                label="Project"
                item-text="name"
                item-value="key"
                editable
            ></v-select> -->

            <v-overflow-btn
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
            }
        },
        created() {
            this.getProjects()
            this.getUsers()
            this.sampleName = this.getSample()
            this.defaultTitle = `${this.sampleName} - ${this.info.fields.pool_id.value} - ${this.info.fields.description.value}`
            this.defaultDescription = `For more information about this ${this.model}, visit ${BASE_URL}`
            
        },
		computed: {
			colour() {
				return this.$store.getters.colourGetter;
            },
        },

        methods: {
            create() {
                var properties = {
                    title: this.defaultTitle,
                    description: this.defaultDescription,
                    project: "",
                    reporter: "",
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
            async getSample(){
                return new Promise(function (resolve, reject){
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

            }

        }
    };
</script>                          
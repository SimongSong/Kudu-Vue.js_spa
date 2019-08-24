<template>
    <v-container fluid>    
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
                label="Projects"
                :color="colour"
            ></v-overflow-btn>

            <v-overflow-btn
                class="my-2"
                :items="users"
                label="Reporter"
                :color="colour"
            ></v-overflow-btn>
        </v-form>
        <v-layout align-end justify-end>
            <v-btn class="ma-1" :color="colour" @click="create">Create</v-btn>
        </v-layout>
    </v-container>  
</template>



<script>
	import Vue from "vue";
    export default {
        name: "CreateTicket",
        props: ["title", "description"],
        data(){
            return {
                defaultTitle : "",
                defaultDescription: "",
                projects: [],
                users: ["user1", "user2", "user3"]
            }
        },
        created() {
            this.getProjects()
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
                        console.log("got projects")
                    },
                    error => {
                        console.log("couldnt get projects")
                    }
                )
            }
        }
    };
</script>                          0
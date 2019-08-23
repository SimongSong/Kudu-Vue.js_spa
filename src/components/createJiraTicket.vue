<template>
    <div>    
        <v-form >
            <v-text-field
                id="title"
                label="Summary of Ticket"
                name="title"
                v-model="defaultTitle"
            ></v-text-field>

            <v-text-field
                id="descripion"
                label="Description"
                name="description"
                v-model="defaultDescription"
                counter
            ></v-text-field>
        </v-form>
        <v-btn>Create Ticket</v-btn>
    </div>
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
            }
        }
    };
</script>
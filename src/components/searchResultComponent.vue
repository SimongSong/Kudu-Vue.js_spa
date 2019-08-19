<template>
    <div>
        <template v-if="resultsTotal === 0">
            <v-card class="ma-2" :key="model" flat style="overflow-y: auto">
                <v-card-text class="pa-2">No results for {{title}}</v-card-text>
            </v-card>
        </template>
        <template v-else>
            <template v-for="(infos, model) in resultInfo">
                <v-card class="mt-2" v-if="infos.length !==0" :key="model" flat outlined tile>
                    <v-card-text class="pa-2">
                        <h2
                            :class="` font-weight-light pink--text`"
                        >{{formatTitle(model)}} ({{resultInfo[model].length}})</h2>
                        <v-card class="pa-0" flat style="max-height: 50vh; overflow-y: auto">
                            <v-card
                                flat
                                v-for="(info, index) in infos"
                                :key="index"
                                :href="info.link"
                            >
                                <v-card-text class="pa-0">{{info.label}}</v-card-text>
                            </v-card>
                        </v-card>
                    </v-card-text>
                </v-card>
            </template>
        </template>
    </div>
</template>


<script>
import { getTitle } from "../helpers/util";
import Vue from "vue";
export default {
    name: "SearchResult",
    props: ["title", "appResults"],
    data() {
        return {
            resultInfo: {},
            modelData: {},
            hover: false
        };
    },
    created() {
        this.results = this.appResults.results;
        this.resultsTotal = this.appResults.total;
        this.models = Object.keys(this.results);

        var test = this.models.map(model => {
            this.resultInfo[model] = [];
        });
        this.getResultInfo();
    },
    computed: {
        cardStyle() {
            if (this.hover) {
                return { backgroundColor: "grey" };
            } else {
                return {};
            }
        }
    },
    methods: {
        getModel: function(app, model, pk) {
            console.log("IN GET MODEL");
            console.log(app, model, pk);
            return new Promise((resolve, reject) => {
                this.$store
                    .dispatch("loadData", {
                        app: app,
                        pk: pk,
                        model: model,
                        type: "",
                        token: localStorage.getItem("user-token")
                    })
                    .then(response => {
                        this.modelData = response;
                        console.log("THIS MODELEDKSJFLKDS");
                        resolve(this.modelData);
                    })
                    .catch(e => {
                        reject("failed");
                        console.log("failed");
                    });
            });
        },
        formatTitle: function(label) {
            return label.charAt(0).toUpperCase() + label.slice(1);
        },

        getResultInfo: async function() {
            console.log(this.models);
            for (var model in this.results) {
                for (var i = 0; i < this.results[model].length; i++) {
                    var id = this.results[model][i]["id"];
                    var label = this.results[model][i]["name"];
                    this.resultInfo[model].push({
                        id: id,
                        label: label,
                        link: `detail/${this.title}/${model}/${id}`
                    });
                }
            }
        }
    }
};
</script>

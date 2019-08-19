<template>
    <div>
        <v-card flat :loading="loading">
            <v-card-title>
                <h2 :class="`display-1 font-weight-light pink--text`">Search Results</h2>
            </v-card-title>
            <v-card-text v-if="!loading">
                <p>Found {{searchResults.total}} results for query "{{query}}"</p>
                <template>
                    <v-card flat>
                        <v-tabs
                            v-model="active_tab"
                            background-color="transparent"
                            color="white"
                            grow
                        >
                            <v-tab
                                v-for="(result, app) in results"
                                :key="app"
                            >{{ app }} ({{result["total"]}})</v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="active_tab">
                            <v-tab-item v-for="(result, app) in results" :key="app">
                                <v-card flat>
                                    <!-- todo: default to tab with greatest num of results -->
                                    <SearchResult :title="app" :appResults="result"></SearchResult>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </template>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import SearchResult from "../components/searchResultComponent";
export default {
    components: {
        SearchResult
    },
    data() {
        return {
            active_tab: null,
            query: this.$route.params.query,
            structure: {},
            results: {},
            searchResults: {},
            loading: true
        };
    },
    created() {
        console.log(this.query);
        this.$store
            .dispatch("refresh", { token: localStorage.getItem("user-token") })
            .then(
                this.$store
                    .dispatch("searchQuery", {
                        query: this.query,
                        token: localStorage.getItem("user-token")
                    })
                    .then(r => {
                        this.searchResults = r;
                        this.getResults();
                        // Only do this if we want default tab to be one with most results
                        // this.active_tab = this.getDefaultTab();
                        this.loading = false;
                    })
                    .catch(e => {
                        console.log("FIRING FAILED");
                        console.log(e);
                    })
            )
            .catch(e => {
                this.$router.push("/login");
            });
    },

    methods: {
        getResults: function() {
            for (var key in this.searchResults) {
                if (!Object.keys(this.$store.state.structure).includes(key)) {
                    continue;
                }

                this.results[key] = {};
                this.results[key]["results"] = this.searchResults[key];
                var total = 0;
                for (var model in this.searchResults[key]) {
                    total += this.searchResults[key][model].length;
                }
                this.results[key]["total"] = total;
            }
        },

        getDefaultTab: function() {
            var defaultTab = 0;
            var temp = 0;
            var i = 0;
            for (var app in this.results) {
                if (this.results[app]["total"] > temp) {
                    temp = this.results[app]["total"];
                    defaultTab = i;
                }
                i++;
            }
            return defaultTab;
        }
    }
};
</script>

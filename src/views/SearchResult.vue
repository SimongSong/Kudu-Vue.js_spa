<template>
	<div>
		<v-card flat :loading="loading">
			<v-card-title>
				<h2 :class="`display-1 font-weight-light'`" :style="{'color':colour}">Search Results</h2>
			</v-card-title>
			<v-card-text v-if="!loading">
				<p>Found {{total}} results for query "{{query}}"</p>
				

						<v-tabs v-model="active_tab" background-color="transparent" :color="colour" vertical>
							<v-tab v-for="(result, app) in results" :key="app">{{ app }} ({{getAppTotal(result)}})</v-tab>
						  
							<v-tab-item v-for="(result, app) in results" :key="app">
								<v-card flat height="calc(83vh - 45px)">
									<!-- todo: default to tab with greatest num of results -->
									<SearchResult :title="app" :total="total" :appResults="result"></SearchResult>
								</v-card>
							</v-tab-item>
						
            </v-tabs>

						
					
				
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import SearchResult from "../components/searchResultComponent";
	import { parse } from "path";
	import { version } from "punycode";
	export default {
		components: {
			SearchResult
		},
		data() {
			return {
				active_tab: null,
				results: {},
				loading: true
			};
		},
		created() {
			this.$store
				.dispatch("refresh", { token: localStorage.getItem("user-token") })
				.then(
					this.$store
						.dispatch("searchQuery", {
							query: this.query,
							token: localStorage.getItem("user-token")
						})
						.then(r => {
							this.getResults(r);
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
		computed: {
			query() {
				return this.$route.params.query;
      },
      colour() {
				return this.$store.getters.colourGetter;
			}
		},
		methods: {
			getAppTotal: function(a) {
				var total = 0;
				Object.keys(a.results).forEach(key => {
					total += a.results[key].length;
				});
				return total;
			},
			getResults: function(r) {
				this.total = r.total;
				var clone = JSON.parse(JSON.stringify(r));
				delete clone["total"];
				delete clone["query"];
				Object.keys(clone).forEach(app => {
					var temp = {
						results: clone[app]
					};
					clone[app] = temp;
				});
				this.results = clone;
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

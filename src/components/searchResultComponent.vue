<template>
	<div>
		<div v-if="total === 0">
			<v-card class="ma-2" :key="model" flat style="overflow-y: auto">
				<v-card-text class="pa-2">No results for {{title}}</v-card-text>
			</v-card>
		</div>
		<div v-else>
			<v-tabs background-color="transparent" :color="colour" vertical>
				<v-tab v-for="(infos, model) in results">{{model}} ({{results[model].length}})</v-tab>
				<v-tab-item v-for="(result, model) in results" :key="model">
					<blockquote
						class="blockquote"
						style="height: calc(90vh - 150px); width:100%; overflow-y: scroll;"
					>
						<ul style="list-style-type: none; padding-left: 0px;">
							<v-btn v-for="r in result" text width="50vh" @click="routeTo(model, r.id)">
								<span :style="{'color':colour}">ID:</span>
								{{r.id}}&emsp;
								<span :style="{'color':colour}">NAME:</span>
								{{r.name}}
							</v-btn>
						</ul>
					</blockquote>
				</v-tab-item>
			</v-tabs>
		</div>
	</div>
</template>


<script>
	import { getTitle } from "../helpers/util";
	import Vue from "vue";
	export default {
		name: "SearchResult",
		props: ["title", "appResults", "total"],

		computed: {
			colour() {
				return this.$store.getters.colourGetter;
			},
			results() {
				return this.appResults.results;
			}
		},

		methods: {
			formatTitle: function(label) {
				return label.charAt(0).toUpperCase() + label.slice(1);
			},
			routeTo: function(model, pk) {
				this.$router.push({
					name: "detail",
					params: { app: this.title, type: model, pk: pk }
				});
			}
		}
	};
</script>

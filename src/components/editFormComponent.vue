<template>
	<div>
		{{newInstance}}
		<v-tabs :color="colour" vertical>
			<v-tab>Properties</v-tab>
			<v-tab v-if="children !== undefined">Children</v-tab>
			<v-tab :disabled="typeof this.relations === 'undefined'">Relations</v-tab>
			<v-tab>SUBMIT</v-tab>
			<!-- <v-tab><v-btn @click="verifyJira">SUBMIT</v-btn></v-tab> -->
			<v-tab-item>
				<v-card flat height="calc(90vh - 70px)" style="overflow-y: scroll">
					<v-card-text>
						<SmallEditComponent :title="title" :fields="structure.fields" />
						<br />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item v-if="children !== undefined">
				<v-card flat height="calc(90vh - 70px)" style="overflow-y: scroll">
					<v-card-text>
						<SmallEditComponent v-for="c in structure.children" :title="c.title" :fields="c.fields" />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat height="calc(90vh - 70px)" width="80vw" style="overflow-y: scroll">
					<v-card-text>
						<SmallRelationEditComponent v-for="r in structure.relations" v-bind:relation="r" />
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
					<v-card v-if="(this.$store.state.structure[this.app][this.model].jira && !this.$store.state.jira.authenticated)" flat height="calc(90vh - 70px)" width="80vw">
						<Jira/>
					</v-card>
					<v-card v-else flat height="calc(90vh - 70px)" width="80vw"> 
						<v-card flat v-if="this.$store.state.structure[this.app][this.model].jira">
							<CreateTicket :structure="structure"/>
						</v-card>
						<v-card flat v-else>
							<UpdateComponent
								:title="title"
								:fields="fields"
								:children="children"
								:relations="relations"
								:structure="structure"
								:errors="errors"
							/>
						</v-card>

					</v-card>
			</v-tab-item>

		</v-tabs>
	</div>
</template>

<script>
	import SmallEditComponent from "../components/smallEditFormComponent";
	import SmallRelationEditComponent from "../components/smallRelationEditFormComponent";
	import UpdateComponent from "../components/updateEditComponent";
	import CreateTicket from "../components/createJiraTicket";
	import Jira from "../views/Jira"
	import { getTitle, createModelJSON} from "../helpers/util";
	import Vue from "vue";
	export default {
		props: ["title", "fields", "children", "relations", "schoolings", "new", "isCreate"],
		name: "EditComponent",
		components: {
			SmallEditComponent,
			SmallRelationEditComponent,
			UpdateComponent,
			Jira,
			CreateTicket
		},
		watch: {
			jiraAuthenticated: function() {
				console.log("jira authenticated variables changed")
			},
		},
		computed: {
			colour() {
				return this.$store.getters.colourGetter;
			},
			verifyJira: function() {
				this.jiraAuthenticated = this.$store.state.jira.authenticated;
				console.log("in verify jira")
				console.log(this.jiraAuthenticated)

				if (this.$store.state.structure[this.app][this.model]["jira"]){
					if (!this.jiraAuthenticated){
						console.log("NO JIRA!! validate now!")
					}

				}

			}
		},
		methods: {
			create() {
				console.log("FEFEC")
				try {
					console.log("FEFE")
					let data = createModelJSON(this.structure.fields, this.structure.relations, this.structure.children)
					console.log(data)
				}
				catch(e) {
					console.log("CREATE ERROR")
					this.errors = e
					this.caly ="changed"
					console.log(e)
				}
				console.log("DATA?")
				// if(data !== undefined) this.sendAxios(data)
			},
			sendAxios(data) {
					this.$store
					.dispatch("refresh", { token: localStorage.getItem("user-token") })
					.then(
						this.$store
							.dispatch("createData", {
								app: this.$route.params.app,
								type: (this.isCreate) ? "post" : "patch",
								pk: (this.isCreate) ? null : this.$route.params.pk,
								data: data,
								model: this.$route.params.type,
								token: this.$cookie.get("csrftoken")
							})
							.then(
								response => {
									this.items = response;
									this.computeHeaders();
									console.log(this.items);
								},
								error => {}
							)
					)
					.catch(e => {
						this.$router.push("/login");
					});
			},
		},
		data() {
			return {
				app: this.$route.params.app,
				model: this.$route.params.type, 
				jiraAuthenticated: false,
				errors: null,
				structure: {
					fields: JSON.parse(JSON.stringify(this.fields)),
					children:
						typeof this.children === "undefined"
							? null
							: JSON.parse(JSON.stringify(this.children)),
					relations:
						typeof this.relations === "undefined"
							? null
							: JSON.parse(JSON.stringify(this.relations)),
					schoolings:
						typeof this.schoolings === "undefined"
							? null
							: JSON.parse(JSON.stringify(this.schoolings))
				},
				submit: false,
				newInstance: this.new,
			};
		}
	};
</script>

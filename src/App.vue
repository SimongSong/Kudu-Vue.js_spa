<template>
	<v-app>
		<!-- Topnav Bar START -->
		<v-app-bar app clipped-left :color="colour" dense>
			<v-app-bar-nav-icon v-if="authorized" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="mr-12 align-center">
				<span class="title">Kudu - Colossus BETA{{colour}}</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-layout align-center style="max-width: 650px">
				<v-text-field
					v-if="authorized"
					:append-icon-cb="() => {}"
					placeholder="Search feature is not there yet..."
					single-line
					append-icon="search"
					color="white"
					hide-details
					v-model="query"
					@keyup.enter.native="searchQuery"
				></v-text-field>
			</v-layout>
		</v-app-bar>
		<!-- Topnav Bar END -->

		<!-- Sidemenu START -->
		<v-navigation-drawer v-model="drawer" app clipped>
			<SideMenu />
		</v-navigation-drawer>
		<!-- Sidemenu END -->

		<!-- Maincontent START -->
		<v-content>
			<v-container fluid fill-height>
				<v-layout child-flex>
					<v-flex>
						<router-view class="router-component" :key="$route.fullPath" />
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
		<!-- Maincontent END -->
	</v-app>
</template>

<script>
	import SideMenu from "./views/SideMenu";
	export default {
		props: {
			source: String
		},
		components: {
			SideMenu
		},
		data: () => ({
			drawer: false,
			query: ""
		}),
		created() {
			this.$vuetify.theme.dark = true;
			const tokenExist = !!(localStorage.getItem("user-token") || "");
			if (!tokenExist) {
				this.$store.commit("UPDATE_AUTH_STATUS", false);
			} else {
				this.$store.commit("UPDATE_AUTH_STATUS", true);
			}
		},
		computed: {
			authorized() {
				let val = this.$store.state.account.authenticated;
				this.drawer = false;
				return val;
			},
			colour() {
				return this.$store.getters.colourGetter;
			}
		},
		methods: {
			searchQuery() {
				if (this.query) {
					this.$router.push({
						name: "search",
						params: { query: this.query }
					});
				}
			},
		},
		mounted: function() {
			this.authorized = !!localStorage.getItem("user-token");
			console.log(`authorized: ${this.authorized}`);
		}
	};
</script>
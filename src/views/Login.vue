<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<credentialsComponent title="Login" submit="Login" :reroute="rerouteURL" :rules="rules" :action="action"></credentialsComponent>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import credentialsComponent from "../components/credentialsComponent";
export default {
	components: {
		credentialsComponent,
	},
	name: "login",
	data() {
		return {
		action: "login",
		credentialsValid: true,
		rerouteURL: "/",
		rules: {
			username: [],
			password: [
				{
					required: value => !!value || "Required",
					min: v => v.length >= 5 || "Min 8 characters",
					emailMatch: () => "The email and password you entered don't match"
				},
			]
		},
		};
	},
};
</script>

<style lang="scss" scoped>
	img {
		margin-bottom: 5px;
		max-width: 100px;
		text-align: center;
	}
</style>
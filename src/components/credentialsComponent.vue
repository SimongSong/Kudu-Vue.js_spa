<template>
    <!-- <v-dialog v-model="isModal" max-width="600px"> -->
        <v-container class="pa-0" fluid fill v-if="showCard">
            <v-alert dense outlined type="error" v-if="!credentialsValid">Invalid username or password</v-alert>
                <v-card class="elevation-12" style="align: center" :loading="loading">
                    <v-toolbar color="#E91E63" flat>
                        <v-toolbar-title>{{title}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form >
                            <v-text-field
                                prepend-icon="person"
                                v-model="account.username"
                                label="Username"
                                v-on:keyup.enter="submitAction"
                            ></v-text-field>

                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="lock"
                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                :type="show ? 'text' : 'password'"
                                v-model="account.password"
                                :rules="rules.password"
                                counter
                                @click:append="show = !show"
                                v-on:keyup.enter="submitAction"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submitAction">{{submit}}</v-btn>
                    </v-card-actions>
                </v-card>
        </v-container>
    <!-- </v-dialog> -->
</template>

<script>
    import { BASE_URL } from '../helpers/util'
	import Vue from "vue";
	export default {
        name: "credentialsComponent",
		props: ["rules", "title", "submit", "action", "reroute"],
		computed: {},
		methods: {
			submitAction() {
                this.loading = true;
				this.$store.dispatch(this.action, this.account).then(
					response => {
                        this.loading = false;
                        if (this.reroute) {
                            this.$router.push(this.reroute);
                        }

                        console.log("jira authenticated?")
                        console.log(this.$store.state.jira.authenticated)
                        console.log("STOP SHOWING CARD")
                        this.showCard = false;
                        console.log(this.showCard)
					},
					error => {
                        this.loading = false;
                        console.log("wrong!")
						this.credentialsValid = false;
					}
                );
			}
		},
		data() {
			return {
				show: false,
                credentialsValid: true,
                account: {
                    username: "",
                    password: ""
                },
                showCard: true,
                isModal: true,
                loading: false,
			};
		}
	};
</script>

<style lang="scss" scoped>
	img {
		margin-bottom: 5px;
		max-width: 100px;
		text-align: center;
	}
</style>
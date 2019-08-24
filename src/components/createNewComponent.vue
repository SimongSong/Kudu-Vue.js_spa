<template>
	<v-dialog persistent v-model="openCreate">
		<EditComponent
			:title="modelTitle"
			:fields="modelFields"
			:children="modelChildren"
			:relations="modelRelations"
			:new="true"
		/>
		<v-btn @click="closeCreate">CLOSE THIS MONSTROSITY</v-btn>
	</v-dialog>
</template>

<script>
	import EditComponent from "../components/editFormComponent";
	import {createModelJSON} from "../helpers/util"
	export default {
		name: "CreateNew",
		components: {
			EditComponent
		},
		props: ["openCreate", "closeCreate"],
		created() {
			console.log("FEFE");
		},
		computed: {
			modelTitle() {
				return this.$store.state.model.title;
			},
			modelFields() {
				return this.$store.state.model.form_fields.fields;
			},
			modelChildren() {
				return this.$store.state.model.form_fields.children;
			},
			modelRelations() {
				return this.$store.state.model.form_fields.relations;
			},
			colour() {
				return this.$store.getters.colourGetter;
			}
		}
	};
</script>

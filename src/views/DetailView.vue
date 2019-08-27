<template>
<v-card
  height="calc(100vh - 70px)"
  style="border-radius:0px;"
  v-if="modelComputed"
>
    <v-tabs
      color="white"
      right
    >
      <v-tab>Information</v-tab>
      <v-tab v-if="schoolingsExist">Additional</v-tab>
      <v-tab>Relations</v-tab>
      <v-tab>Edit</v-tab>
      <v-tab>Delete</v-tab>
      <v-tab-item>
        <v-container >
        <v-layout>
        <blockquote class="blockquote" style ="height: calc(100vh - 150px); width:100%; overflow-y: scroll;">
          <span class="display-2">{{modelTitle}} {{modelFields.id.value}}</span><br><br>
          <ul style="list-style-type: none; padding-left: 0px;">
            <li v-for="(v,k) in modelFields" class="body-1" style="clear:both;" :key="k">
              <div style="float: left; width: 30%;"><b>{{titleEdit(k)}}: </b></div>
              <div style="float: left; width: 50%;">{{printNone(v.value)}}</div>
              <v-divider></v-divider>
            </li>
          </ul>
          <br>
          <br>
          <div style="margin-top:20px;" v-for="(v,k) in modelChildren" :key="k">
            <span class="display-1" :style="{color: $store.getters.colourGetter}">{{v.title}}</span><br>
              <ul style="list-style-type: none; padding-left: 0px;">
                <li v-for="(value,title) in v.fields" class="body-1" style="clear:both;" :key="title">
                  <div style="float: left; width: 30%;"><b>{{titleEdit(title)}}: </b></div>
                  <div style="float: left; width: 50%;">{{printNone(value.value)}}</div>
                  <v-divider></v-divider>
                </li>
              </ul><br>
            <v-divider></v-divider>
          </div>
        </blockquote>
        </v-layout>
        </v-container>
      </v-tab-item>
      
      <v-tab-item v-if="schoolingsExist">
        <v-container style="height: calc(90vh - 70px); overflow-y: scroll;">
        <SchoolingComponent :schoolings="modelSchoolings" />
        </v-container>
      </v-tab-item>

      <v-tab-item>
      <v-container style="height: calc(90vh - 70px); overflow-y: scroll;">
        <ListComponent :relations="modelRelations"  />        
      </v-container >
      </v-tab-item>
      <v-tab-item style="height: calc(90vh - 70px);">
        <EditComponent :title="modelTitle" :fields="modelFields" :children="modelChildren" :relations="modelRelations" :new="false"/>
      </v-tab-item>

			<v-tab-item>
				<v-container style="height: calc(90vh - 70px); overflow-y: scroll;">
					<ListComponent :relations="modelRelations" />
				</v-container>
			</v-tab-item>

			<v-tab-item style="height: calc(90vh - 70px);">
				<EditComponent
					:title="modelTitle"
					:fields="modelFields"
					:schoolings="schoolingsExist ? modelSchoolings : undefined"
					:children="modelChildren"
					:relations="modelRelations"
          :new="false"
					:isCreate="false"
				/>
			</v-tab-item>

			<v-tab-item>
				<v-card flat>
					<v-card-text>
						<div class="headline font-weight-light" :style="{'color':colour}">Are you sure?</div>
						<div
							class="display-1 font-weight-light"
						>Other related entries can be affected by this deletion.</div>
					</v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>


<script>
import {titleEdit, printNone} from "../helpers/util"
import ListComponent from "../components/detailPageListComponent"
import EditComponent from "../components/editFormComponent"
import SchoolingComponent from "../components/schoolingComponent"
export default {
  name: 'detail',
  components: {
    ListComponent,
    EditComponent,
    SchoolingComponent
  },
  data: () => ({
    detailData: {},
  }),
  methods: {
    titleEdit: titleEdit,
    printNone: printNone,
    ifObjectNotEmpty() {
      Object.keys(yourObject).length === 0
    },
    
  },
  created () {
    this.$store.dispatch('refresh',{token : localStorage.getItem('user-token')})
    .then(
      this.$store.dispatch('loadData',{
        app: this.$route.params.app, 
        type: "detail", 
        pk: this.$route.params.pk,  
        model: this.$route.params.type,
        token : localStorage.getItem('user-token')
      })
    ).catch( e => { this.$router.push('/login') } )
  },
  computed: {
    colour() {  return this.$store.getters.colourGetter },
    modelComputed () {
      if (this.$store.state.model.form_fields === undefined) return false
      return Object.keys(this.$store.state.model.form_fields).length !== 0
    },
    modelTitle () { return this.$store.state.model.title },
    modelFields(){ return this.$store.state.model.form_fields.fields },
    modelChildren(){ 
      return this.$store.state.model.form_fields.children
    },
    modelRelations(){ return this.$store.state.model.form_fields.relations },
    schoolingsExist(){ return ('schoolings' in this.$store.state.model.form_fields) ? true : false },
    modelSchoolings(){ return this.$store.state.model.form_fields.schoolings },
    isEditable () { return this.$store.state.model.noteditable }
  },
}
</script>
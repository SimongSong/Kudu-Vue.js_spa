 <template>
	<v-simple-table v-if="Object.keys(structure).length !== 0">
		<thead>
			<tr>
				<th />
				<th v-for="c in colnames" class="text-left">
					<b>{{c}}</b>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="r in rownames">
				<td>
					<b>{{r}}</b>
				</td>
				<td v-for="v in structure">{{v[r]}}</td>
			</tr>
		</tbody>
	</v-simple-table>
</template>

  <script>
	export default {
		name: "",
		props: ["structure"],
		computed: {
			colnames() {
				return Object.keys(this.structure);
			},
			rownames() {
				return Object.keys(this.structure[this.colnames[0]]);
			}
		}
	};
</script>
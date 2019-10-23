<template>
 <v-container style="max-width: 900px;">
    <h1>Tasks done</h1>

    <v-card 
    v-for="t in tasks"
    :key="t.taskId">
        <v-card-title>{{ t.taskTitle }}</v-card-title>
        <v-card-title>{{ t.taskDescription }}</v-card-title>
        <v-card-actions><v-btn icon><v-icon>{{ t.taskDone }}</v-icon></v-btn></v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data: () => ({
      tasks: [],
      events: [{taskId:null, taskTitle:null, taskDescription:null, taskDone: null, taskDate:null}],
      taskTitle: "",
      taskDescription: "",
      taskDone: "",
      taskDate: "null",
    }),

    mounted() {
      axios.get('http://localhost:4000/api/findDone')
        .then(response => {
          this.tasks = response.data
        })
    },
}
</script>
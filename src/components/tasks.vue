<template>
  <div>
    <v-card
      class="mx-auto mt-5 justify-space-between"
      color="#26c6da"
      dark
      max-width="600" 
      v-for="t in tasks"
      :key="t.taskId"
    >
      <v-card-title>
        <v-icon
          large
          left
        >
          mdi-alert-circle
        </v-icon>
        <span class="title font-weight-light" v-text="t.taskTitle"></span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold" v-text="t.taskDescription"></v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src=""
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">mdi-clock</v-icon>
            <span class="subheading">{{ t.taskDate | formatDate }}</span>
            <v-card-actions>
            <v-btn text @click="taskCompleted">Fermer la tâche</v-btn>
          </v-card-actions>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
import { timeout } from 'q'
  export default {
    data: () => ({
      tasks: [],
      events: [{taskId:null, taskTitle:null, taskDescription:null, taskDate:null}],
      taskTitle: "",
      taskDescription: "",
      taskDate: "null",
      nonce: 0,
    }),

    mounted() {
      axios.get('http://localhost:4000/api/')
        .then(response => {
          this.tasks = response.data
        })
    },

    computed: {
      
    },

    methods: {
    
      taskCompleted() {
        this.tasks.splice(event.taskId)
      }
    },
  }
</script>
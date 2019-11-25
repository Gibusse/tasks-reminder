<template>
 <v-container fluid>
    <h1 align="center">Tâche effectuée et à vérifier</h1>
    <v-row class="mx-auto mt-5 justify-space-between">
      <v-card 
        v-for="t in tasks"
        :key="t.taskId"
        color="#32cd32"
        dark
        max-width="600px">
          <v-card-title>
            <v-icon
            large
            left
          >
            mdi-alert-circle
          </v-icon>
            <span class="title font-weight-light">{{ t.taskTitle }}</span>
          </v-card-title>
          <v-card-text class="headline font-weight-bold">{{ t.taskDescription }}</v-card-text>
                <v-card-actions>
        <v-list-item class="grow">
          <v-icon class="mr-1">mdi-account-clock</v-icon>
          <v-list-item-content>
            <v-list-item-title v-if="t.taskLevel == 1">Urgent</v-list-item-title>
            <v-list-item-title v-if="t.taskLevel == 0">Normal</v-list-item-title>
          </v-list-item-content>

          <v-icon class="mr-1">mdi-account</v-icon>
          <v-list-item-content>
            <v-list-item-title>{{ t.employeeName }}</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <span>DeadLine :</span>
            <v-icon class="mr-1">mdi-calendar</v-icon>
            <span class="subheading">{{ t.taskDeadLine | formatDate }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>

      <v-card-actions>
        <v-list-item class="grow">
            <span>Date d'ajout :</span>
            <v-icon class="mr-1">mdi-calendar</v-icon>
            <span class="subheading">{{ t.taskDate | formatDate }}</span>
          <v-row
            align="center"
            justify="end"
          >
          <v-card-actions>
            <v-btn class="ml-2" color="red" text @click="taskNotCompleted(t)">Tâche à refaire</v-btn>
          </v-card-actions>
            <v-card-actions>
            <v-btn text @click="taskCompleted(t)">Fermer la tâche</v-btn>
          </v-card-actions>
          </v-row>
        </v-list-item>
      </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      tasks: [],
      employees: [],
      events: [{taskId:null, taskTitle:null, taskDescription:null, taskDone: null, taskDate:null}],
      taskTitle: "",
      taskDescription: "",
      taskDone: "",
      taskDate: "null",
      taskLevel: "null",
      employeeId: 0,
      employeeName: null,
      userId: 0,
      taskDeadLine: "",
    }),

    mounted() {
      if (!this.$localStorage.get('user')) this.$router.push('/')

      this.user = this.$localStorage.get('user')
      
      axios.get(configuration.host+configuration.port + configuration.api +'findDone')
        .then(response => {
          this.tasks = response.data
        });
    },

    methods: {
      // Tâche validée
      taskCompleted(t) {
        let data = {
          taskVerified: 1,
          taskId: t.taskId
        }

        axios.put(configuration.host + configuration.port + configuration.api + 'verified/'+t.taskId, data)
        .then(response => {
          let res = response.data;
          if(res.affectedRows === 1) {
              swal("Succès", "Tâche validée !!!", "success");

              axios.get(configuration.host+configuration.port + configuration.api +'findDone')
              .then(response => {
                this.tasks = response.data
              })
            }
        },
        error => {
          console.log('error :',error)
        })
      },

      // Tâche à refaire 
      taskNotCompleted(t) {
        let data = {
          taskDone: 0,
          taskId: t.taskId
        }

        axios.put(configuration.host + configuration.port + configuration.api + 'undone/'+ t.taskId, data)
        .then(response => {
          let res = response.data;
          if(res.affectedRows === 1) {
              swal("Succès", "Tâche annulée et à refaire !!!", "success");

              axios.get(configuration.host+configuration.port + configuration.api +'findDone')
              .then(response => {
                this.tasks = response.data
              })
            }
        },
        error => {
          
        })
      }
    }
}
</script>
<template>
  <v-container fluid>
    <v-row>
    <v-col cols="6">  
      <h1>Tâches à faire</h1>    
      <v-card 
      class="mx-auto mt-5 justify-space-between"
      color="#daa520"
      dark
      max-width="600px"
      v-for="t in tasksNotUrgents"
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
          <v-icon class="mr-1">mdi-account-clock</v-icon>
          <v-list-item-content>
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
            <span class="subheading"> {{ t.taskDate | formatDate }}</span>


          <v-row
            align="center"
            justify="end"
          >
            <v-card-actions>
            <v-btn text @click="taskCompleted(t)">Fermer la tâche</v-btn>
          </v-card-actions>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    </v-col>
    <v-col cols="1"></v-col>
    <v-col cols="5">
      <h1>Tâches à faire en urgence</h1>
      <v-card 
      class="mx-auto mt-5 justify-space-between"
      color="#b52e31"
      dark 
      max-width="600px"
      v-for="t in tasksUrgents"
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
          <v-icon class="mr-1">mdi-account-clock</v-icon>
          <v-list-item-content>
            <v-list-item-title v-if="t.taskLevel == 1">Urgent</v-list-item-title>
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
            <v-icon class="mr-1">mdi-c</v-icon>
            <span class="subheading">{{ t.taskDate | formatDate }}</span>
          <v-row
            align="center"
            justify="end"
          >
            <v-card-actions>
            <v-btn text @click="taskCompleted(t)">Fermer la tâche</v-btn>
          </v-card-actions>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import configuration from '@/router/constants'

  export default {
    data: () => ({
      tasksNotUrgents: [],
      tasksUrgents: [],
      taskTitle: "",
      taskDescription: "",
      taskDate: "null",
      taskLevel: "null",
      employeeId: 0,
      employeeName: null,
      userId: 0,
      taskDeadLine: "",
    }),

    mounted() {
      axios.get(configuration.host + configuration.port + configuration.api + 'notUrgent')
        .then(response => {
          this.tasksNotUrgents = response.data
        })

      axios.get(configuration.host + configuration.port + configuration.api + 'urgent')
      .then(response => {
        this.tasksUrgents = response.data
      })
    },

    methods: {
      taskCompleted(task) {
        var oldUrgents = this.tasksUrgents
        var oldTasks = this.tasksNotUrgents
        this.tasksNotUrgents = []
        this.tasksUrgents = []
        let data = {
          taskDate: task.taskDate,
          taskDescription: task.taskDescription,
          taskDone: 1,
          taskId: task.taskId,
          taskTitle: task.taskTitle,
          taskVerified: task.taskVerified,
          taskLevel: task.taskLevel,
          employeeId: 0,
          userId: 0,
          taskDeadLine: task.taskDeadLine
        }
        
        axios.put(configuration.host + configuration.port + configuration.api + 'done/'+task.taskId+'', data)
        .then(response => {
                let res = response.data;
                if(res.affectedRows === 1) {
                  swal("Succès", "Tâche archivée avec succès !!!", "success");

                  oldTasks.forEach((item, key) => {
                    if(item.taskId !== data.taskId) this.tasksNotUrgents.push(item)
                  })

                  oldUrgents.forEach((item, key) => {
                    if(item.taskId !== data.taskId) this.tasksUrgents.push(item)
                  });
                } 
                
              },
              error => {
                swal("Erreur", "La tâche n'a pas été archivée, veuillez réessayer SVP, si le problème persiste contacter votre administrateur !!!", "error");
              })

      }
    },
  }
</script>
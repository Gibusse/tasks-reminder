<template>
  <v-container style="max-width: 900px;">
    
        <v-text-field
          v-model="taskTitle"
          hide-details
          flat
          label="Leave a title..."
          solo
          @keydown.enter="comment"
        >
        </v-text-field>
        <v-text-field
          v-model="taskDescription"
          hide-details
          flat
          label="Leave a description..."
          solo
          @keydown.enter="comment"
        >
          <template v-slot:append>
            <v-btn
              class="mx-0"
              depressed
              @click="comment"
            >
              Post
            </v-btn>
          </template>
         
        </v-text-field>
  </v-container>
</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      taskTitle: "",
      taskDescription: "",
      taskDone: 0,
      taskVerified: 0,
      taskLevel : 0,
      employeeId : 0,
      userId : 0
    }),

    methods: {
          comment () {
            if(this.taskTitle === "" || this.taskTitle === null
             || this.taskDescription === "" || this.taskDescription === null) {
            swal("Erreur", "Veuillez remplir les champs !!!", "error");

            } else {
                let body = {
                        "taskTitle":this.taskTitle,
                        "taskDescription": this.taskDescription,
                        "taskDone": this.taskDone,
                        "taskVerified": this.taskVerified,
                        "taskLevel" : this.taskLevel,
                        "employeeId" : this.employeeId,
                        "userId" : this.userId,
                        "taskDeadLine" : this.taskDeadLine
                     };
                     
                axios.post(configuration.host+configuration.port + configuration.api +'add', body)
                .then(response => {
                    if(response.status === 200 && response.statusText === "OK") swal("Succès", "Tâche créée avec succès !!!", "success")

                },
                error => {
                    swal("Erreur", "Une erreur c'est produite lors de la création de la tâche !!!", "error")
                })
                
                this.taskTitle = "",
                this.taskDescription = ""
            }
            
        },
    }
    
}
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1"></v-col>

      <v-col cols="4">
        <h1>Tâches à faire</h1>
        <v-card
            max-width="344"
            v-for="t in tasksNotUrgents"
            :key="t.taskId"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{ t.taskTitle }}</v-list-item-title>
                  <v-list-item-subtitle>{{ t.taskDescription }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <span>DeadLine :</span>
                    <v-icon class="mr-1">mdi-calendar</v-icon>
                    <span class="subheading">{{ t.taskDeadLine | formatDate }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  title
                  size="20"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </div> 

            <!-- Dialog modal for details on normal priority -->
            <div class="my-2">
              <v-row justify="center">
                  <v-dialog v-model="cancel" persistent max-width="320">
                  <template v-slot:activator="{ on }">
                      <v-btn @click="show(t)" color="warning" dark v-on="on">
                          Détails
                      </v-btn>
                  </template>
                  <v-card>
                      <v-card-title
                        class="headline #daa520 lighten-2"
                        primary-title>
                        {{ task.taskTitle }}
                      </v-card-title>

                      <v-card-text>
                        <v-list-item>
                          <v-row
                            align="center"
                          >
                            <span class="subheading">{{ task.taskDescription }}</span>
                          </v-row>

                        </v-list-item>
                      </v-card-text>

                      <v-card-text>
                        <span>Date d'ajout :</span>
                        <v-icon class="mr-1">mdi-calendar</v-icon>
                        <span class="subheading"> {{ task.taskDate | formatDate }}</span>
                          <br>
                          <span v-if="t.taskLevel == 0">
                              <v-icon class="mr-1">mdi-account-clock</v-icon>
                              Niveau priorité :  Normal
                          </span>

                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon class="mr-1">mdi-account</v-icon>
                              Attribuée à: {{ task.employeeName }}
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-content>
                            <v-list-item-title>
                              <span>DeadLine :</span>
                              <v-icon class="mr-1">mdi-calendar</v-icon>
                              <span class="subheading red lighten-2">{{ task.taskDeadLine | formatDate }}</span>
                          </v-list-item-title>

                          </v-list-item-content>

                        </v-card-text>

                      <v-divider class="mx-2"></v-divider>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="disagree">Disagree</v-btn>
                      <v-btn color="green darken-1" text @click="taskCompleted(task)">Fermer la tâche</v-btn>
                      </v-card-actions>
                  </v-card>
                  </v-dialog>
              </v-row>
            </div>
          </v-card>
          <div>
            <v-pagination
              v-model="page"
              :length="tmp.total"
              @input="paginate(page)"
              circle
            ></v-pagination>
          </div>
      </v-col>
      <v-col cols="3"></v-col>

      <v-col cols="4">
        <h1>Tâches à faire en urgence</h1>
        <v-card
            max-width="344"
            color="red lighten-1"
            v-for="t in tasksUrgents"
            :key="t.taskId"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-list-item three-line>
                <v-list-item-content style="color: #ffffff">
                  <v-list-item-title class="headline mb-1">{{ t.taskTitle }}</v-list-item-title>
                  <v-list-item-subtitle style="color: #ffffff">{{ t.taskDescription }}</v-list-item-subtitle>
                  <v-list-item-subtitle style="color: #ffffff">
                    <span>DeadLine :</span>
                    <v-icon class="mr-1" style="color: #ffffff">mdi-calendar</v-icon>
                    <span class="subheading">{{ t.taskDeadLine | formatDate }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  title
                  size="20"
                  color="white"
                ></v-list-item-avatar>
              </v-list-item>
            </div>

          <!-- Dialog modal for details urgent priority -->
          <div class="my-2">
            <v-row justify="center">
                <v-dialog v-model="cancel" persistent max-width="320">
                <template v-slot:activator="{ on }">
                    <v-btn @click="show(t)" dark v-on="on">
                        Détails
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title
                      class="headline red lighten-1"
                      primary-title>
                      {{ task.taskTitle }}
                    </v-card-title>

                    <v-card-text>
                      <v-list-item>
                        <v-row
                          align="center"
                        >
                          <span class="subheading">{{ task.taskDescription }}</span>
                        </v-row>

                      </v-list-item>
                    </v-card-text>

                    <v-card-text>
                      <span>Date d'ajout :</span>
                      <v-icon class="mr-1">mdi-calendar</v-icon>
                      <span class="subheading"> {{ task.taskDate | formatDate }}</span>
                        <br>
                        <span v-if="t.taskLevel == 0">
                            <v-icon class="mr-1">mdi-account-clock</v-icon>
                            Niveau priorité :  Normal
                        </span>

                        <v-list-item-content>
                          <v-list-item-title>
                            <v-icon class="mr-1">mdi-account</v-icon>
                            Attribuée à: {{ task.employeeName }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title>
                            <span>DeadLine :</span>
                            <v-icon class="mr-1">mdi-calendar</v-icon>
                            <span class="subheading red lighten-2">{{ task.taskDeadLine | formatDate }}</span>
                        </v-list-item-title>

                        </v-list-item-content>

                      </v-card-text>

                    <v-divider class="mx-2"></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="disagree">Disagree</v-btn>
                    <v-btn color="green darken-1" text @click="taskCompleted(task)">Fermer la tâche</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <hr>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="5">
        <h1>Actualités</h1>
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
      task: {},
      page: 1,
      limit: 10,
      perPage: 10,
      pages: [],
      tmp: [],

      dialog: false,
      cancel: false
    }),

    mounted() {
      axios.get(configuration.host + configuration.port + configuration.api + 'notUrgent?page='+this.page+'&limit=2')
        .then(response => {
          this.tmp = response.data
          this.tasksNotUrgents = this.tmp.data;
        })

      axios.get(configuration.host + configuration.port + configuration.api + 'urgent')
      .then(response => {
        this.tasksUrgents = response.data
      })
    },



    methods: {
      show(t) {
            this.task = t;
        },

      disagree () {
            this.cancel = false
            axios.get(configuration.host + configuration.port + configuration.api + 'notUrgent')
              .then(response => {
                this.tasksNotUrgents = response.data
              })

            axios.get(configuration.host + configuration.port + configuration.api + 'urgent')
            .then(response => {
              this.tasksUrgents = response.data
            })
        },

      taskCompleted(task) {
        var oldUrgents = this.tasksUrgents
        var oldTasks = this.tasksNotUrgents
        this.tasksNotUrgents = []
        this.tasksUrgents = []
        let data = {
          taskDone: 1,
          taskId: task.taskId
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

      },

      paginate(page) {
        axios.get(configuration.host + configuration.port + configuration.api + 'notUrgent?page='+page+'&limit=2')
        .then(response => {
          this.tmp = response.data
          this.tasksNotUrgents = this.tmp.data;
        })
      },

      setTask() {
        let numberOfPages = Math.ceil(this.tasksNotUrgents.length / this.perPage);
        for (let i = 1; i <= numberOfPages; i++) {
          this.pages.push(i)
        }
      }
    },

    computed: {
      displayedTask() {
        return this.paginate(this.tasksNotUrgents)
      }
    },

    watch: {
      articles() {
        this.setTask();
      }
    }
  }
</script>
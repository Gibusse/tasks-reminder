<template>
  <v-container style="max-width: 600px;">
    <v-timeline  clipped>
      <v-timeline-item
        fill-dot
        class="white--text mb-12"
        color="normal"
        large
      >
        <template v-slot:icon>
          <span>JL</span>
        </template>
        <v-text-field
          v-model="title"
          hide-details
          flat
          label="Leave a title..."
          solo
          @keydown.enter="comment"
        >
        </v-text-field>
        <v-text-field
          v-model="taskName"
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
      </v-timeline-item>

      <v-slide-x-transition
        group
      >
        <v-timeline-item
          v-for="event in tasks"
          :key="event.taskId"
          color="red lighten-2"
          large
        >

        <template v-slot:opposite>
          <span
            v-text="event.taskDate"
          ></span>
        </template>

        <v-card class="elevation-2">
          <v-card-title v-text="event.title" class="headline"></v-card-title>
          <v-card-text v-text="event.taskName"></v-card-text>
          <v-btn class="text-right" color="primary" @click="taskCompleted">Fermer la tâche</v-btn>
        </v-card>
        </v-timeline-item>
      </v-slide-x-transition>

      <v-timeline-item
        class="mb-6"
        hide-dot
      >
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      tasks: [],
      events: [{taskId:null, title:null, taskName:null, taskDate:null}],
      taskName: "",
      title: "",
      nonce: 0,
    }),

    mounted() {
      axios.get('http://localhost:4000/api/')
        .then(response => {
          this.tasks = response.data
        })
    },

    /* computed: {
      timeline () {
        return this.tasks.slice().reverse()
      },
    }, */

    methods: {
      comment () {
        const time = (new Date()).toTimeString()
        if(this.title === "" || this.taskName === "") {
          swal("Erreur", "Veuillez remplir les champs !!!", "error");

        } else {
            this.tasks.push({
            taskId: this.nonce++,
            title: this.title,
            taskName: this.taskName,
            taskDate: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
              return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
            }),
          })

          this.taskName = null,
          this.title = null
        }
        
      },

      taskCompleted() {
        this.tasks.splice(event.taskId)
      }
    },
  }
</script>
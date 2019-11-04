<template>
  <v-container style="max-width: 900px;">
    
        
        <v-form
        ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="taskTitle"
            :counter="25"
            :rules="titleRules"
            label="Tire"
            required
          ></v-text-field>

          <v-text-field
            v-model="taskDescription"
            :counter="255"
            :rules="descriptionRules"
            label="Description"
            required
          ></v-text-field>

          <v-select
            v-model="empl"
            :items="this.employees"
            item-text="employeeName"
            :rules="[v => !!v || 'Item is required']"
            label="Liste employés"
            return-object
            single-line
            required
          ></v-select>
          
          <v-date-picker
            v-model="taskDeadLine"
            :rules="deadLineRules"
            label="DeadLine"
            required
          ></v-date-picker>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
            color="warning"
            @click="resetValidation"
          >
            Reset Validation
          </v-btn>
      </v-form>

  </v-container>
</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      employees: [],
      taskTitle: "",
      taskDescription: "",
      taskDone: 0,
      taskVerified: 0,
      taskLevel : 0,
      employeeId : 0,
      userId : 0,
      taskDeadLine: null,
      empl:{employeeId:0, employeeName: null, employeeFirstName: null, employeeEmail: null},

      valid: true,
      titleRules: [
        v => !!v || 'title is required',
        v => (v && v.length <= 25) || 'title must be less than 25 characters',
      ],

      descriptionRules: [
        v => !!v || 'description is required',
        v => (v && v.length <= 255) || 'description must be less than 255 characters',
      ],

      deadLineRules: [
        v => !!v || 'DeadLine is required',
        v => (v && v.length <= 25) || 'DeadLine must be a date',
      ],

      select: null,
      checkbox: false,
    }),

    

    mounted() {
      if (!this.$localStorage.get('user')) this.$router.push('/')

      axios.get(configuration.host+configuration.port + configuration.api +'employeesList')
        .then(response => {
          this.employees = response.data
        });

      this.user = this.$localStorage.get('user')
    },

    methods: {
        validate () {
        if (this.$refs.form.validate()) {
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
                        "employeeId" : this.empl.employeeId,
                        "userId" : this.user,
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
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    }
    
}
</script>
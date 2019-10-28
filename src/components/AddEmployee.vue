<template>
<div>
    <v-row justify="space-around">
      <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
    </v-row>
    <v-form 
      ref="form"
      v-model="valid">
      <v-container style="max-width: 900px;">
        <h1>Ajouter un employé</h1>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="employeeFirstName"
              :rules="firstnameRules"
              :counter="20"
              label="Prénom employé"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="employeeName"
              :rules="nameRules"
              :counter="15"
              label="Nom employé"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="employeeEmail"
              :rules="emailRules"
              label="E-mail"
              @keydown.enter="validate"
              required
            ></v-text-field>
          </v-col>

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
        </v-row>
      </v-container>
    </v-form>
</div>
    
</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      employeeName: "",
      employeeFirstName: "",
      employeeEmail: "",
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 15 || 'Name must be less than 10 characters',
      ],
      firstnameRules: [
        v => !!v || 'FirstName is required',
        v => v.length <= 20 || 'FirstName must be less than 10 characters',
      ],
      employeeEmail: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }),


    methods: {
      reset () {
        this.$refs.form.reset()
      },

      resetValidation () {
        this.$refs.form.resetValidation()
      },

      validate () {
        if(this.$refs.form.validate()) {
            let body = {
                    "employeeName":this.employeeName,
                    "employeeFirstName":this.employeeFirstName,
                    "employeeEmail": this.employeeEmail
                  };
                  
            axios.post(configuration.host+configuration.port + configuration.api +'addEmployee', body)
            .then(response => {
                if(response.status === 200 && response.statusText === "OK") swal("Succès", "Employé ajouté avec succès !!!", "success")

            },
            error => {
                swal("Erreur", "Une erreur c'est produite lors de l'ajout de l'employé !!!", "error")
            })
            
            this.employeeName = "",
            this.employeeFirstName = "",
            this.employeeEmail = ""
        }
      }
    }
}
</script>
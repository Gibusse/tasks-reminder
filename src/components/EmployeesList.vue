<template>
    <v-container style="max-width: 900px;">
    <div>
        <v-simple-table>

            <template
                v-slot:default>
                <thead>
                    <th class="text-center">Nom employé</th>
                    <th class="text-center">Prénom</th>
                    <th class="text-center">Email employé</th>
                    <th colspan="2" class="text-center">Actions</th>
                </thead>

                <tbody>
                    <tr
                        v-for="e in employees"
                        :key="e.employeeId">
                        <td>{{ e.employeeName }}</td>
                        <td>{{ e.employeeFirstName }}</td>
                        <td>{{ e.employeeEmail }}</td>
                        <td>
                            <div class="my-2">
                                   
                                <v-row justify="center">
                                    <v-form>
                                        <v-dialog v-model="dialog" persistent max-width="600px">
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="orange" dark v-on="on">
                                                    <v-icon class="mr-1">mdi-file-document-edit-outline</v-icon>
                                                    Modifier
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                <span class="headline">User Profile</span>
                                                </v-card-title>
                                                <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field label="Nom*" v-model="e.employeeName" required>{{ e.employeeName }}</v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field label="Prénom*" v-model="e.employeeFirstName" required>{{ e.employeeFirstName }}</v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field label="Email*" v-model="e.employeeEmail" required>{{ e.employeeEmail }}</v-text-field>
                                                    </v-col>
                                                    
                                                    </v-row>
                                                </v-container>
                                                <small>*indicates required field</small>
                                                </v-card-text>
                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                                <v-btn color="blue darken-1" text @click="save(e)">Save</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                </v-form>
                            </v-row>
                            </div>
                        </td>
                        <td>
                            <div class="my-2">

                                <v-row justify="center">
                                    <v-dialog v-model="cancel" persistent max-width="320">
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="error" dark v-on="on">
                                            <v-icon class="mr-1">mdi-delete</v-icon>
                                            Supprimer
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer cet employé ?</v-card-title>
                                        <v-card-text>{{ e.employeeName }}</v-card-text>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="disagree">Disagree</v-btn>
                                        <v-btn color="green darken-1" text @click="remove(e)">Supprimer</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </v-row>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>


    </div>
    </v-container>

</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      employees: [],
      employeeName: "",
      employeeFirstName: "",
      employeeEmail: "",

      dialog: false,
      cancel: false
    }),

    mounted() {
      axios.get(configuration.host+configuration.port + configuration.api +'employeesList')
        .then(response => {
          this.employees = response.data
        })
    },

    methods: {
        save(t) {
            if(t.employeeName === "" || t.employeeName === null
                || t.employeeFirstName === "" || t.employeeFirstName === null
                || t.employeeEmail === "" || t.employeeEmail === null) {
                swal("Erreur", "Veuillez remplir les champs !!!", "error");

            } else {
                
                this.dialog = false
                let body = {
                        "employeeId":t.employeeId,
                        "employeeName": t.employeeName,
                        "employeeFirstName": t.employeeFirstName,
                        "employeeEmail": t.employeeEmail
                     };
                     
                axios.post(configuration.host+configuration.port + configuration.api +'add/'+ t.employeeId +'', body)
                .then(response => {
                    if(response.status === 200 && response.statusText === "OK") swal("Succès", "Mise à jour de l'employé effectuée avec succès !!!", "success")

                    axios.get(configuration.host+configuration.port + configuration.api +'employeesList')
                    .then(response => {
                        this.employees = response.data
                    })

                },
                error => {
                    swal("Erreur", "Une erreur c'est produite lors de la mise à jour de l'employé !!!", "error")
                })
                
            }
        },

        remove(e) {
            this.cancel = false

            axios.post(configuration.host+configuration.port + configuration.api +'/deleteEmployee/'+ e.employeeId +'', e.employeeId)
                .then(response => {
                    if(response.status === 200 && response.statusText === "OK") swal("Succès", "Mise à jour de l'employé effectuée avec succès !!!", "success")

                },
                error => {
                    swal("Erreur", "Une erreur c'est produite lors de la mise à jour de l'employé !!!", "error")
                })
        },

        disagree () {
            this.cancel = false
            axios.get(configuration.host+configuration.port + configuration.api +'employeesList')
            .then(response => {
                this.employees = response.data
            })
        }
    }
}
</script>
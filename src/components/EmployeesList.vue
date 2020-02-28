<template>
    <v-container fluid style="max-width: 900px;">
        <v-row class="mx-auto mt-5 justify-space-between">
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
                                v-for="em in employees"
                                :key="em.employeeId">
                                <td>{{ em.employeeName }}</td>
                                <td>{{ em.employeeFirstName }}</td>
                                <td>{{ em.employeeEmail }}</td>
                                <td> 
                                </td>
                                <td>
                                    <div class="my-2">
                                        <v-row justify="center">
                                            <v-form>
                                                <v-dialog v-model="dialog" persistent max-width="600px">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn color="orange" @click="show(em)" dark v-on="on">
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
                                                                        <v-text-field label="Nom*" v-model="employee.employeeName" required>{{ employee.employeeName }}</v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12">
                                                                        <v-text-field label="Prénom*" v-model="employee.employeeFirstName" required>{{ employee.employeeFirstName }}</v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12">
                                                                        <v-text-field label="Email*" v-model="employee.employeeEmail" required>{{ employee.employeeEmail }}</v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                            <small>*indicates required field</small>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                                        <v-btn color="blue darken-1" text @click="update(employee)">Update</v-btn>
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
                                                <v-btn @click="show(em)" color="error" dark v-on="on">
                                                    <v-icon class="mr-1">mdi-delete</v-icon>
                                                    Supprimer
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title class="headline">Êtes-vous sûr de vouloir supprimer cet employé ?</v-card-title>
                                                <v-card-text>{{ employee.employeeName }}</v-card-text>
                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" text @click="disagree">Disagree</v-btn>
                                                <v-btn color="green darken-1" text @click="remove(employee)">Supprimer</v-btn>
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
        </v-row>

    </v-container>

</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      employees: [],
      employee: {},
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
        show(em) {
            this.employee = em;
        },

        update(em) {
            if(em.employeeName === "" || em.employeeName === null
                || em.employeeFirstName === "" || em.employeeFirstName === null
                || em.employeeEmail === "" || em.employeeEmail === null) {
                swal("Erreur", "Veuillez remplir les champs !!!", "error");

            } else {

                this.dialog = false
                let body = {
                        "employeeId":em.employeeId,
                        "employeeName": em.employeeName,
                        "employeeFirstName": em.employeeFirstName,
                        "employeeEmail": em.employeeEmail
                     };

                axios.patch(configuration.host+configuration.port + configuration.api +'updateEmployee/'+ em.employeeId, body)
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

        remove(em) {
            this.cancel = false

            let body = {
                "employeeId":em.employeeId,
            }

            axios.delete(configuration.host+configuration.port + configuration.api +'deleteEmployee/'+ em.employeeId)
                .then(response => {
                    if(response.status === 200 && response.statusText === "OK") swal("Succès", "Suppression de l'employé effectuée avec succès !!!", "success")

                    axios.get(configuration.host+configuration.port + configuration.api +'employeesList')
                    .then(response => {
                        this.employees = response.data
                    })

                },
                error => {

                    swal("Erreur", "Une erreur c'est produite lors de la suppression de l'employé !!!", "error")
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
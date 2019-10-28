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
                                <v-btn color="orange">
                                <v-icon class="mr-1">mdi-file-document-edit-outline</v-icon>
                                    Modifier
                                </v-btn>
                            </div>
                        </td>
                        <td>
                            <div class="my-2">
                                <v-btn color="error">
                                    <v-icon class="mr-1">mdi-delete</v-icon>
                                    Supprimer
                                </v-btn>
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
      employeeEmail: ""
    }),

    mounted() {
      axios.get(configuration.host+configuration.port + configuration.api +'employessList')
        .then(response => {
          this.employees = response.data
        })
    },
}
</script>
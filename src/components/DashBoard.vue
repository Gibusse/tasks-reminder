<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span  class="font-weight-bold" text>Tasks reminder</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <h1>Dashboard</h1>
      <v-spacer></v-spacer>

      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
      <v-row justify="space-around">
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition">
        <template v-slot:activator="{ on }">
          <router-link to="/dashboard/tasksDone" tag="span"><v-btn><v-icon class="mr-1">mdi-calendar-check</v-icon>Liste des tâches</v-btn></router-link>
          <router-link to="/dashboard/addTask" tag="span"><v-btn><v-icon class="mr-1">mdi-calendar-plus</v-icon>Ajouter une tâche</v-btn></router-link>
          <router-link to="/dashboard/addEmployee" tag="span"><v-btn><v-icon class="mr-1">mdi-account-plus</v-icon>Ajouter un employé</v-btn></router-link>
          <router-link to="/dashboard/listEmployees" tag="span"><v-btn><v-icon class="mr-1">mdi-account-group</v-icon>Liste des employés</v-btn></router-link>
        </template>
        </v-menu>
      </v-row>

    <v-content fluid>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import configuration from '@/router/constants'

export default {
    data: () => ({
      
    }),

    mounted() {
      if (!this.$localStorage.get('user')) this.$router.push('/')
    },
    
    methods: {
        logout() {
            this.$router.push('/');
            this.$localStorage.remove('user')
        }
    }
}
</script>
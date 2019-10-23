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

    <v-content fluid>
      <v-row justify="space-around">
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition">
        <template v-slot:activator="{ on }">
          <router-link to="/dashboard/addTask" tag="span"><v-btn>Add task</v-btn></router-link>
          <router-link to="/dashboard/tasksDone" tag="span"><v-btn>List of all tasks</v-btn></router-link>  
        </template>
        </v-menu>
      </v-row>
 
 
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data: () => ({

    }),

    mounted() {

    },

    methods: {
        logout() {
            this.$router.push('/');
        }
    }
}
</script>
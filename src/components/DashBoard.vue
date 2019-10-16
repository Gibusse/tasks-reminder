<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span  class="font-weight-bold" text>Tasks reminder</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-content fluid>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data: () => ({

    }),

    methods: {
        logout() {
            this.$router.push('/');
        }
    }
}
</script>
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" tag="span"><v-btn  class="font-weight-bold" text>Tasks reminder</v-btn></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        src="./assets/Logo_Bec.png"
        aspect-ratio="0"
        class="grey lighten-2"
      ></v-img>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <router-link to="/login" tag="span"><v-btn text>Login</v-btn></router-link>
    </v-app-bar>

    <v-content fluid>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>



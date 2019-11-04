<template>
    <div class="text-md-center">
        <v-container style="max-width: 600px;">
             <h2>Login</h2>
            <v-layout>
                <v-flex xs6 offset-xs3>
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                v-model="login.username"
                                label="username"
                                required
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="login.password"
                                label="password"
                                type="password"
                                required
                            >
                            </v-text-field>
                        </v-card-text>

                        <v-btn class="mb-3" color="success" @click="loginUser()">Login</v-btn>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template> 

<script>
import configuration from '@/router/constants'
export default {

    data() {
        return {
            login: {
                username: "",
                password: ""
            }
        }
    },

    methods: {
        loginUser() {
            if(this.login.username === "" || this.login.password === "") {
                swal("Erreur", "Veuillez remplir les champs !!!", "error");

            } else {
                axios.post(configuration.host+ configuration.port + configuration.api +'login', this.login)
            .then(response => {
                let res = response;
                let user = res.data[0].userId;
                
                this.$localStorage.set('user', user)

                if(res.status === 200) this.$router.push('/dashboard');
            }, error => {
                swal("Erreur de connexion", "L'utilisateur n'existe pas !!!", "error");
            })
            
            }
            
        }
    }
}
</script>
<template>
    <div class="text-md-center">
        <v-container style="max-width: 600px;">
            <h2>Register</h2>
            <v-layout>
                <v-flex xs6 offset-xs3>
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                v-model="register.username"
                                label="Username"
                                required
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="register.email"
                                label="Email"
                                type="email"
                                required
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="register.password"
                                label="Password"
                                type="password"
                                required
                            >
                            </v-text-field>
                        </v-card-text>

                        <v-btn class="mb-3" color="success" @click="registerUser()">Register</v-btn>

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
            register: {
                username: "",
                email: "",
                password: ""
            }
        }
    },
    methods:{
       registerUser(){
            axios.post(configuration.host + configuration.port + configuration.api +'register', this.register)
            .then(response => {
                let res = response.data
                if(affectedRows === 1) this.$router.push('/')
            });
       }
    }

    
}
</script>
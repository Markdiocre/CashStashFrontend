<template>
    <ion-page>
        <div class="page">
            <div class="logo">
                <ion-img src="src\assets\impok_white.png"></ion-img>
            </div>
            <div class="login-modal">
                <div>
                    
                    <ion-input v-model="username" class="custom" type="text" label="Username"
                        label-placement="floating" autocomplete="off"></ion-input>
                    <ion-input v-model="password" class="custom" type="password" label="Password"
                        label-placement="floating"></ion-input>
                    <ion-button expand="full" class="custom" size="large" @click="login">LOGIN</ion-button>
                </div>
                <div>
                    <p>Dont have an account yet? <router-link :to="{ name: 'register' }">REGISTER</router-link></p>
                </div>


            </div>

        </div>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonInput, IonButton, useIonRouter, loadingController , IonImg} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from "axios";

import { presentToast } from '@/modules/Toasts'
import { setToken } from '@/modules/Token';

export default defineComponent({
    components: {
        IonPage,
        IonInput,
        IonButton,
        useIonRouter,
        IonImg
    },
    data() {
        return {
            username: '',
            password: '',
        }
    }, methods: {
        async login() {
            const load = await loadingController.create({})
            await load.present()
            axios.post("auth/token/login/",{
                username: this.username,
                password: this.password
            }).then(async (res)=>{
                presentToast("Succesfully logged in!")
                await setToken(res.data.auth_token)
                this.$router.push({name:'home'})
            }).catch((err)=>{
                presentToast("Username or password is incorrect")
                console.log(err)
            }).finally(()=>{
                load.dismiss()
            })
        }
    }
})


</script>

<style scoped>
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--primary);

}

p {
    text-align: center;
    color: var(--text);
}

.logo {
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    font-size: 2rem;
    font-weight: 900;
}

ion-img{
    width: 60%;
}

.login-modal {
    height: 60%;
    background-color: #fff;
    border-top-left-radius: 75px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

ion-input.custom {
    --color: var(--text);
    --placeholder-color: #ddd;
    --placeholder-opacity: 0.8;

    border-bottom: 1px solid #D9B7DB;
    margin-top: 5px;
}

ion-button.custom {
    --background: var(--primary);
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;

    --color: #;


    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;

    margin-top: 15px;
}

ion-card-title {
    --color: var(--text);
}
</style>
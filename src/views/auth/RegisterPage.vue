<template>
    <ion-page>
    <div class="page">
        <div class="logo">
            <ion-img src="src\assets\impok_white.png"></ion-img>

        </div>
        <div class="login-modal">
            <div>
                <ion-input class="custom" type="text" label="First Name" label-placement="floating"></ion-input>
                <ion-input class="custom" type="text" label="Last Name" label-placement="floating"></ion-input>
                <ion-input class="custom" type="email" label="Email" label-placement="floating"></ion-input>
                <ion-input class="custom" type="text" label="Username" label-placement="floating"></ion-input>
                <ion-input class="custom" type="password" label="Password" label-placement="floating"></ion-input>
                <ion-button expand="full" class="custom" size="large">REGISTER</ion-button>
            </div>
            <div>
                <p>Do you have an account? <router-link :to="{name: 'login'}">LOGIN</router-link></p>
            </div>
            

        </div>
        
    </div>
</ion-page>
</template>

<script lang="ts">
import { IonPage, IonInput, IonButton, IonImg,loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { presentToast } from '@/modules/Toasts';
import axios from 'axios';

export default defineComponent({
    components:{
        IonPage,
        IonInput,
        IonButton,
        IonImg
    },
    data(){
        return{
            fname: '',
            lname: '',
            email: '',
            uname :'',
            password: ''
        }
    },
    methods:{
        async register(){
            const load = await loadingController.create({})
            load.present()
            axios.post("auth/users/",{
                fld_fname: this.fname,
                fld_lname: this.lname,
                fld_email: this.email,
                username: this.uname,
                password: this.password
            }).then((res)=>{
                presentToast("User registered! You can now login")
            }).catch((err)=>{
                presentToast("Error in creation of user. Please try again.")
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
    height: 20%;
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
    height: 80%;
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
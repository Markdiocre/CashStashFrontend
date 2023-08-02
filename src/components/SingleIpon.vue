<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()"> <ion-icon :icon="chevronBackOutline"> </ion-icon>Back</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button @click="buy()"> Buy</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="head">
            <h2><b>{{ fld_title }}</b></h2>
            <div class="title" >
                <h3>{{ fld_ipon }}</h3>
            </div>
        </div>

        <p>{{ fld_ipon_desc }}</p>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, modalController, IonIcon } from '@ionic/vue';
import { chevronBackOutline, addOutline, removeOutline } from 'ionicons/icons'
import axios from 'axios';
import { getToken } from '@/modules/Token';
import { presentToast } from '@/modules/Toasts';

export default defineComponent({
    props: ['fld_title', 'fld_ipon', 'fld_ipon_desc', 'fld_ipon_id', 'fld_user_id'],
    setup() {
        return {
            chevronBackOutline, addOutline, removeOutline
        }
    },
    components: {
        IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, IonIcon
    },
    data() {
        return {
            
        }
    },
    methods: {
        cancel() {
            return modalController.dismiss(null, 'cancel');
        },
        async buy(){
            axios.post('ipon/buy/', {
                ipon_value: this.fld_ipon,
                ipon_description:this.fld_ipon_desc,
                ipon_title: this.fld_title,
                ipon_id: this.fld_ipon_id
            },{
                headers: {
                    Authorization: await getToken()
                }
            }).then(async (res) => {
                presentToast("Successfully updated!")
                await modalController.dismiss(null, 'updated')
            }).catch((err)=>{
                presentToast("There is an error in updating")
                console.log(err)
            })
        }
    }
})
</script>

<style scoped>
.title h3{
    color: var(--accent)
}
.sub {
    color: gray;
    font-size: 10px;
}

.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
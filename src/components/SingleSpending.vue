<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="cancel()"> <ion-icon :icon="chevronBackOutline"> </ion-icon>Back</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <div class="head">
            <h2>{{ fld_title }}</h2>
            <div class="title" :style="{ color: fld_type == 'a' ? 'green' : 'red' }">
                <h3><ion-icon :icon="fld_type == 'a' ? addOutline : removeOutline"></ion-icon> {{ fld_value }}</h3>
            </div>
        </div>

        <h6 class="sub">{{ new Date(fld_date_added).toLocaleString('en-US', { timeZone: 'Asia/Manila' }) }}</h6>
        <p>{{ fld_description }}</p>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, modalController, IonIcon } from '@ionic/vue';
import { chevronBackOutline, addOutline, removeOutline } from 'ionicons/icons'

export default defineComponent({
    props: ['fld_title', 'fld_date_added', 'fld_value', 'fld_description', 'fld_type', 'fld_money_id', 'fld_user_id'],
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
        }
    }
})
</script>

<style scoped>
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
<script lang="ts">
import { removeToken } from '@/modules/Token';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        IonPage, IonContent, IonButton
    },
    methods:{
        async logout(){
            await removeToken()
            this.$router.push({name: 'login'})
        }
    }
})

</script>

<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-button expand="full" @click="logout">Log Out</ion-button>
        </ion-content>
    </ion-page>
</template>
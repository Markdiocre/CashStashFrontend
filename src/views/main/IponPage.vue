<script lang="ts">
import { IonPage,IonContent, IonHeader, IonToolbar, IonTitle, onIonViewWillEnter, IonFab,IonFabButton, IonIcon, modalController} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { getToken } from '@/modules/Token';
import axios from 'axios';
import { add } from 'ionicons/icons';
import IponComponent from '@/components/IponComponent.vue';
import NewIpon from '@/components/NewIpon.vue';

export default defineComponent({
    components:{
    IonPage, IonContent, IonHeader, IonToolbar, IonTitle,IonFab,IonFabButton, IonIcon,
    IponComponent
},
    setup() {
        const ipons = ref([] as any)

        async function updateIpon() {
            axios.get("ipon/", {
                headers: {
                    Authorization: await getToken()
                }
            }).then((res: any) => {
                ipons.value = res.data
            })
        }

        onIonViewWillEnter(async () => {
            updateIpon()
        })

        return {
            ipons, updateIpon, add
        }
    }, methods:{
        async addIpon(){
            const modal = await modalController.create({
                component: NewIpon
            })

            modal.present()
            const {role} = await modal.onWillDismiss();
            if (role == 'updated') {
                this.updateIpon()
            }
        }
    }
})


</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Save Up List</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <IponComponent :ipons="ipons" :allow-edits="true" @updated-money="updateIpon" @deleted-money="updateIpon"/>
            <ion-fab vertical="bottom" horizontal="end">
                <ion-fab-button @click="addIpon">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>
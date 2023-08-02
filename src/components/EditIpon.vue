<script lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonTitle } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import { presentToast } from '@/modules/Toasts';
import { getToken } from '@/modules/Token';

export default defineComponent({
    props: ['fld_title', 'fld_ipon', 'fld_ipon_desc', 'fld_ipon_id', 'fld_user_id'],
    emits: ['edited'],
    components: {
        IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon,
        IonList,
        IonTitle
    },
    data() {
        return {
            ipon_ipon: this.fld_ipon,
            ipon_ipon_desc: this.fld_ipon_desc,
            ipon_title: this.fld_title,

        }
    },
    methods: {
        async cancel() {
            await modalController.dismiss(null, 'cancel')
        },
        async edit() {
            axios.put('ipon/'+this.fld_ipon_id+'/', {
                fld_title: this.ipon_title,
                fld_ipon: this.ipon_ipon,
                fld_ipon_desc: this.ipon_ipon_desc,
                fld_user_id:this.fld_user_id
            },{
                headers: {
                    Authorization: await getToken()
                }
            }).then(async (res) => {
                presentToast("Successfully edited!")
                await modalController.dismiss(null, 'updated')
            }).catch((err)=>{
                presentToast("There is an error in editing")
                console.log(err)
            })
        }
    }
})

</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button @click="edit()">Edit</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input label="Title" labelPlacement="floating" placeholder="Enter title" type="text"
                        v-model="ipon_title"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Value" labelPlacement="floating" placeholder="Enter value" inputmode="decimal"
                        type="number" v-model="ipon_ipon"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-textarea label="Description" labelPlacement="floating" placeholder="Enter text"
                        v-model="ipon_ipon_desc"></ion-textarea>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonTitle } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import { presentToast } from '@/modules/Toasts';
import { getToken } from '@/modules/Token';

export default defineComponent({
    emits: ['edited'],
    components: {
        IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon,
        IonList,
        IonTitle
    },
    data() {
        return {
            fld_ipon:'',
            fld_ipon_desc: '',
            fld_title: '',

        }
    },
    methods: {
        async cancel() {
            await modalController.dismiss(null, 'cancel')
        },
        async add() {
            axios.post('ipon/', {
                fld_title: this.fld_title,
                fld_ipon: this.fld_ipon,
                fld_ipon_desc: this.fld_ipon_desc,
            },{
                headers: {
                    Authorization: await getToken()
                }
            }).then(async (res) => {
                presentToast("Successfully added!")
                await modalController.dismiss(null, 'updated')
            }).catch((err)=>{
                presentToast("There is an error in adding")
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
                    <ion-button @click="add()">Add</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input label="Title" labelPlacement="floating" placeholder="Enter title" type="text"
                        v-model="fld_title"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Value" labelPlacement="floating" placeholder="Enter value" inputmode="decimal"
                        type="number" v-model="fld_ipon"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-textarea label="Description" labelPlacement="floating" placeholder="Enter text"
                        v-model="fld_ipon_desc"></ion-textarea>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
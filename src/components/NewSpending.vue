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
            fld_title:'',
            fld_user_id: '',
            fld_value: '',
            fld_description: '',
            fld_type: 'm'

        }
    },
    methods: {
        async cancel() {
            await modalController.dismiss(null, 'cancel')
        },
        async add() {
            axios.post('money/', {
                fld_title: this.fld_title,
                fld_user_id:this.fld_user_id,
                fld_value: this.fld_value,
                fld_description: this.fld_description,
                fld_type: this.fld_type
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
                        type="number" v-model="fld_value"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-textarea label="Description" labelPlacement="floating" placeholder="Enter text"
                        v-model="fld_description"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-select label="Type" placeholder="Favorite Fruit" v-model="fld_type">
                        <ion-select-option value="a">Income</ion-select-option>
                        <ion-select-option value="m">Expense</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
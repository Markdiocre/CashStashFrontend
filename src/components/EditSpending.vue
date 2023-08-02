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
    props: ['fld_title', 'fld_date_added', 'fld_value', 'fld_description', 'fld_type', 'fld_money_id', 'fld_user_id'],
    data() {
        return {
            edit_title: this.fld_title,
            edit_value: this.fld_value,
            edit_description: this.fld_description,
            edit_type: this.fld_type,
        }
    },
    methods: {
        async cancel() {
            await modalController.dismiss(null, 'cancel')
        },
        async edit() {
            axios.put('money/' + this.fld_money_id+'/', {
                fld_title: this.edit_title,
                fld_user_id:this.fld_user_id,
                fld_value: this.edit_value,
                fld_description: this.edit_description,
                fld_type: this.edit_type
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
                        v-model="edit_title"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Value" labelPlacement="floating" placeholder="Enter value" inputmode="decimal"
                        type="number" v-model="edit_value"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-textarea label="Description" labelPlacement="floating" placeholder="Enter text"
                        v-model="edit_description"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-select label="Type" placeholder="Favorite Fruit" v-model="edit_type">
                        <ion-select-option value="a">Income</ion-select-option>
                        <ion-select-option value="m">Expense</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
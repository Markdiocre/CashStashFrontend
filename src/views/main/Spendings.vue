<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Income and Expenses</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <SpendingsComponent :transactions="transactions" :allow-edits="true" @deleted-money="deletedMoneyId"
                @updated-money="updateMoney" />
            <ion-fab vertical="bottom" horizontal="end">
                <ion-fab-button @click="addMoney">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, onIonViewWillEnter, IonSearchbar, IonFab, IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { getToken } from '@/modules/Token';
import SpendingsComponent from '@/components/SpendingsComponent.vue';
import { add } from 'ionicons/icons';
import NewSpending from '@/components/NewSpending.vue';

export default defineComponent({

    setup() {
        const transactions = ref([] as any)

        async function updateMoney() {
            axios.get("money/", {
                headers: {
                    Authorization: await getToken()
                }
            }).then((res: any) => {
                transactions.value = res.data
            })
        }

        onIonViewWillEnter(async () => {
            updateMoney()
        })

        return {
            transactions, updateMoney, add
        }
    },
    components: {
        IonPage,
        IonContent,
        SpendingsComponent, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonFab, IonFabButton, IonIcon
    },
    methods: {
        deletedMoneyId(id: any) {
            this.transactions = this.transactions.filter((t: any) => t.fld_money_id !== id)
        },
        async addMoney() {
            const modal = await modalController.create({
                component: NewSpending
            })

            modal.present()
            const {role} = await modal.onWillDismiss();
            if (role == 'updated') {
                this.updateMoney()
            }
        }
    }
})

</script>
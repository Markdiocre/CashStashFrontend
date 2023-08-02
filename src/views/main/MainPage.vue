<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card class="primary">
        <ion-card-header>
          <ion-card-title>&#8369 {{ total }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Current Pocket Money
        </ion-card-content>
      </ion-card>

      <ion-list :inset="true" v-if="buyable.length != 0">
        <ion-list-header>
          <ion-label>
            <h2><b>Can be bought:</b></h2>
          </ion-label>
        </ion-list-header>

        <IponComponent :ipons="buyable" :allow-edits="false" @updated-money="refresh"/>

      </ion-list>

      <ion-list :inset="true">
        <ion-list-header>
          <ion-label>
            <h2><b>Last 10 Transactions</b></h2>
          </ion-label>
        </ion-list-header>

        <SpendingsComponent :transactions="transactions" :allow-edits="false" />

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { onIonViewWillEnter,IonPage, IonMenu, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel, IonList, IonListHeader, IonFab, IonFabButton, IonItem } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from "axios"
import { getToken } from '@/modules/Token';
import { walletOutline, addOutline, removeOutline } from 'ionicons/icons'
import SpendingsComponent from '@/components/SpendingsComponent.vue';
import IponComponent  from '@/components/IponComponent.vue'

export default defineComponent({
  setup() {
        const transactions = ref([] as any)
        const total = ref('')
        const buyable = ref([] as any)

        async function refresh(){
          axios.get("home/", {
                headers: {
                    Authorization: await getToken()
                }
            }).then((res: any) => {
                transactions.value = res.data.recent_transactions
                total.value = res.data.current_pocket_money
                buyable.value = res.data.buyable
            })
        }

        onIonViewWillEnter(async () => {
            refresh()
        })

        return {
            transactions, total, buyable, refresh
        }
    },
  components: {
    SpendingsComponent,IponComponent,
    IonPage, IonMenu, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel, IonList, IonListHeader, IonFab, IonFabButton, IonItem
  },
  data() {
    return {
      walletOutline,
      addOutline,
      removeOutline
    }
  },
  methods: {
    goToSpendings() {
      this.$router.push({ name: 'spendings' })
    }
  }

})
</script>

<style scoped>
#main-content {
  background-color: var(--background);
}

ion-icon.total {
  color: #F7C911;
}

.transact {
  width: 100%;
  margin-bottom: 10px;
}

.transact .desc {
  float: right;
  font-size: 16px;
}

.transact .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transact .header h2 {
  margin: 0px;
}

.transact .header .date {
  font-size: 9px;
}

.primary {
  color: var(--background);
  background-color: var(--primary);
}

ion-card-title {
  color: #f1f1f1;
}

ion-label {
  margin-top: 10px;
}

ion-item {
  margin-top: 10px;
}
</style>

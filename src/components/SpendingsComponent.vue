<template>
  <ion-item-sliding v-for="t in transactions" :key="t.fld_money_id">
    <ion-item @click="checkDetail(t)">
      <div class="transact">
        <div class="header">
          <div class="title" :style="{ color: t.fld_type == 'a' ? 'green' : 'red' }">
            <h3><ion-icon :icon="t.fld_type == 'a' ? addOutline : removeOutline"></ion-icon> {{ t.fld_value }}</h3>
          </div>
          <div class="date">
            {{ new Date(t.fld_date_added).toLocaleString('en-US', { timeZone: 'Asia/Manila' }) }}
          </div>
        </div>


        <div class="desc">{{ t.fld_title }}</div>
      </div>
    </ion-item>
    <hr v-if="!allowEdits">

    <ion-item-options v-if="allowEdits">
      <ion-item-option @click="editDetail(t)">Modify</ion-item-option>
      <ion-item-option color="danger" @click="deleteMoney(t.fld_money_id)">Delete</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonIcon, IonItem, IonItemSliding, IonItemOptions, IonItemOption, modalController, alertController } from '@ionic/vue';
import { addOutline, removeOutline } from 'ionicons/icons'
import SingleSpending from './SingleSpending.vue';
import axios from 'axios';
import { getToken } from '@/modules/Token';
import { presentToast } from '@/modules/Toasts';
import EditSpending from './EditSpending.vue';

export default defineComponent({
  emits:['deletedMoney','updatedMoney'],
  components: {
    IonIcon,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  },
  props: {
    transactions: Array as any,
    allowEdits: Boolean
  }, data() {
    return {
      addOutline,
      removeOutline
    }
  },
  methods: {
    async checkDetail(t: any) {
      const modal = await modalController.create({
        component: SingleSpending,
        componentProps: t,
        initialBreakpoint: 0.50,
        breakpoints: [0.25, .5, .75]
      });
      modal.present();
    },

    async deleteMoney(id: any) {
      const alert = await alertController.create({
        header: "Are you sure?",
        message: "This cannot be reverted!",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Confirm',
            role: 'confirm',
            handler: async () => {
              axios.delete("money/" + id, {
                headers: {
                  Authorization: await getToken()
                }
              }).then((res)=>{
                presentToast("Successfully deleted!")
                this.$emit("deletedMoney", id)
              }).catch((err)=>{
                presentToast("There is an error deleting your data")
              })
            }
          },
        ]
      })

      await alert.present()
    },

    async editDetail(t: any){
      const modal = await modalController.create({
        component: EditSpending,
        componentProps: t,
        initialBreakpoint: 0.50,
        breakpoints: [.5,.75]
      });

      modal.present()
      const {role} = await modal.onWillDismiss();

      if (role == 'updated'){
        this.$emit('updatedMoney')
      }
    }
  }
})

</script>

<style scoped>
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

.transact .header .title h3 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.transact .header .date {
  font-size: 9px;
}
</style>
<template>
    <ion-item-sliding v-for="t in ipons" :key="t.fld_ipon_id">
      <ion-item @click="checkDetail(t)">
        <div class="transact">
          <div class="header">
            <div class="title">
              <h3>{{ t.fld_ipon }}</h3>
            </div>
          </div>
  
  
          <div class="desc">{{ t.fld_title }}</div>
        </div>
      </ion-item>
      <hr v-if="!allowEdits">
  
      <ion-item-options v-if="allowEdits">
        <ion-item-option @click="editDetail(t)">Modify</ion-item-option>
        <ion-item-option color="danger" @click="deleteMoney(t.fld_ipon_id)">Delete</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonIcon, IonItem, IonItemSliding, IonItemOptions, IonItemOption, modalController, alertController } from '@ionic/vue';
  import { addOutline, removeOutline } from 'ionicons/icons'
  import SingleIpon from './SingleIpon.vue';
  import axios from 'axios';
  import { getToken } from '@/modules/Token';
  import { presentToast } from '@/modules/Toasts';
  import EditIpon from './EditIpon.vue';
  
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
      ipons: Array as any,
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
          component: SingleIpon,
          componentProps: t,
          initialBreakpoint: 0.50,
          breakpoints: [0.25, .5, .75]
        });
        modal.present();

        const {role} = await modal.onWillDismiss();
  
        if (role == 'updated'){
            presentToast(t.fld_title + " is purchased!")
          this.$emit('updatedMoney')
        }
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
                axios.delete("ipon/" + id, {
                  headers: {
                    Authorization: await getToken()
                  }
                }).then((res)=>{
                  presentToast("Successfully deleted!")
                  this.$emit("deletedMoney")
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
          component: EditIpon,
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
    color: var(--accent);
  }
  
  .transact .header .date {
    font-size: 9px;
  }
  </style>
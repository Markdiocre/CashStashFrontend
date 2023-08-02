import { toastController } from "@ionic/vue";

async function presentToast(msg: string){
    const toast = await toastController.create({
        message: msg,
        duration: 2000,
        position: 'top',
    })

    await toast.present();
}

export {presentToast}
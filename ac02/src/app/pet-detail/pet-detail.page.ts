import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Pet } from './../data.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
  standalone: false,
})
export class PetDetailPage implements OnInit {

  pet: Pet = {
    nome: '',
    especie: '',
    raca: '',
    idade: 0,
    observacoes: ''

  };

  petId: string | null = null;
  isNewPet = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.isNewPet = false;
      this.loadPet();
    }
  }

async loadPet() {
  const loading = await this.loadingController.create({
    message: 'Carregando item...'
  });

  await loading.present();

  this.dataService.getPet(this.petId!).subscribe(res => {
    loading.dismiss();

    if (res) {
      this.pet = res;
    } else {
      this.presentToast('Item não encontrado!', 'danger');
      this.router.navigateByUrl('/home');
    }
  }, err => {
    loading.dismiss();
    this.presentToast('Erro ao carregar item.', 'danger');
    this.router.navigateByUrl('/home');
  });
}

async savePet() {
  const loading = await this.loadingController.create({
    message: 'Salvando item...'
  });

  await loading.present();

  if (this.isNewPet) {
    this.dataService.addPet(this.pet).then(() => {
      loading.dismiss();
      this.presentToast('Item adicionado com sucesso!', 'success');
      this.router.navigateByUrl('/home');
    }, err => {
      loading.dismiss();
      this.presentToast('Erro ao adicionar item.', 'danger');
    });
  } else {
    this.dataService.updatePet(this.pet).then(() => {
      loading.dismiss();
      this.presentToast('Item atualizado com sucesso!', 'success');
      this.router.navigateByUrl('/home');
    }, err => {
      loading.dismiss();
      this.presentToast('Erro ao atualizar item.', 'danger');
    });
  }
}

async presentToast(message: string, color: string = 'primary') {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    color: color
  });
  toast.present();
 }
}

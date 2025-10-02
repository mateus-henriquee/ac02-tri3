import { Component } from '@angular/core';

import { DataService, Pet, Cuidador } from '../data.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  pets: Pet[] = [];
  cuidadores: Cuidador[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.dataService.getPets().subscribe(res => {
      this.pets = res;
    });

    this.dataService.getCuidadores().subscribe(res => {
      this.cuidadores = res;
    });
  }

//funcoes pets

addPet() {
  this.router.navigateByUrl('/pet-detail');
}

editPet(pet: Pet) {
  this.router.navigateByUrl(`/pet-detail/${pet.id}`);
}

async deletePet(id: string) {
  const alert = await this.alertController.create({
    header: 'Confirmar exclusão',
    message: 'Tem certeza que deseja excluir este item?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Excluir',
        handler: () => {
          this.dataService.deletePet(id);
        },
      },
    ],
  });

  await alert.present();
}

//funcoes cuidadores

  addCuidador() {
  this.router.navigateByUrl('/cuidador-detail');
}

editCuidador(cuidador: Cuidador) {
  this.router.navigateByUrl(`/cuidador-detail/${cuidador.id}`);
}



async deleteCuidador(id: string) {
  const alert = await this.alertController.create({
    header: 'Confirmar exclusão',
    message: 'Tem certeza que deseja excluir este item?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Excluir',
        handler: () => {
          this.dataService.deleteCuidaor(id);
        },
      },
    ],
  });

  await alert.present();
}


}

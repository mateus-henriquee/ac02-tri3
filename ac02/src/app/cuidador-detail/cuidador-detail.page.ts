import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Pet, Cuidador } from './../data.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuidador-detail',
  templateUrl: './cuidador-detail.page.html',
  styleUrls: ['./cuidador-detail.page.scss'],
  standalone: false,
})
export class CuidadorDetailPage implements OnInit {

  cuidador: Cuidador = {
    nome: '',
    telefone: '',
    experiencia: 0,
    especialidades: ''

  };

  cuidadorId: string | null = null;
  isNewCuidador = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cuidadorId = this.route.snapshot.paramMap.get('id');
    if (this.cuidadorId) {
      this.isNewCuidador = false;
      this.loadCuidador();
    }
  }

async loadCuidador() {
  const loading = await this.loadingController.create({
    message: 'Carregando item...'
  });

  await loading.present();

  this.dataService.getCuidador(this.cuidadorId!).subscribe(res => {
    loading.dismiss();

    if (res) {
      this.cuidador = res;
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

async saveCuidador() {
  const loading = await this.loadingController.create({
    message: 'Salvando item...'
  });

  await loading.present();

  if (this.isNewCuidador) {
    this.dataService.addCuidador(this.cuidador).then(() => {
      loading.dismiss();
      this.presentToast('Item adicionado com sucesso!', 'success');
      this.router.navigateByUrl('/home');
    }, err => {
      loading.dismiss();
      this.presentToast('Erro ao adicionar item.', 'danger');
    });
  } else {
    this.dataService.updateCuidador(this.cuidador).then(() => {
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

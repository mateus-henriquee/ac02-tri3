import { Injectable } from '@angular/core';


import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Pet {
  id?: string;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  observacoes: string;
  createdAt?: number;
}

export interface Cuidador {
  id?: string;
  nome: string;
  telefone: string;
  experiencia: number;
  especialidades: string;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private firestore: Firestore){ }

//funçoes pets

  getPets(): Observable<Pet[]> {
    const petsCollectionRef = collection(this.firestore, 'pets');
    const q = query(petsCollectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Pet[]>;
  }

  getPet(id: string): Observable<Pet | undefined> {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return docData(petDocRef, { idField: 'id' }) as Observable<Pet | undefined>;
  }

  addPet(pet: Pet) {
    const petsCollectionRef = collection(this.firestore, 'pets');
    return addDoc(petsCollectionRef, { ...pet, createdAt: Date.now() });
  }

  updatePet(pet: Pet) {
    const petDocRef = doc(this.firestore, `pets/${pet.id}`);
    return updateDoc(petDocRef, { nome: pet.nome, especie: pet.especie, raca: pet.raca, idade: pet.idade, observacoes: pet.observacoes });
  }

  deletePet(id: string) {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return deleteDoc(petDocRef);
  }



//funçoes cuidadores
  getCuidadores(): Observable<Cuidador[]> {
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    const q = query(cuidadoresCollectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Cuidador[]>;
  }

  getCuidador(id: string): Observable<Cuidador | undefined> {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    return docData(cuidadorDocRef, { idField: 'id' }) as Observable<Cuidador | undefined>;
  }

  addCuidador(cuidador: Cuidador) {
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    return addDoc(cuidadoresCollectionRef, { ...cuidador, createdAt: Date.now() });
  }

  updateCuidador(cuidador: Cuidador) {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${cuidador.id}`);
    return updateDoc(cuidadorDocRef, { nome: cuidador.nome, telefone: cuidador.telefone, experiencia: cuidador.experiencia, especialidades: cuidador.especialidades });
  }

  deleteCuidaor(id: string) {
    const petDocRef = doc(this.firestore, `cuidadores/${id}`);
    return deleteDoc(petDocRef);
  }

}



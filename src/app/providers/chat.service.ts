import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../Interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[]=[];

  constructor(private afs: AngularFirestore) { }

  cargarmensajes(){

    this.itemsCollection= this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:Mensaje[])=>{
        console.log(mensajes);
        this.chats=[];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      // this.chats= mensajes;
    }))
    
  }
  agregarMensaje(texto:string){
    
    let mensaje :Mensaje={
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);

  }
}

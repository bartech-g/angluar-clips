import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
}

  public async createUser(userDate: IUser){

  const userCred = await this.auth.createUserWithEmailAndPassword(
    userDate.email as string, userDate.password as string
  )
  await this.db.collection('users').add({
    name: userDate.name,
    email: userDate.email,
    age: userDate.age,
    phoneNumber: userDate.phoneNumber
  })
}
}

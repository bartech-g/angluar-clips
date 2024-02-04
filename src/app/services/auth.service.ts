import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
  }

  public async createUser(userDate: IUser) {

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userDate.email as string, userDate.password as string
    )

    if (!userCred.user) {
      throw new Error("User aint found")
    }
    await this.db.collection('users').doc(userCred.user.uid).set({
      name: userDate.name,
      email: userDate.email,
      age: userDate.age,
      phoneNumber: userDate.phoneNumber
    })

    await userCred.user.updateProfile({
      displayName: userDate.name
    })
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import IUser from '../models/user.model';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>
  private redirect = false;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    // this.router.events.pipe(
    //   filter(e => e instanceof NavigationEnd),
    //   map(e => this.route.firstChild),
    //   switchMap(route => route?.data ?? of({}))
    // ).subscribe(data => {
    //   this.redirect = data.authOnly ?? false
    // })
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
  public async logout($event?: Event) {
    if ($event) {

      $event.preventDefault()
    }
    await this.auth.signOut()
    if (this.redirect) {
    }
    await this.router.navigateByUrl('/')
  }
}

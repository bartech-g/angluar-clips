import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  showAlert = false
  alertMsg = "PLease wait, we are logging you in"
  alertColor = "blue"
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  async login() {
    this.showAlert = true
    this.alertMsg = "PLease wait, we are logging you in"

    this.alertColor = "blue"
    this.inSubmission = true
    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch (error) {
      this.alertMsg = "Failed"
      this.inSubmission = false
      return
    }
    this.alertMsg = "Success"

    this.alertColor = "green"
  }
}

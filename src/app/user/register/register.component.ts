import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AngularFireAuth) {

  }
  inSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.email]);
  age = new FormControl('', [Validators.min(18)]);
  password = new FormControl('', [
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('');
  phoneNumber = new FormControl('', [Validators.minLength(13)]);
  showAlert = false;
  alertMsg = 'loading';
  alertColor = 'blue';
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });

  async register() {
    this.showAlert = true;
    this.inSubmission = true;
    // Firebase Auth
    const { email, password } = this.registerForm.value
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
      )
      console.log(userCred)
    } catch (e) {
      console.log(e)
      this.alertMsg = "Error, try again..."
      this.alertColor = "red"
      this.inSubmission = false
      return
    }
    this.alertMsg = "Success!"
    this.alertColor = "green"

  }
}

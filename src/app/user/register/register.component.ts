import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { compileNgModule } from '@angular/compiler';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators'
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {

  }
  inSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.email], [this.emailTaken.validate]);
  age = new FormControl<number | null>(null, [Validators.min(18)]);
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
  }, [RegisterValidators.match('password', 'confirm_password')]);

  async register() {
    this.showAlert = true;
    this.inSubmission = true;
    // Firebase Auth

    try {
      await this.auth.createUser(this.registerForm.value as IUser)
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

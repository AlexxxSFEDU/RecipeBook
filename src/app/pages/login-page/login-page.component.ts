import {Component, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(public authService: AuthService, private router: Router) {
  }

  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, Validators.required,),
      password: new FormControl(null, Validators.required)
    })
  isPasswordVisible: WritableSignal<boolean> = signal(false)

  onSubmit() {
    if (this.form.invalid) {
      return this.authService.error$.next('Заполните все поля!')
    }
    const email = this.form.value.email
    const password = this.form.value.password
    if (!email || !password) {
      return
    }
    this.authService.signIn(email, password).subscribe((r) => {
        this.router.navigate([''])
      }
    );
    this.form.reset()
  }
}

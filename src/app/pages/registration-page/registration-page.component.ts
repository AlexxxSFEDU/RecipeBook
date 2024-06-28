import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent implements OnInit{
  constructor(public authService: AuthService, private router: Router) {}
  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  ngOnInit() {
  }
  isPasswordVisible: WritableSignal<boolean> = signal(false)
  onSubmit() {
    if (this.form.invalid)
    {
      return
    }
    const email = this.form.value.email
    const password = this.form.value.password
    if ( !email || !password )
    {
      return
    }
    this.authService.signUp(email, password).subscribe({
      next: () => {},
      error: (error) => {},
      complete: () => {
        this.form.reset();
        this.router.navigate(['/login']);
      }
    });

  }
}

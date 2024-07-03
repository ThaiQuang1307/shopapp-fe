import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/app/constants/title.constant';
import { MyValidators } from 'src/app/validators/custom-validation';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  ctrl: any;

  constructor(
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.titleService.setTitle(TITLE.LOGIN);

    const { phoneNumber, password } = MyValidators;
    this.formLogin = this.formBuilder.group({
      phone: ['', [Validators.required, phoneNumber]],
      password: ['', [Validators.required, password]],
    })
    this.ctrl = this.formLogin.controls;
  }

  login() {
    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid) {
      let loginData: LoginDTO = {
        phone_number: this.ctrl.phone.value,
        password: this.ctrl.password.value,
      }

      this.userService.login(loginData).subscribe({
        next: (response: any) => {
          debugger
          console.log(response)
          if (response?.status === 200 || response?.status === 201) {
            // xử lý đăng nhập thành công
            // alert("Đăng nhập thành công!");
            // this.router.navigate(['/home']);
          } else {
            // xử lý đăng nhập thất bại
          }
        },
        error: (error: any) => {
          debugger
          // alert("Đăng nhập không thành công! "+ error.error);
        },
        complete: () => {
          debugger
          // this.formLogin.reset();
        }
      })

    } else {
      // alert('Đăng nhập thất bại!')
    }
  }

}

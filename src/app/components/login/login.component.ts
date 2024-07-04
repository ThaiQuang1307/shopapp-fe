import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/app/constants/title.constant';
import { MyValidators } from 'src/app/validators/custom-validation';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RoleInterface } from 'src/app/interfaces/role.interface';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  roles: RoleInterface[] = [];
  ctrl: any;

  constructor(
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private roleService: RoleService,
  ) {
    this.titleService.setTitle(TITLE.LOGIN);

    const { phoneNumber, password } = MyValidators;
    this.formLogin = this.formBuilder.group({
      phone: ['', [Validators.required, phoneNumber]],
      password: ['', [Validators.required, password]],
      role: [null, []],
    })
    this.ctrl = this.formLogin.controls;
  }
  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (response: HttpResponse<any>) => {
        if (response?.status === 200) {
          this.roles = response.body;
          this.ctrl['role'].setValue(this.roles?.length ? this.roles[0]?.id : null)
        }
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy danh sách quyền:', error);
      }
    })
  }

  login() {
    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid) {
      let loginData: LoginDTO = {
        phone_number: this.ctrl.phone.value,
        password: this.ctrl.password.value,
        role_id: this.ctrl.role.value ?? 1,
      }

      this.userService.login(loginData).subscribe({
        next: (response: HttpResponse<LoginInterface>) => {
          if (response?.status === 200 || response?.status === 201) {
            const token = response.body?.token
            token && this.authService.setToken(token);
            alert("Đăng nhập thành công!");
            this.router.navigate(['/']);
          } else {
            alert("Đăng nhập thất bại!");
          }
        },
        error: (error: any) => {
          const messageError = "Đăng nhập thất bại! "
          alert(error?.error?.message ? messageError + error.error.message : messageError);
        },
        complete: () => {
          this.formLogin.reset();
        }
      })

    } else {
      // alert('Đăng nhập thất bại!')
    }
  }

}

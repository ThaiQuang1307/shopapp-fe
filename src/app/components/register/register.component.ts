import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterDTO } from '../dtos/user/register.dto';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/app/constants/title.constant';
import { MyValidators } from 'src/app/validators/custom-validation';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegister: FormGroup;
  dateOfBirth: Date;

  constructor(
    private router: Router,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.titleService.setTitle(TITLE.REGISTER);
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);

    const { phoneNumber, password } = MyValidators;
    this.formRegister = this.formBuilder.group({
      phone: ['', [Validators.required, phoneNumber]],
      password: ['', [Validators.required, password]],
      retypePassword: ['', [Validators.required, password]],
      fullName: ['', [Validators.required]],
      address: ['', []],
      isAccepted: [false, []],
      dateOfBirth: [this.dateOfBirth, []],
    });
  }

  register() {
    this.formRegister.markAllAsTouched();
    const ctrl = this.formRegister.controls;

    if (this.formRegister.valid && ctrl['isAccepted'].value) {
      let registerData: RegisterDTO = {
        full_name: ctrl['fullName'].value,
        phone_number: ctrl['phone'].value,
        address: ctrl['address'].value,
        password: ctrl['password'].value,
        retype_password: ctrl['retypePassword'].value,
        date_of_birth: ctrl['dateOfBirth'].value,
        facebook_account_id: 0,
        google_account_id: 0,
        role_id: 1
      }

      this.userService.register(registerData).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response?.status === 200 || response?.status === 201) {
            alert('Đăng ký thành công!');
            this.router.navigate(['/login']);
          } else {
            // xử lý không đăng ký thất bại
            alert('Đăng ký thất bại, vui lòng thử lại!');
          }
        },
        error: (error: any) => {
          alert('Đăng ký thất bại: ' + error.error)
        },
        complete: () => {
          this.formRegister.reset();
        }
      });

    } else {
      // Hiển thị thông báo lỗi nếu có
    }

  }

}

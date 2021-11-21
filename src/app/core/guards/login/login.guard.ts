import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '@core/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  dataUser!: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.datosUsuario$.subscribe(response => {
      this.dataUser = response;
    });
  }

  canActivate(): boolean {
    if (this.dataUser) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}

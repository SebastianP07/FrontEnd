import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  datosUsuario!: any;
  observableUser!: Subscription;
  rol: any;

  constructor(private readonly router: Router, private userService: UserService) {
    this.validacionDatosUsuario();
  }

  validacionDatosUsuario(): void {
    this.observableUser = this.userService.datosUsuario$.subscribe(response => {
      if (!response) {
        this.router.navigate(['/auth']);
      }
      const rolCustom = response?.responseDataUser?.roles.find((elem: { id: number; nombre: string }) => elem.id === 1)?.id;
      this.rol = rolCustom ? rolCustom : 2;
      this.datosUsuario = response;
    });
  }

  ngOnDestroy(): void {
    this.observableUser.unsubscribe();
  }

  ngOnInit(): void {
  }

  goToPage(page: string): void {
    this.router.navigateByUrl(page);
  }
}

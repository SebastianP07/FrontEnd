import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let datosUsuarioStorage = localStorage.getItem('datosUsuario');
    if (datosUsuarioStorage) {
      this.userService.agregarDatosUsuario(JSON.parse(datosUsuarioStorage));
    }
  }
}

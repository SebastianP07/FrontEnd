import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthInterceptor} from '@core/interceptors/auth-interceptor/auth.interceptor';
import {SharedModule} from '@shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {HeaderComponent} from './pages/layout/components/header/header.component';
import {MenuComponent} from './pages/layout/components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from '@pages/auth/auth.component';
import {DialogDatosUsuarioComponent} from './pages/layout/components/header/components/dialog-datos-usuario/dialog-datos-usuario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistroUsuarioComponent} from '@pages/auth/components/registro-usuario/registro-usuario.component';
import {InicioSesionComponent} from '@pages/auth/components/inicio-sesion/inicio-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    AuthComponent,
    DialogDatosUsuarioComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

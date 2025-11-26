import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './core/inicio/inicio.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './core/admin/admin.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComponnetsComponent } from './core/componnets/componnets.component';
import { ContenidoComponent } from './core/contenido/contenido.component';
import { FooterComponent } from './core/footer/footer.component';
import { NosotrosComponent } from './core/nosotros/nosotros.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    AdminComponent,
    ComponnetsComponent,
    ContenidoComponent,
    FooterComponent,
    NosotrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    NgScrollbarModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

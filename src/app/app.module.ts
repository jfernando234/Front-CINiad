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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    MenuComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // necesario para modales
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    NgScrollbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

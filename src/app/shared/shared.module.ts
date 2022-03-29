import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonComponent } from './utils components/button/button.component';

@NgModule({
  declarations: [HomeComponent, ButtonComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [ButtonComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
/*Material*/
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
/*Components*/
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './utils components/button/button.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ButtonComponent],
  imports: [CommonModule, HttpClientModule, AppRoutingModule, MatIconModule],
  exports: [ButtonComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/*Material*/
import { MatIconModule } from '@angular/material/icon';
/*Components*/
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './utils components/button/button.component';
import { PageNotFoundComponent } from './components/PageNotFound/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    PageNotFoundComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}

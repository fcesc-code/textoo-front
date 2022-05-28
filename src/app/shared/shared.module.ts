import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
/*Material*/
import { MatIconModule } from '@angular/material/icon';
/*Components*/
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './utils components/button/button.component';
import { PageNotFoundComponent } from './components/PageNotFound/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, MatIconModule],
  exports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}

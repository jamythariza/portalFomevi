import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgsRevealModule} from 'ng-scrollreveal';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule} from '@angular/common/http';
import { LatestNewsComponent } from './Components/latest-news/latest-news.component';

import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail/news-detail.component';
import { DefaultComponent } from './default/default/default.component';
import { MenuComponent } from './Components/Menu/menu/menu.component';
import { BannerComponent } from './banner/banner/banner.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ButtonBackComponent } from './Components/button-back/button-back/button-back.component';
import { AgreementComponent } from './agreement/agreement/agreement.component';
import { AgreementComponentComponent } from './Components/agreement/agreement/agreement.component';
import { DetailAgreementComponent } from './detail-agreement/detail-agreement/detail-agreement.component';
import { UserComponent } from './User/user/user.component';
import { ProductComponent } from './Components/products/product/product.component';
import { CreditlineComponent } from './creditline/creditline/creditline.component';
import { DetailCreditlineComponent } from './detail-creditline/detail-creditline/detail-creditline.component';
import { AboutusComponent } from './aboutUs/aboutus/aboutus.component';
import { AttentionComponent } from './attentionPoints/attention/attention.component';
import { FilesComponent } from './Files/files/files.component';
import {ProductPageComponent} from './product/product/product.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { ServiceComponent } from './service/service/service.component';
import { SavingComponent } from './saving/saving/saving.component'
import {MatTabsModule} from '@angular/material/tabs';
import { DialogOverviewComponent } from './Components/dialog-overview/dialog-overview.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    routingComponents,
    LatestNewsComponent,
    NewsDetailComponent,
    DefaultComponent,
    MenuComponent,
    BannerComponent,
    FooterComponent,
    ButtonBackComponent,
    AgreementComponent,
    AgreementComponentComponent,
    DetailAgreementComponent,
    UserComponent,
    ProductComponent,
    CreditlineComponent,
    DetailCreditlineComponent,
    AboutusComponent,
    AttentionComponent,
    FilesComponent,
    ProductPageComponent,
    SpinnerComponent,
    ServiceComponent,
    SavingComponent,
    DialogOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsRevealModule.forRoot(),
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }

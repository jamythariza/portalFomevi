import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgsRevealModule } from 'ng-scrollreveal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ProductPageComponent } from './product/product/product.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { ServiceComponent } from './service/service/service.component';
import { SavingComponent } from './saving/saving/saving.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogOverviewComponent } from './Components/dialog-overview/dialog-overview.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleViewPageComponent } from './articles/pages/article-view-page/article-view-page.component';
import { ArticleListSummaryPageComponent } from './articles/pages/article-list-summary-page/article-list-summary-page.component';
import { ArticleCategoryComponent } from './Components/Util/article-category/article-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleImageComponent } from './articles/components/article-image/article-image.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './Core/Interceptors/tokenInterceptor';
import { ListMyArticlesComponent } from './articles/pages/list-my-articles/list-my-articles.component';
import { CreateMyArticleComponent } from './articles/components/create-my-article/create-my-article.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { LoaderComponent } from './Components/loader/loader.component';
import { SurveyViewPageComponent } from './survey/pages/survey-view-page/survey-view-page.component';
import { ValidateUserComponent } from './survey/components/validate-user/validate-user.component';
// import { AuthInterceptor } from './Core/Interceptors/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    DialogOverviewComponent,
    ArticleViewPageComponent,
    ArticleListSummaryPageComponent,
    ArticleCategoryComponent,
    ArticleImageComponent,
    ListMyArticlesComponent,
    CreateMyArticleComponent,
    LoaderComponent,
    SurveyViewPageComponent,
    ValidateUserComponent,
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
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    NumberFormatPipe,
    ReactiveFormsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AuthService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail/news-detail.component';
import { DefaultComponent } from './default/default/default.component';
import { AgreementComponent } from './agreement/agreement/agreement.component';
import { DetailAgreementComponent } from './detail-agreement/detail-agreement/detail-agreement.component';
import { UserComponent } from './User/user/user.component';
import { DetailCreditlineComponent } from './detail-creditline/detail-creditline/detail-creditline.component';
import { AboutusComponent } from './aboutUs/aboutus/aboutus.component';
import { AttentionComponent } from './attentionPoints/attention/attention.component';
import { FilesComponent } from './Files/files/files.component';
import { ProductPageComponent } from './product/product/product.component';
import { ServiceComponent } from './service/service/service.component';
import { SavingComponent } from './saving/saving/saving.component';
import { ArticleListSummaryPageComponent } from './articles/pages/article-list-summary-page/article-list-summary-page.component';
import { ListMyArticlesComponent } from './articles/pages/list-my-articles/list-my-articles.component';
import { ArticleViewPageComponent } from './articles/pages/article-view-page/article-view-page.component';
import { CreateMyArticleComponent } from './articles/components/create-my-article/create-my-article.component';
import { SurveyViewPageComponent } from './survey/pages/survey-view-page/survey-view-page.component';
import { PqrsValidateUserPageComponent } from './pqrs/page/pqrs-validate-user-page/pqrs-validate-user-page.component';

const routes: Routes = [
  { path: '', redirectTo: '*', pathMatch: 'full' },
  { path: '', component: DefaultComponent },
  { path: 'news', component: NewsComponent },
  { path: 'detail/:id', component: NewsDetailComponent },
  { path: 'agreement/:filter', component: AgreementComponent },
  { path: 'agreementdetail/:id', component: DetailAgreementComponent },
  { path: 'user', component: UserComponent },
  { path: 'creditdetail/:id', component: DetailCreditlineComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'attention/:filter', component: AttentionComponent },
  { path: 'files', component: FilesComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'saving', component: SavingComponent },
  { path: 'articles-summary', component: ArticleListSummaryPageComponent },
  { path: 'my-articles/:documentoId', component: ListMyArticlesComponent },
  {
    path: 'detail-my-articles/:guid/:documentoId',
    component: CreateMyArticleComponent,
  },
  {
    path: 'create-my-article/:documentoId',
    component: CreateMyArticleComponent,
  },
  {
    path: 'article-view/:guid',
    component: ArticleViewPageComponent,
  },
  { path: 'survey/:guid', component: SurveyViewPageComponent },
  { path: 'pqrs', component: PqrsValidateUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [NewsComponent, NewsDetailComponent];

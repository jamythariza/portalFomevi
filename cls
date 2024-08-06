[1mdiff --git a/src/app/detail-agreement/detail-agreement/detail-agreement.component.html b/src/app/detail-agreement/detail-agreement/detail-agreement.component.html[m
[1mindex 48f00b2..7182a15 100644[m
[1m--- a/src/app/detail-agreement/detail-agreement/detail-agreement.component.html[m
[1m+++ b/src/app/detail-agreement/detail-agreement/detail-agreement.component.html[m
[36m@@ -1,51 +1,61 @@[m
 <app-menu></app-menu>[m
 <section class="content-news-detail">[m
[31m-    <div class="container">       [m
[31m-        <div  class="row container-titlePage">[m
[31m-            <div class="col-xs-12 col-sm-12 col-md-2">[m
[31m-                <app-button-back></app-button-back> [m
[32m+[m[32m  <div class="container">[m
[32m+[m[32m    <div class="row container-titlePage">[m
[32m+[m[32m      <div class="col-xs-12 col-sm-12 col-md-2">[m
[32m+[m[32m        <app-button-back></app-button-back>[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div class="col-xs-12 col-sm-12 col-md-7">[m
[32m+[m[32m        <h2 class="text-center title-page-intrernal">{{ titlePage }}</h2>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m    <div class="wrapper-spinner">[m
[32m+[m[32m      <app-spinner [ngClass]="loader ? 'loading-page' : 'hidden'"></app-spinner>[m
[32m+[m[32m    </div>[m
[32m+[m[32m    <div *ngIf="!loader">[m
[32m+[m[32m      <div class="row">[m
[32m+[m[32m        <div class="col-xs-12 col-sm-12 col-md-4">[m
[32m+[m[32m          <img[m
[32m+[m[32m            src="{{ agreements.image }}"[m
[32m+[m[32m            alt="pr-sample13"[m
[32m+[m[32m            class="img-fluid"[m
[32m+[m[32m            alt="novedades fomevi"[m
[32m+[m[32m          />[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <div class="col-xs-12 col-sm-12 col-md-7 ms-4 not-margin">[m
[32m+[m[32m          <h2>{{ agreements.title }}</h2>[m
[32m+[m[32m          <p class="clash-card__level clash-card__level--barbarian">[m
[32m+[m[32m            {{ agreements.titleAgreement }}[m
[32m+[m[32m          </p>[m
[32m+[m[32m          <p class="dateCreated">[m
[32m+[m[32m            <i class="bi bi-calendar-date"></i> {{ agreements.dateFormatter }}[m
[32m+[m[32m            <i class="bi bi-geo-alt">{{ agreements.direction }}</i>[m
[32m+[m[32m          </p>[m
[32m+[m[32m          <hr />[m
[32m+[m[32m          <p>{{ agreements.description }}</p>[m
[32m+[m[32m          <hr />[m
[32m+[m
[32m+[m[32m          <div[m
[32m+[m[32m            class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix"[m
[32m+[m[32m          >[m
[32m+[m[32m            <div class="one-third">[m
[32m+[m[32m              <div class="stat"><i class="bi bi-emoji-smile"></i></div>[m
[32m+[m[32m              <div class="stat-value">{{ agreements.assesor }}</div>[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <div class="one-third">[m
[32m+[m[32m              <div class="stat"><i class="bi bi-phone"></i></div>[m
[32m+[m[32m              <div class="stat-value">{{ agreements.phone }}</div>[m
             </div>[m
[31m-            <div class="col-xs-12 col-sm-12 col-md-7">[m
[31m-                <h2 class="text-center title-page-intrernal">{{titlePage}}</h2>[m
[32m+[m
[32m+[m[32m            <div class="one-third no-border">[m
[32m+[m[32m              <div class="stat"><i class="bi bi-envelope"></i></div>[m
[32m+[m[32m              <div class="stat-value">{{ agreements.email }}</div>[m
             </div>[m
[31m-        </div>     [m
[31m-        <div class="wrapper-spinner">[m
[31m-            <app-spinner [ngClass]="loader ? 'loading-page' : 'hidden'"></app-spinner>[m
[31m-        </div>   [m
[31m-        <div *ngIf="!loader">[m
[31m-            <div class="row">[m
[31m-                <div class="col-xs-12 col-sm-12 col-md-4">[m
[31m-                    <img src="{{agreements.image}}" alt="pr-sample13" class="img-fluid" alt="novedades fomevi" />[m
[31m-                </div>[m
[31m-                <div class="col-xs-12 col-sm-12 col-md-7 ms-4 not-margin">[m
[31m-                    <h2>{{agreements.title}}</h2>[m
[31m-                    <p class="clash-card__level clash-card__level--barbarian">{{agreements.titleAgreement}}</p>[m
[31m-                    <p class="dateCreated"><i class="bi bi-calendar-date"></i> {{agreements.dateFormatter}} <i class="bi bi-geo-alt">{{agreements.direction}}</i></p>[m
[31m-                    <hr>[m
[31m-                    <p>{{agreements.description}}</p>[m
[31m-                    <hr>[m
[31m-                    [m
[31m-                    <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">[m
[31m-                        <div class="one-third">[m
[31m-                            <div class="stat"><i class="bi bi-emoji-smile"></i></div>[m
[31m-                            <div class="stat-value">{{agreements.assesor}}</div>                         [m
[31m-                        </div>[m
[31m-                [m
[31m-                        <div class="one-third">[m
[31m-                            <div class="stat"><i class="bi bi-phone"></i></div>[m
[31m-                            <div class="stat-value">{{agreements.phone}}</div>[m
[31m-                        </div>[m
[31m-                [m
[31m-                        <div class="one-third no-border">                          [m
[31m-                            <div class="stat"><i class="bi bi-envelope"></i></div>[m
[31m-                            <div class="stat-value">{{agreements.email}}</div>                          [m
[31m-                        </div>[m
[31m-                [m
[31m-                    </div>[m
[31m-                </div>                [m
[31m-            </div>           [m
[32m+[m[32m          </div>[m
         </div>[m
[31m-    </div>   [m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m  </div>[m
 </section>[m
 <app-footer></app-footer>[m
[31m-[m

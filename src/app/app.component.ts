import { Component } from '@angular/core';
import { NgsRevealConfig } from 'ng-scrollreveal';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PortalFomevi';
  isLoading$: Observable<boolean>;

  constructor(
    config: NgsRevealConfig,
    private loaderService: LoaderService,
    private auth: AuthService
  ) {
    this.isLoading$ = this.loaderService.loading$;
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    config.origin = 'top';
  }

  ngOnInit(): void {
    const credentials = {
      user: environment.user,
      password: environment.password,
      email: '',
    };

    this.auth.login(credentials).subscribe({
      next: () => console.log('Login inicial exitoso'),
      error: (err) => console.error('Error al hacer login inicial:', err),
    });
  }
}

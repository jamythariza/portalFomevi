import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditstateService } from '../../services/creditstate.service';

@Component({
  selector: 'app-credit-state',
  templateUrl: './credit-state.component.html',
  styleUrls: ['./credit-state.component.css'],
})
export class CreditStateComponent implements OnInit {
  @Input() showApproved: boolean = false;
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  estados: { guid: string; description: string }[] = [];
  estadosFiltrados: { guid: string; description: string }[] = [];

  constructor(private stateService: CreditstateService) {}

  ngOnInit() {
    this.stateService.GetCreditState().subscribe(
      (response) => {
        if (response.success) {
          this.estados = response.content;
          this.filtrarEstados();
        }
      },
      (error) => {}
    );
  }

  filtrarEstados() {
    if (this.showApproved) {
      const estadosPermitidos = [
        '7b46c505-7951-49b9-8200-a678acb038c5',
        '1e2b157b-d21c-41c3-b937-88adc4ee8852',
        '5ffa070a-aaa6-421b-ac33-3f3103da8297',
        'e0b3152f-2e16-4792-b441-8afab31b8074',
      ];

      this.estadosFiltrados = this.estados.filter((e) =>
        estadosPermitidos.includes(e.guid.toLowerCase())
      );
    } else {
      this.estadosFiltrados = this.estados;
    }
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}

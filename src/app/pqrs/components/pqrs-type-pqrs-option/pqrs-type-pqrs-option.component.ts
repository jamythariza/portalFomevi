import { Component, OnInit } from '@angular/core';
import {
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PqrsService } from '../../services/pqrs.service';

@Component({
  selector: 'app-pqrs-type-pqrs-option',
  templateUrl: './pqrs-type-pqrs-option.component.html',
  styleUrls: ['./pqrs-type-pqrs-option.component.css'],
})
export class PqrsTypePqrsOptionComponent {
  @Input() selectedValue: string = '';
  @Input() selectedGuidType: string = '';
  @Input() options: { guid: string; name: string }[] = [];
  @Output() valueChange = new EventEmitter<string>();

  estados: { guid: string; description: string }[] = [];
  guid: string = '';

  constructor(private stateService: PqrsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGuidType'] || changes['selectedValue']) {
      const guid = this.selectedGuidType || this.selectedValue;

      if (guid) {
        this.loadEstados(guid);
      }
    }
  }

  loadEstados(guid: string): void {
    this.stateService.PqrsTypeCategoryGetByPqrsTypeId(guid).subscribe(
      (response) => {
        if (response.success) {
          this.estados = response.content;
        }
      },
      (error) => {
        console.error('Error al cargar estados', error);
      }
    );
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}

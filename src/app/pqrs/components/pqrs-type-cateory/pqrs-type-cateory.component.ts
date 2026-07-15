import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PqrsService } from '../../services/pqrs.service';

@Component({
  selector: 'app-pqrs-type-cateory',
  templateUrl: './pqrs-type-cateory.component.html',
  styleUrls: ['./pqrs-type-cateory.component.css'],
})
export class PqrsTypeCateoryComponent implements OnInit {
  @Input() selectedValue: string = '';
  @Input() options: { guid: string; name: string }[] = [];
  @Output() valueChange = new EventEmitter<string>();

  estados: { guid: string; description: string }[] = [];

  constructor(private stateService: PqrsService) {}

  ngOnInit() {
    this.stateService.getPqrsType().subscribe(
      (response) => {
        if (response.success) {
          this.estados = response.content;
        }
      },
      (error) => {}
    );
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}

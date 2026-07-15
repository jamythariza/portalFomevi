import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectivesDto } from '../../models/credit-detail-dto-model';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent {
  @Output() valueChange = new EventEmitter<DirectivesDto>();
  @Output() completedDirectivesChange = new EventEmitter<DirectivesDto[]>();

  @Input() directives: DirectivesDto[] = [];

  onValueChange(value: DirectivesDto): void {
    const dir: DirectivesDto = {
      creditGuid: value.creditGuid,
      creditlineGuid: value.creditlineGuid,
      creditlineDescription: value.creditlineDescription,
      nameComplete: value.nameComplete,
      isPrincipal: value.isPrincipal,
      completed: value.completed,
      isAssigned: value.isAssigned,
      userGuid: value.userGuid,
      stateGuidApproval: value.stateGuidApproval,
      stateDescriptionApproval: value.stateDescriptionApproval,
    };

    this.valueChange.emit(dir);
  }

  updateDirectiveStatus(directive: DirectivesDto, completed: boolean) {
    // Actualizar estado
    directive.isAssigned = completed;

    // 🔥 Filtrar todas las completadas de la lista
    const completedDirectives = this.directives.filter((d) => d.isAssigned);

    // Emitir al padre
    this.completedDirectivesChange.emit(completedDirectives);
  }

  getBadgeClass(state: string): string {
    switch (state) {
      case 'Aprobada':
        return 'badge-success';
      case 'No Aprobada':
        return 'badge-danger';
      case 'Pendiente':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }
}

/**
 * COMPONENTE SELECT REUTILIZABLE
 * 
 * @Input label - Título del select
 * @Input description - Descripción opcional
 * @Input options - Array de opciones { value, label }
 * @Input selectedValue - Valor seleccionado actual
 * @Output selectedValueChange - Evento que emite el valor seleccionado
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-setting-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  template: `
    <div class="p-4 bg-white rounded-lg border border-gray-200">
      <label class="block text-gray-800 font-medium mb-2">{{ label }}</label>
      <mat-select 
        [(ngModel)]="selectedValue" 
        (selectionChange)="onSelectionChange()"
        class="w-full">
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </mat-option>
      </mat-select>
      <p *ngIf="description" class="text-gray-500 text-sm mt-2">{{ description }}</p>
    </div>
  `
})
export class SettingSelectComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: string = '';
  @Output() selectedValueChange = new EventEmitter<string>();

  onSelectionChange(): void {
    console.log('Select cambiado:', this.selectedValue); // 👈 Ver en consola
    this.selectedValueChange.emit(this.selectedValue);
  }
}
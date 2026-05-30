// 📁 src/app/components/setting-select/setting-select.component.ts
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
    <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <label class="block font-medium text-gray-800 mb-2">{{ label }}</label>
      <mat-select 
        [(ngModel)]="selectedValue" 
        (selectionChange)="onSelectionChange()" 
        class="w-full">
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </mat-option>
      </mat-select>
      <p *ngIf="description" class="text-sm text-gray-500 mt-2">{{ description }}</p>
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
    this.selectedValueChange.emit(this.selectedValue);
  }
}
// 📁 src/app/components/setting-toggle/setting-toggle.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-setting-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  template: `
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="flex flex-col">
        <span class="font-medium text-gray-800">{{ label }}</span>
        <span *ngIf="description" class="text-sm text-gray-500 mt-1">{{ description }}</span>
      </div>
      <mat-slide-toggle 
        [checked]="value" 
        (change)="onToggleChange($event)" 
        color="primary">
      </mat-slide-toggle>
    </div>
  `
})
export class SettingToggleComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() value: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onToggleChange(event: any): void {
    this.valueChange.emit(event.checked);
  }
}
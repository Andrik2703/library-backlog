// 📁 src/app/components/setting-slider/setting-slider.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-slider',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="flex justify-between items-center mb-3">
        <span class="font-medium text-gray-800">{{ label }}</span>
        <span class="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
          {{ value }}{{ unit }}
        </span>
      </div>
      <mat-slider [min]="min" [max]="max" [step]="step" discrete class="w-full">
        <input matSliderThumb [(ngModel)]="value" (ngModelChange)="onValueChange()">
      </mat-slider>
      <div class="flex justify-between text-xs text-gray-400 mt-2">
        <span>{{ min }}{{ unit }}</span>
        <span>{{ max }}{{ unit }}</span>
      </div>
    </div>
  `
})
export class SettingSliderComponent {
  @Input() label: string = '';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() unit: string = '';
  @Input() value: number = 50;
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(): void {
    this.valueChange.emit(this.value);
  }
}
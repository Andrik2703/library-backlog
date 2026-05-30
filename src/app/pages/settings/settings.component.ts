// 📁 src/app/pages/settings/settings.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

// -------------------------------------------------------------
// 1. COMPONENTE REUTILIZABLE: TOGGLE (con @Input y @Output)
// -------------------------------------------------------------
@Component({
  selector: 'app-setting-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  template: `
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div class="flex flex-col">
        <span class="font-medium text-gray-800">{{ label }}</span>
        <span *ngIf="description" class="text-sm text-gray-500 mt-1">{{ description }}</span>
      </div>
      <mat-slide-toggle [checked]="value" (change)="onToggleChange($event)" color="primary"></mat-slide-toggle>
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

// -------------------------------------------------------------
// 2. COMPONENTE REUTILIZABLE: SLIDER (con @Input y @Output)
// -------------------------------------------------------------
@Component({
  selector: 'app-setting-slider',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div class="flex justify-between items-center mb-3">
        <span class="font-medium text-gray-800">{{ label }}</span>
        <span class="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">{{ value }}{{ unit }}</span>
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

// -------------------------------------------------------------
// 3. COMPONENTE REUTILIZABLE: SELECT (con @Input y @Output)
// -------------------------------------------------------------
export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-setting-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  template: `
    <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <label class="block font-medium text-gray-800 mb-2">{{ label }}</label>
      <mat-select [(ngModel)]="selectedValue" (selectionChange)="onSelectionChange()" class="w-full">
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

// -------------------------------------------------------------
// 4. PÁGINA PRINCIPAL DE SETTINGS
// -------------------------------------------------------------
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SettingToggleComponent,
    SettingSliderComponent,
    SettingSelectComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-4xl mx-auto p-6">
        
        <!-- ENCABEZADO -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <mat-icon class="text-blue-600 text-3xl">settings</mat-icon>
            <h1 class="text-3xl font-bold text-gray-800">Configuración</h1>
          </div>
          <p class="text-gray-500 ml-1">Administra tus preferencias y personaliza tu experiencia</p>
          <div class="h-px bg-gray-200 mt-4"></div>
        </div>

        <!-- SECCIÓN 1: APARIENCIA -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div class="flex items-center gap-2">
              <mat-icon class="text-blue-600">palette</mat-icon>
              <h2 class="text-lg font-semibold text-gray-800">Apariencia</h2>
            </div>
            <p class="text-sm text-gray-500 mt-1">Personaliza cómo se ve Library Backlog</p>
          </div>
          <div class="p-4 space-y-4">
            <app-setting-select
              label="Tema"
              description="Selecciona el modo de visualización"
              [options]="themeOptions"
              [selectedValue]="selectedTheme"
              (selectedValueChange)="onThemeChange($event)">
            </app-setting-select>
            <app-setting-select
              label="Idioma"
              description="Elige tu idioma preferido"
              [options]="languageOptions"
              [selectedValue]="selectedLanguage"
              (selectedValueChange)="onLanguageChange($event)">
            </app-setting-select>
          </div>
        </div>

        <!-- SECCIÓN 2: NOTIFICACIONES -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
            <div class="flex items-center gap-2">
              <mat-icon class="text-purple-600">notifications</mat-icon>
              <h2 class="text-lg font-semibold text-gray-800">Notificaciones</h2>
            </div>
            <p class="text-sm text-gray-500 mt-1">Controla cómo recibes alertas</p>
          </div>
          <div class="p-4 space-y-4">
            <app-setting-toggle
              label="Habilitar notificaciones"
              description="Recibe alertas sobre nuevos libros"
              [value]="notificationsEnabled"
              (valueChange)="onNotificationsChange($event)">
            </app-setting-toggle>
            <div *ngIf="notificationsEnabled" class="ml-6 pl-4 border-l-2 border-purple-200 space-y-3">
              <app-setting-toggle
                label="Notificaciones por email"
                description="Resúmenes semanales y alertas"
                [value]="emailNotifications"
                (valueChange)="onEmailNotificationsChange($event)">
              </app-setting-toggle>
              <app-setting-toggle
                label="Notificaciones push"
                description="Alertas en tiempo real"
                [value]="pushNotifications"
                (valueChange)="onPushNotificationsChange($event)">
              </app-setting-toggle>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 3: PRIVACIDAD -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
            <div class="flex items-center gap-2">
              <mat-icon class="text-green-600">privacy_tip</mat-icon>
              <h2 class="text-lg font-semibold text-gray-800">Privacidad</h2>
            </div>
            <p class="text-sm text-gray-500 mt-1">Controla quién ve tu información</p>
          </div>
          <div class="p-4 space-y-4">
            <app-setting-toggle
              label="Perfil público"
              description="Permite que otros usuarios vean tu perfil"
              [value]="publicProfile"
              (valueChange)="onPublicProfileChange($event)">
            </app-setting-toggle>
            <app-setting-toggle
              label="Mostrar actividad de lectura"
              description="Comparte qué libros estás leyendo"
              [value]="showReadingActivity"
              (valueChange)="onShowReadingActivityChange($event)">
            </app-setting-toggle>
          </div>
        </div>

        <!-- SECCIÓN 4: VISUALIZACIÓN -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
            <div class="flex items-center gap-2">
              <mat-icon class="text-orange-600">visibility</mat-icon>
              <h2 class="text-lg font-semibold text-gray-800">Visualización</h2>
            </div>
            <p class="text-sm text-gray-500 mt-1">Ajusta cómo se muestran los contenidos</p>
          </div>
          <div class="p-4 space-y-4">
            <app-setting-slider
              label="Libros por página"
              [min]="10" [max]="50" [step]="5"
              [value]="itemsPerPage"
              (valueChange)="onItemsPerPageChange($event)">
            </app-setting-slider>
            <app-setting-slider
              label="Tamaño de fuente"
              [min]="12" [max]="24" [step]="1"
              unit="px"
              [value]="fontSize"
              (valueChange)="onFontSizeChange($event)">
            </app-setting-slider>
          </div>
        </div>

        <!-- BOTONES -->
        <div class="flex justify-end gap-4 mt-6">
          <button mat-stroked-button color="primary" (click)="resetToDefault()" class="border-gray-300">
            <mat-icon>restore</mat-icon>
            Restablecer
          </button>
          <button mat-raised-button color="primary" (click)="saveSettings()" class="bg-blue-600 text-white">
            <mat-icon>save</mat-icon>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  // Opciones para selects
  themeOptions: SelectOption[] = [
    { value: 'light', label: '☀️ Claro' },
    { value: 'dark', label: '🌙 Oscuro' },
    { value: 'system', label: '💻 Sistema' }
  ];
  
  languageOptions: SelectOption[] = [
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'en', label: '🇬🇧 English' }
  ];

  // Variables de estado
  selectedTheme: string = 'light';
  selectedLanguage: string = 'es';
  notificationsEnabled: boolean = true;
  emailNotifications: boolean = true;
  pushNotifications: boolean = false;
  publicProfile: boolean = true;
  showReadingActivity: boolean = true;
  itemsPerPage: number = 20;
  fontSize: number = 16;

  constructor(private snackBar: MatSnackBar) {}

  // Manejadores de cambios (@Output)
  onThemeChange(value: string) { this.selectedTheme = value; }
  onLanguageChange(value: string) { this.selectedLanguage = value; }
  onNotificationsChange(value: boolean) { this.notificationsEnabled = value; }
  onEmailNotificationsChange(value: boolean) { this.emailNotifications = value; }
  onPushNotificationsChange(value: boolean) { this.pushNotifications = value; }
  onPublicProfileChange(value: boolean) { this.publicProfile = value; }
  onShowReadingActivityChange(value: boolean) { this.showReadingActivity = value; }
  onItemsPerPageChange(value: number) { this.itemsPerPage = value; }
  onFontSizeChange(value: number) { this.fontSize = value; }

  // Guardar configuración
  saveSettings(): void {
    this.snackBar.open('✅ Configuración guardada exitosamente', 'Cerrar', { 
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  // Restablecer configuración
  resetToDefault(): void {
    this.selectedTheme = 'light';
    this.selectedLanguage = 'es';
    this.notificationsEnabled = true;
    this.emailNotifications = true;
    this.pushNotifications = false;
    this.publicProfile = true;
    this.showReadingActivity = true;
    this.itemsPerPage = 20;
    this.fontSize = 16;
    this.snackBar.open('🔄 Configuración restaurada a valores predeterminados', 'Cerrar', { 
      duration: 3000 
    });
  }
}
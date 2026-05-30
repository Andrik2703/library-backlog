import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements AfterViewInit {
  @ViewChild('searchInputRef', { static: false }) searchInputRef: ElementRef = new ElementRef(null);
  @Input() searchInputPlaceholder: string = 'Search...';
  @Input() showFiltersButton: boolean = true;
  @Output() searchInputValueChange = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();

  public searchInputValue: string = '';

  ngAfterViewInit(): void {
    fromEvent(this.searchInputRef.nativeElement, 'keyup')
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => {
        this.searchInputValueChange.emit(this.searchInputRef.nativeElement.value);
      });
  }

  public sendSearchInputValue() {
    this.searchTerm.emit(this.searchInputValue);
  }
}
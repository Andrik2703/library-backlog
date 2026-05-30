import { CommonModule } from '@angular/common';
import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/general/search-bar/search-bar.component';

@Component({
  selector: 'app-explore',
  imports: [
    CommonModule,
    SearchBarComponent
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent {

public test (searchTerm: string){
  console.log(searchTerm);
} 
}

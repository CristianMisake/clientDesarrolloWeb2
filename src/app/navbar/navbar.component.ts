import { Component, Input, OnInit } from '@angular/core';
//servicios
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isAdmin: Boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  
  cerrarSession(){
    this.dataService.closeSession();
  }

}

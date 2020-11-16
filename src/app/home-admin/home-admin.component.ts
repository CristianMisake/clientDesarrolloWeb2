import { Component, OnInit } from '@angular/core';
//servicio
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //validar session
    this.dataService.verifySessionIn();
  }

}

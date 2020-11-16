import { Component, OnInit } from '@angular/core';
//servicio
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //validar session
    this.dataService.verifySessionIn();
  }

}

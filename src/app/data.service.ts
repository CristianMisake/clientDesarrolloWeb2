import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//interfaces
import { interResponse } from './interfaces/interService';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    private REST_API_SERVER = "http://localhost:3020/api";
    private tokenGetter = () => localStorage.getItem("access_token") ?? '';

    private httpOptions = () => {
        return {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: this.tokenGetter()
            })
        }
    };

    constructor(private httpClient: HttpClient, private router: Router, private route:ActivatedRoute) { }

    public sendGetRequest(url:string) {
        return this.httpClient.get(`${this.REST_API_SERVER}/${url}`, this.httpOptions());
    }

    public sendPostRequest(url:string, body:{}) {
        return this.httpClient.post(`${this.REST_API_SERVER}/${url}`, body, this.httpOptions());
    }

    public verifySession = () => {
        const token = this.tokenGetter();
        if (token === '') return;
        this.sendPostRequest('usuario/verifyLogin', {}).subscribe((e:interResponse) => {
            this.router.navigate([(e.datos.is_admin) ? 'homeAdmin' : 'home']);
        });
    };

    public verifySessionIn = () => {
        const token = this.tokenGetter();
        const urlActual = this.router.routerState.snapshot.url;
        if (token === '') return this.router.navigate(['']);
        this.sendPostRequest('usuario/verifyLogin', {}).subscribe((e:interResponse) => {
            const urlGo = (e.datos.is_admin) ? 'homeAdmin' : 'home';
            const navigate = (urlActual === '/homeAdmin' && urlGo !== 'homeAdmin')
                || (urlActual === '/home' && urlGo !== 'home');
            if (navigate) this.router.navigate([urlGo]);
        });
    };
    
    //manejo de localStorage
    public openSession = (token:string, isAdmin:boolean) => {
        localStorage.setItem('access_token', token);
        this.router.navigate([(isAdmin) ? 'homeAdmin' : 'home'], { relativeTo: this.route });
    }

    public closeSession = () => {
        localStorage.clear();
        this.router.navigate(['']);
    }
}
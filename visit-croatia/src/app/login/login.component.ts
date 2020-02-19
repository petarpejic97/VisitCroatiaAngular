import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  login: boolean = true;
  register: boolean = false;
  korisnik = { email: '', password: '' };
  parametriSlanje: any;
  
  error: boolean = false;
  errorPass:string;
  errorMessage: string;
  regKorisnik={name:'',phone:'',email:'',password:'',confPassword:''}

  constructor(public _loginService: LoginService,
    private router: Router) {}

  ngOnInit() {
    
  }

  registrirajKorisnika(regKorisnik) {
    console.log(regKorisnik);
    
    if(regKorisnik.password !== regKorisnik.confPassword){
        this.error=true;
        this.errorPass="Lozinke su razlicite !"
    }
    else if(regKorisnik.password === regKorisnik.confPassword){
        this.error=false;
        this.errorPass="";

        this.parametriSlanje={
          'name':regKorisnik.name,
          'phoneNumber':regKorisnik.phone,
          'email':regKorisnik.email,
          'password':regKorisnik.password
        }

        this._loginService.registrirajKorisnika(this.parametriSlanje).subscribe(res => {
          console.log(res);
          if (res) {
            this.login = true;
            this.register = false;
           }
        });
    }
  }
  
  dohvatiKorisnika(korisnik) {
    console.log(korisnik);
    this.parametriSlanje = {
      'email':korisnik.email, 
      'pass':korisnik.password
    }
    console.log(this.parametriSlanje);
    this._loginService.dohvatiKorisnika(this.parametriSlanje).subscribe(res => {
      console.log(res['success']);
       if (res['success'] === true) {
        this.error = false;
        localStorage.setItem("ime",res['rez'][0].name);
        localStorage.setItem("telefon",res['rez'][0].phoneNumber);
        localStorage.setItem("email",res['rez'][0].email);
          if(localStorage.getItem('email') === 'petar.pejic@outlook.com'){
            this.router.navigate(['/cities']);
          }
          else{
            this.router.navigate(['/event']);
          }
       } else {
        this.error = true;
        this.errorMessage = res['message'];
       }
    });
  }

  loginFunction() {
    this.login = true;
    this.register = false;
  }

  registerFunction() {
    this.login = false;
    this.register = true;
  }

}

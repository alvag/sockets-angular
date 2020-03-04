import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {
    name = '';

    constructor(private router: Router,
                private wsService: WebsocketService ) { }

    ngOnInit() {
    }

    login() {
        this.wsService.loginWS( this.name )
        .then(() => {
            this.router.navigateByUrl('/messages');
        });
    }
}

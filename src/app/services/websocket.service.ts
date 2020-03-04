import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/user';

@Injectable( {
    providedIn: 'root'
} )
export class WebsocketService {

    socketStatus: boolean;
    user: User;

    constructor( private socket: Socket ) {
        this.loadStorage();
        this.checkStstus();
    }

    checkStstus() {
        this.socket.on( 'connect', () => {
            console.log( 'Conectado al servidor!' );
            this.socketStatus = true;
        } );

        this.socket.on( 'disconnect', () => {
            console.log( 'Desconectado al servidor' );
            this.socketStatus = false;
        } );
    }

    emit( event: string, payload?: any, callback?: ( res ) => void ) {
        console.log( 'Emitiendo:', event );
        this.socket.emit( event, payload, callback );
    }

    listen( event: string ) {
        return this.socket.fromEvent( event );
    }

    loginWS( name: string ) {
        return new Promise( ( resolve, reject ) => {
            this.emit( 'config-user', { name }, ( res ) => {
                console.log( 'res', res );
                this.user = new User(name);
                this.saveStorage();
                resolve();
            } );
        } );
    }

    saveStorage() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    loadStorage() {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.loginWS(this.user.name);
        }
    }
}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable( {
    providedIn: 'root'
} )
export class WebsocketService {

    socketStatus: boolean;

    constructor( private socket: Socket ) {
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

    emit(event: string, payload?: any, callback?: () => void) {
        console.log('Emitiendo:', event);
        this.socket.emit(event, payload, callback);
    }

    listen(event: string) {
        return this.socket.fromEvent(event);
    }
}

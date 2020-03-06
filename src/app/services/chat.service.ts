import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable( {
    providedIn: 'root'
} )
export class ChatService {

    constructor( public wsService: WebsocketService ) { }

    sendMessage( message: string ) {
        const payload = {
            from: this.wsService.user.name,
            message
        };

        this.wsService.emit( 'message', payload );
    }

    getMessages() {
        return this.wsService.listen( 'new-message' );
    }

    getPrivateMessages() {
        return this.wsService.listen( 'private-message' );
    }

    getActiveUsers() {
        return this.wsService.listen('active-users');
    }

    getUsers() {
        return this.wsService.emit('get-users');
    }
}

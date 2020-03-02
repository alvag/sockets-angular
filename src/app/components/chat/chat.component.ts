import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component( {
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
} )
export class ChatComponent implements OnInit, OnDestroy {

    message: string;
    messageSubscription: Subscription;
    chatElement: HTMLElement;
    messages: any[] = [];

    constructor( private chatService: ChatService ) { }

    ngOnInit() {
        this.chatElement = document.getElementById( 'chat-messages' );
        this.messageSubscription = this.chatService.getMessages().subscribe( res => {
            console.log( res );
            this.messages.push( res );

            setTimeout( () => {
                this.chatElement.scrollTop = this.chatElement.scrollHeight;
            }, 50 );
        } );
    }

    ngOnDestroy(): void {
        this.messageSubscription.unsubscribe();
    }

    send() {

        if ( this.message && this.message.trim().length ) {
            this.chatService.sendMessage( this.message );
            this.message = null;
        }
    }


}

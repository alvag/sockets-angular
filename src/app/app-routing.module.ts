import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UserGuard } from './guards/user-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [UserGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule( {
    declarations: [],
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [RouterModule]
} )
export class AppRoutingModule {}

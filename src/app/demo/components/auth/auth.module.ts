import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { PrimengModule } from 'src/primeng/primeng.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        PrimengModule
    ]
})
export class AuthModule { }

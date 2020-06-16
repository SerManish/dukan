import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        AlertBarComponent
    ],
    imports:[
    ],
    exports:[
        LoadingSpinnerComponent,
        AlertBarComponent
    ]
})
export class SharedModule
{}
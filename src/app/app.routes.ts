import { Routes } from '@angular/router';
import { FutureValuePage } from './future-value-page/future-value-page';

export const routes: Routes = [
    {
        path:'',
        component: FutureValuePage
    },
    {
        path: 'fv',
        component: FutureValuePage
    }
];

import { Routes, RouterModule } from '@angular/router';
import { GetComponent } from './get';
import { GiveComponent} from './give';
import { HomeComponent} from './home';
import { DonationForm } from './donation-form';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { RequestFormComponent } from './request-form/request-form.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'get', component: GetComponent },
    { path: 'give', component: GiveComponent },
    { path: 'donation-form', component: DonationFormComponent},
    { path: 'request-form', component: RequestFormComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
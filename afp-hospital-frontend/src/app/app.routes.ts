import { Routes } from '@angular/router';
import { ListaPazientiPageComponent } from './core/components/lista-pazienti-page/lista-pazienti-page.component';
import { AccettaPazientePageComponent } from './core/components/accetta-paziente-page/accetta-paziente-page.component';
import { NotFoundPageComponent} from './core/components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "pazienti",
        pathMatch: "full"
    },
    { 
        // lista pazienti 
        path: "pazienti",
        component: ListaPazientiPageComponent
    },
    { 
        // aggiunta paziente
        path: "pazienti/add",
        component: AccettaPazientePageComponent
    },
    { 
        // 404 page
        path: "**",
        component: NotFoundPageComponent
    }
];

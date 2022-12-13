import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CampaignsComponent } from '../components/campaigns/campaigns.component';
import { CampaignDetailComponent } from '../components/campaign-detail/campaign-detail.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'campaign/:id', component: CampaignDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

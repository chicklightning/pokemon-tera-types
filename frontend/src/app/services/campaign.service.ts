import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Campaign } from './campaign';
import { CAMPAIGNS } from './mock-campaigns';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private messageService: MessageService) { }

  getCampaigns(): Observable<Campaign[]> {
    const campaigns = of(CAMPAIGNS);
    return campaigns;
  }

  getCampaign(id: number): Observable<Campaign> {
    return of(CAMPAIGNS.find(campaign => campaign.id === id));
  }
}

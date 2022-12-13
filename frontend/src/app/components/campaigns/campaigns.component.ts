import { Component, OnInit } from '@angular/core';

import { Campaign } from '../../services/campaign';
import { CampaignService } from '../../services/campaign.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[];
  selectedCampaign: Campaign;

  constructor(private campaignService: CampaignService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  onSelect(campaign: Campaign): void {
    this.selectedCampaign = campaign;
  }

  getCampaigns(): void {
    this.campaignService.getCampaigns()
      .subscribe(campaigns => this.campaigns = campaigns);
  }
}

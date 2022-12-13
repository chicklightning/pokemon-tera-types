import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../services/campaign';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  @Input() campaign: Campaign;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.campaignService.getCampaign(id)
      .subscribe(campaign => this.campaign = campaign);
  }

}

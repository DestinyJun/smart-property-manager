import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../commons/services/organization.service';

@Component({
  selector: 'app-org-agency',
  templateUrl: './org-agency.component.html',
  styleUrls: ['./org-agency.component.scss']
})
export class OrgAgencyComponent implements OnInit {

  constructor(
    public organizationSrv: OrganizationService
  ) { }

  ngOnInit() {
  }

}

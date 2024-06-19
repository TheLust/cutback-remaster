import { Component } from '@angular/core';
import { MatGridList, MatGridTile, MatGridTileText } from "@angular/material/grid-list";
import { Company } from "../../models/response/company";
import { NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { CompanyService } from "../../services/company/company.service";
import { ImageService } from "../../services/image/image.service";
import { Size } from "../../models/request/size";

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgIf,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatGridTileText
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {

  breakpoint: number;
  companies: Company[] = [];

  constructor(companyService: CompanyService,
              imageService: ImageService) {
    this.breakpoint = this.getBreakpoint();

    companyService.getAllFull()
      .then(companies => {
        for (let company of companies) {
          if (company.image) {
            imageService.getImage(company.image.uuid, Size.ORIGINAL)
              .then(blob => {
                company.image = { uuid: URL.createObjectURL(blob) }
              });
          }
        }
        this.companies = companies;
        console.log(this.companies);
      });
  }

  private getBreakpoint(): number {
    const width = window.innerWidth;
    if (width < 576) {
      return 1;
    } else if (width < 768) {
      return 2;
    } else if (width < 992) {
      return 3;
    } else if (width < 1200) {
      return 4;
    } else {
      return width / 400;
    }
  }

  onResize($event: UIEvent) {
    this.breakpoint = this.getBreakpoint();
  }
}

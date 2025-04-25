import { Component } from '@angular/core';
import { EventService } from 'src/Services/event.service';
import { MemberService } from 'src/Services/member.service';
import { PubService } from 'src/Services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Nb_Members: number = 0;
  Nb_Articles: number = 0;
  Nb_Events: number = 0;
  Nb_Tools: number = 0;
  Nb_Students: number = 0;
  Nb_Teachers: number = 0;
  nbSousse: number = 0;
  nbTunis: number = 0;
  nbSfax: number = 0;
  tab: String[] = [];
  nbTypes: number[] = [];
  membersNames: String[] = [];
  nbEventsByMember: number[] = [];
  chartData: ChartDataset[] = [
    {
      label: 'Events by member name',
      data: [],
    }
  ];
  chartLabels: String[] = [];
  chartOptions: ChartOptions = {};

  chartDatapie: ChartDataset[] = [
    {
      data: [],
    }
  ];
  chartDatadoughnut: ChartDataset[] = [
    {
      data: [],
    }
  ];

  chartDatabar: ChartDataset[] = [
    {
      label: 'Events by member name',
      data: [],
    }
  ];

  chartLabelsbar: String[] = [];
  chartOptionsbar: ChartOptions = {};

  chartLabelspie: string[] = ['Teachers', 'Students'];
  chartOptionspie: ChartOptions = {};
  chartLabelsdoughnut: string[] = ['Sousse', 'Tunis', 'Sfax'];
  chartOptionsdoughnut: ChartOptions = {};

  constructor(private MS: MemberService, private PS: PubService, private ES: EventService) {
    this.MS.GetAllMembers().subscribe((data) => {
      this.Nb_Members = data.length;
      for (let i = 0; i < this.Nb_Members; i++) {
        if (data[i].type == 'Student') {
          this.Nb_Students++;
        } else {
          this.Nb_Teachers++;
        }
        this.membersNames.push(data[i].name);
        this.nbEventsByMember.push(data[i].tabEvents.length); 
        this.chartLabels = this.membersNames;
      }
      this.chartData = [
        {
          label: 'Events by member name',
          data: this.nbEventsByMember,
        }
      ];
      this.chartDatapie = [{
        data: [this.Nb_Teachers, this.Nb_Students],
      }]
    })
    this.PS.GetAllPubs().subscribe((data) => {
      this.Nb_Articles = data.length;
      // for (let i = 0; i < this.Nb_Articles; i++) {
      //   this.tab.push(data[i].type);
      //   console.log(this.tab);
      //   } Approche1: avec répétition 
        const typeUnique=[...new Set(data.map((item) => item.type))]; // Approche2: sans répétition
        for(const lieu of typeUnique) {
         const count=data.filter((m) => m.type === lieu).length;
         this.nbTypes.push(count);
        }
        this.chartLabelsbar = typeUnique;
        this.chartDatabar = [
          {
            label: 'Articles by type',
            data: this.nbTypes,
      }];
  })
    this.ES.GetAllEvent().subscribe((data) => {
      this.Nb_Events = data.length;
      for (let i = 0; i < this.Nb_Events; i++) {
        if (data[i].lieu == 'Sfax') {
          this.nbSfax++;
        } else if (data[i].lieu == 'Sousse') {
          this.nbSousse++;
        } else if (data[i].lieu == 'Tunis') {
          this.nbTunis++;
        }
      }
      this.chartDatadoughnut = [{
        data: [this.nbSousse, this.nbTunis, this.nbSfax]
      }];
    })

  }
}

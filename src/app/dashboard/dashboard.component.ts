import { Component } from '@angular/core';
import { EventService } from 'src/Services/event.service';
import { MemberService } from 'src/Services/member.service';
import { PubService } from 'src/Services/pub.service';
import {ChartDataset,ChartOptions} from 'chart.js';

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
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ 1551, 1688, 1800, 1895, 2124, 2124 ]
    }
  ];
  chartLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  chartOptions: ChartOptions = {};

  chartDatapie: ChartDataset[] = [
    {
      data: [   ],
    }
  ];
  chartLabelspie: string[] = ['Teachers', 'Students'];
  chartOptionspie: ChartOptions = {};
  constructor(private MS: MemberService, private PS: PubService, private ES: EventService) {
    this.MS.GetAllMembers().subscribe((data) => {
      this.Nb_Members = data.length;
      for (let i = 0; i < this.Nb_Members; i++) {
        if(data[i].type == 'Student') {
          this.Nb_Students++;
        }else {
          this.Nb_Teachers++;
        }
      }
      this.chartDatapie=[{
        data: [this.Nb_Teachers, this.Nb_Students],
      }]
    })
    this.PS.GetAllPubs().subscribe((data) => {
      this.Nb_Articles = data.length;
    })
    this.ES.GetAllEvent().subscribe((data) => {
      this.Nb_Events = data.length;
    })

  }

 
}

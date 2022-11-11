import { Component, OnInit } from '@angular/core';
import{Chart} from "chart.js";
import { registerables } from 'chart.js';
import { PropReadDTO } from '../Interfaces/prop-read-dto';
import { PropertyService } from 'src/app/Services/property.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
properties:PropReadDTO[]=[];
propPrice:any=[];
propLoc:string[]=[];

  constructor(private _propertyService:PropertyService) { }

  ngOnInit(): void {

    Chart.register(...registerables); 
    const BarChart = new Chart("BarChart", {
      type: 'bar',
      data: {
          labels: [ 'jan','feb','march','jan','feb','march' ],
          datasets: [{
              label: '# of Votes',
              data: [1,2,3,4,5,6
            ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  




    const LineChart = new Chart("LineChart", {
      type: 'line',
      data: {
        labels: ["Jan","feb","mar","april"],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
      }
  });

    const PieChart = new Chart("PieChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
  });


  }

}

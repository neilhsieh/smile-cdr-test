import { Component, OnInit } from "@angular/core";
import { ApiService } from "../app/services/api-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "fhir-app-test";
  patientList;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPatients().subscribe((data) => {
      const filteredPatientList = data.entry.sort((a, b) => {
        if (a.resource.birthDate && !b.resource.birthDate) {
          return 1;
        }
        if (!a.resource.birthDate && b.resource.birthDate) {
          return -1;
        }
        if (!a.resource.birthDate && !b.resource.birthDate) {
          return 0;
        }

        return new Date(a.resource.birthDate) - new Date(b.resource.birthDate);
      });

      this.patientList = filteredPatientList;
      // console.log(filteredPatientList);
    });

    /* --------------------------------------- 
    Uncomment below code to output retrieved database 
    youngest patients chronologically ordered 
    ------------------------------------------ */

    // this.apiService.getPatientOrderedByDate().subscribe((data) => {
    //   this.patientList = data.entry;
    // });

    /* --------------------------------------- 
    Uncomment below code to show patient resources whose birthdate 
    are between 1960 and 1965 (inclusive) 
    ------------------------------------------ */

    // this.apiService.getPatientByBirthDate().subscribe((data) => {
    //   this.patientList = data.entry;
    // });
  }
}

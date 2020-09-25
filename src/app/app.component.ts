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
  requestRunTime = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const timerStart = window.performance.now();
    console.log(timerStart);

    this.getPatients();
    /* --------------------------------------- 
    Uncomment below code to output retrieved database 
    youngest patients chronologically ordered 
    ------------------------------------------ */
    // this.getEarlistDatabasePatient();

    /* --------------------------------------- 
    Uncomment below code to show patient resources whose birthdate 
    are between 1960 and 1965 (inclusive) 
    ------------------------------------------ */
    // this.getBirthDateSortedPatients();
    const timerEnd = window.performance.now();
    console.log("timer end", timerEnd);

    this.requestRunTime = timerEnd - timerStart;
  }

  getPatients() {
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
      console.log("done getting patients");

      // console.log(filteredPatientList);
    });
    console.log("in method", window.performance.now());
  }

  getEarlistDatabasePatient() {
    // this.apiService.getPatientOrderedByDate().subscribe((data) => {
    //   this.patientList = data.entry;
    // });
  }

  getBirthDateSortedPatients() {
    // this.apiService.getPatientByBirthDate().subscribe((data) => {
    //   this.patientList = data.entry;
    // });
  }
}

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
  nameError = false;
  dateError = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const timerStart = window.performance.now();

    this.getPatients();

    /* --------------------------------------- 
    Uncomment below code to show patient resources whose birthdate 
    are between 1960 and 1965 (inclusive) 
    ------------------------------------------ */
    // this.getBirthDateSortedPatients();
    const timerEnd = window.performance.now();

    this.requestRunTime = timerEnd - timerStart;
  }
  checkNameValid(name: string) {
    if (RegExp(/[^a-zA-Z ]/g).test(name)) {
      this.nameError = true;
    } else {
      this.nameError = false;
    }
  }

  checkDateValid(date: string) {
    if (RegExp(/[^0-9/]/g).test(date)) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }

  search(name: string, birthDate: string) {
    const isValidBirthYear = birthDate
      ? (birthDate.match(/\//g) || []).length === 2 &&
        RegExp(/[^0-9]/g).test(birthDate.split("/")[0]) &&
        birthDate.split("/")[0].length === 4
      : true;
    const isValidBirthMonth = birthDate
      ? (birthDate.match(/\//g) || []).length === 2 &&
        RegExp(/[^0-9]/g).test(birthDate.split("/")[0]) &&
        birthDate.split("/")[1].length === 2
      : true;
    const isValidBirthDate = birthDate
      ? (birthDate.match(/\//g) || []).length === 2 &&
        RegExp(/[^0-9]/g).test(birthDate.split("/")[0]) &&
        birthDate.split("/")[2].length === 2
      : true;

    if (!isValidBirthYear || !isValidBirthMonth || !isValidBirthDate) {
      this.dateError = true;
    }
    if (!this.nameError && !this.dateError) {
      this.apiService.getSearchedPatient(name, birthDate).subscribe((data) => {
        this.patientList = data.entry;
      });
    }
  }

  getPatients() {
    this.apiService.getPatients().subscribe((data) => {
      console.log(data);
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
    });
  }

  getBirthDateSortedPatients() {
    this.apiService.getPatientByBirthDate().subscribe((data) => {
      console.log(data);
      this.patientList = data.entry;
    });
  }
}

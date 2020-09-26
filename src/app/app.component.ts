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
  timerStart;
  timerEnd;
  requestRunTime = 0;
  nameError = false;
  dateError = false;
  isSearching = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.timerStart = window.performance.now();

    this.getPatients();

    /* --------------------------------------- 
    Uncomment below code to show patient resources whose birthdate 
    are between 1960 and 1965 (inclusive) 
    ------------------------------------------ */

    // this.getBirthDateSortedPatients();

    this.timerEnd = window.performance.now();

    this.requestRunTime = this.timerEnd - this.timerStart;
  }

  /* ---------- Helper Methods ---------- */

  /* ---------- On keydown name validator ---------- */
  checkNameValid(name: string) {
    if (RegExp(/[^a-zA-Z ]/g).test(name)) {
      this.nameError = true;
    } else {
      this.nameError = false;
    }
  }

  /* ---------- On keydown date validator ---------- */
  checkDateValid(date: string) {
    if (RegExp(/[^0-9/]/g).test(date)) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }

  sortByBirthdate(data) {
    return data.entry.sort((a, b) => {
      if (a.resource.birthDate && !b.resource.birthDate) {
        return 1;
      }
      if (!a.resource.birthDate && b.resource.birthDate) {
        return -1;
      }
      if (!a.resource.birthDate && !b.resource.birthDate) {
        return 0;
      }
      if (a.resource.birthDate && b.resource.birthDate) {
        if (a.resource.birthDate > b.resource.birthDate) {
          return 1;
        } else if (a.resource.birthDate < b.resource.birthDate) {
          return -1;
        } else {
          return 0;
        }
      }

      return a.resource.birthDate - b.resource.birthDate;
    });
  }

  /* ---------- Search method. Checks for errors than shows searches if any ---------- */
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
    if (!this.nameError && !this.dateError && !this.isSearching) {
      this.isSearching = true;
      this.timerStart = window.performance.now();

      this.apiService
        .getSearchedPatient(name, birthDate)
        .subscribe((data: any) => {
          console.log("Searched data:", data);
          const filteredPatientList = this.sortByBirthdate(data);

          this.patientList = filteredPatientList;
          this.isSearching = false;
        });
      this.timerEnd = window.performance.now();

      this.requestRunTime = this.timerEnd - this.timerStart;
    }
  }

  /* ---------- Get patients sorted by youngest to oldest ---------- */
  getPatients() {
    this.apiService.getPatients().subscribe((data: any) => {
      console.log("Initial load data:", data);

      const filteredPatientList = this.sortByBirthdate(data);

      this.patientList = filteredPatientList;
      // console.log(this.patientList[15].resource.id);
    });
  }

  /* ---------- Get patients with birtdates between 1960 and 1965 (inclusive) ---------- */
  getBirthDateSortedPatients() {
    this.apiService.getPatientByBirthDate().subscribe((data: any) => {
      console.log("Patient between 1960 and 1965 data:", data);
      this.patientList = data.entry;
    });
  }
}

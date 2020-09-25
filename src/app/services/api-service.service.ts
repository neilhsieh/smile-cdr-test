import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getPatients() {
    return this.httpClient.get(environment.queryURI + "/Patient", {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      "Content-Type": "application/fhir+json",
    });
    return headers;
  }

  getPatientByBirthDate() {
    const queryString: string =
      "?birthdate=ge1960-01-01&birthdate=le1965-12-31";
    return this.httpClient.get(
      environment.queryURI + "/Patient" + queryString,
      {
        headers: this.getHeaders(),
      }
    );
  }
  getSearchedPatient(name, date) {
    let queryString: string;
    if (name && date) {
      queryString = `?name=${name}&birthdate=eq${date}`;
    } else if (!name && date) {
      queryString = `?birthdate=eq${date}`;
    } else if (name && !date) {
      queryString = `?name=${name}&`;
    } else {
      queryString = "";
    }

    return this.httpClient.get(
      environment.queryURI + "/Patient" + queryString,
      {
        headers: this.getHeaders(),
      }
    );
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { MillisecondsPipe } from "src/app/pipe/milliseconds.pipe";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  providers: [MillisecondsPipe],
})
export class FooterComponent implements OnInit {
  @Input requestRunTime: number;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-my-lib',
  templateUrl: './my-lib.component.html',
  styles: [],
})
export class MyLibComponent implements OnInit {
  linkingForm = new FormGroup({
    linkFromVariable: new FormControl(null),
  });
  linkFromVariables = [
    {
      getDescription() {
        return 'Variable1';
      },
    },
    {
      getDescription() {
        return 'Variable2';
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

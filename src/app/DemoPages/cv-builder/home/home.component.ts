import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../dynamic-form/form-field';
import { FormfieldControlService } from '../dynamic-form/formfield-control.service';
import { of, Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [FormfieldControlService]
})
export class HomeComponent implements OnInit {
  active = 'heading';

  tabs = { 
    heading : {
    id: 'heading',
    label: 'HEADING',
    formFields: this.getHeadingFields()
  }, education: {
    id: 'education',
    label: 'EDUCATION',
    formFields: this.getEducationFields()
  }, workHistory: {
    id: 'workHistory',
    label: 'WORK HISTORY',
    formFields: this.getWorkHistoryFields()
  }, skills: {
    id: 'skills',
    label: 'SKILLS',
    formFields: this.getHeadingFields()
  }, summary: {
    id: 'summary',
    label: 'SUMMARY',
    formFields: this.getHeadingFields()
  }, finalize: {
    id: 'finalize',
    label: 'FINALIZE',
    formFields: this.getHeadingFields()
  }};

  formFields: Observable<FormField<any>[]>;
  
  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, service: FormfieldControlService) {
    this.formFields = service.getFormFields();
  }

  ngOnInit(): void {
    
  }

  onSubmit(value: any) {
    alert(value);
  }

  getHeadingFields() {

    const inputs: FormField<string>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'name',
        label: 'Name',
        required: true,
        value: 'vinit solanki',
        order: 1
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validator: "email",
        order: 2
      }),

      new FormField<string>({
        controlType: "dropdown",
        key: 'country',
        label: 'Country',
        options: [
          {key: 'usa',  value: 'United States of America'},
          {key: 'br',  value: 'Brazil'},
          {key: 'other',   value: 'Other'}
        ],
        order: 3
      }),

      new FormField<string>({
        controlType: "checkbox",
        key: 'agree',
        label: 'I accept terms and services',
        type: 'checkbox',
        required: true,
        order: 4
      }),

      new FormField<string>({
        controlType: "radio",
        key: 'sex',
        label: 'Sex',
        type: 'radio',
        options: [
          {key: 'male',  value: 'Male'},
          {key: 'female',  value: 'Female'}
        ],
        order: 5
      }),

      new FormField<string>({
        controlType: "textarea",
        key: 'message',
        label: 'Mesage',
        type: 'textarea',
        order: 6
      })
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getEducationFields() {

    const inputs: FormField<string>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'name',
        label: 'Name',
        required: true,
        value: 'vinit solanki',
        order: 1
      }),

    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }


  getWorkHistoryFields() {

    const inputs: FormField<string>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'name',
        label: 'Name',
        required: true,
        value: 'vinit solanki',
        order: 1
      }),

      new FormField<string>({
        controlType: "radio",
        key: 'sex',
        label: 'Sex',
        type: 'radio',
        options: [
          {key: 'male',  value: 'Male'},
          {key: 'female',  value: 'Female'}
        ],
        order: 5
      }),

      new FormField<string>({
        controlType: "textarea",
        key: 'message',
        label: 'Mesage',
        type: 'textarea',
        order: 6
      })
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  clickNext(active: any) {
    let keys = Object.keys(this.tabs);
    let nextIndex = keys.indexOf(active) +1;
    let nextItem = keys[nextIndex];
    //this.active = nextItem;
    this.nav.select(nextItem);
  }


  @ViewChild("nav")
  nav;
  
  clickPrev(active: any) {
    let keys = Object.keys(this.tabs);
    let prevIndex = keys.indexOf(active) -1;
    let prevItem = keys[prevIndex];
    //this.active = prevItem;
    this.nav.select(prevItem);
  }

  public keepOriginalOrder = (a, b) => a.key;

}

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

    const inputs: FormField<any>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'firstName',
        label: 'First Name',
        cssClass: 'col-md-6',
        required: true,
        order: 1
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'lastName',
        label: 'Last Name',
        cssClass: 'col-md-6',
        required: true,
        order: 2
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'profession',
        label: 'Profession',
        cssClass: 'col-md-12',
        required: false,
        order: 3
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'city',
        label: 'City',
        cssClass: 'col-md-6',
        required: false,
        order: 4
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'state',
        label: 'State/Region',
        cssClass: 'col-md-6',
        required: false,
        order: 5
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'country',
        label: 'Country',
        cssClass: 'col-md-6',
        required: false,
        order: 6
      }),

      new FormField<number>({
        controlType: "textbox",
        key: 'postalCode',
        label: 'Postal Code',
        cssClass: 'col-md-6',
        required: false,
        order: 7
      }),

      new FormField<number>({
        controlType: "textbox",
        key: 'Phone',
        label: 'Phone',
        cssClass: 'col-md-6',
        required: false,
        order: 8
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'email',
        label: 'Email',
        type: 'email',
        cssClass: 'col-md-6',
        validator: "email",
        order: 9
      })

      // new FormField<string>({
      //   controlType: "dropdown",
      //   key: 'country',
      //   label: 'Country',
      //   options: [
      //     {key: 'usa',  value: 'United States of America'},
      //     {key: 'br',  value: 'Brazil'},
      //     {key: 'other',   value: 'Other'}
      //   ],
      //   order: 3
      // }),

      // new FormField<string>({
      //   controlType: "checkbox",
      //   key: 'agree',
      //   label: 'I accept terms and services',
      //   type: 'checkbox',
      //   required: true,
      //   order: 4
      // }),

      // new FormField<string>({
      //   controlType: "radio",
      //   key: 'sex',
      //   label: 'Sex',
      //   type: 'radio',
      //   options: [
      //     {key: 'male',  value: 'Male'},
      //     {key: 'female',  value: 'Female'}
      //   ],
      //   order: 5
      // }),

      // new FormField<string>({
      //   controlType: "textarea",
      //   key: 'message',
      //   label: 'Mesage',
      //   type: 'textarea',
      //   order: 6
      // })
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getEducationFields() {

    const inputs: FormField<string>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'schoolName',
        label: 'School Name',
        cssClass: 'col-md-6',
        order: 1
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'fieldOfStudy',
        label: 'Field of Study',
        cssClass: 'col-md-6',
        order: 2
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'city',
        label: 'City',
        cssClass: 'col-md-6',
        required: false,
        order: 3
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'country',
        label: 'Country',
        cssClass: 'col-md-6',
        required: false,
        order: 4
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'StartDate',
        label: 'Start Date',
        cssClass: 'col-md-6',
        order: 5
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'endDate',
        label: 'End Date',
        cssClass: 'col-md-6',
        order: 6
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'degree',
        label: 'Degree',
        cssClass: 'col-md-6',
        order: 7
      }),

      new FormField<string>({
        controlType: "checkbox",
        key: 'currentSchool',
        label: 'I currently attend here',
        type: 'checkbox',
        cssClass: 'col-md-6',
        order: 8
      })

    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }


  getWorkHistoryFields() {

    const inputs: FormField<string>[] = [

      new FormField<string>({
        controlType: "textbox",
        key: 'jobTitle',
        label: 'Job Title',
        cssClass: 'col-md-6',
        order: 1
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'companyName',
        label: 'Company Name',
        cssClass: 'col-md-6',
        order: 2
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'city',
        label: 'City',
        cssClass: 'col-md-6',
        required: false,
        order: 3
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'country',
        label: 'Country',
        cssClass: 'col-md-6',
        required: false,
        order: 4
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'StartDate',
        label: 'Start Date',
        cssClass: 'col-md-6',
        order: 5
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'endDate',
        label: 'End Date',
        cssClass: 'col-md-6',
        order: 6
      }),

      new FormField<string>({
        controlType: "checkbox",
        key: 'currentCompany',
        label: 'I currently work here',
        type: 'checkbox',
        cssClass: 'col-md-12',
        order: 7
      }),

      new FormField<string>({
        controlType: "textbox",
        key: 'jobDescription',
        label: 'Job Description',
        cssClass: 'col-md-12',
        order: 8
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

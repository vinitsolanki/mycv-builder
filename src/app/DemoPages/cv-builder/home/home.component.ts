import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../dynamic-form/form-field';
import { FormfieldControlService } from '../dynamic-form/formfield-control.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FormfieldControlService]
})
export class HomeComponent implements OnInit {
  active = 'personalDetail';

  tabs = {
    personalDetail: {
      id: 'personalDetail',
      label: 'Personal Details',
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
    }
  };

  public personalDetailForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    profession: [''],
    city: [''],
    state: [''],
    country: [''],
    postalCode: [''],
    phone: [''],
    email: ['', Validators.email]
  });

  private education: FormGroup = this.formBuilder.group({
    schoolName: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    city: [''],
    country: [''],
    startDate: [''],
    endDate: [''],
    degree: [''],
    isAttended: [false]
  })

  public educationForm: FormGroup = this.formBuilder.group({
    educations: this.formBuilder.array([this.education])
  });

  private workHistory: FormGroup = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    companyName: ['', Validators.required],
    city: [''],
    country: [''],
    startDate: [''],
    endDate: [''],
    isWorkingHere: [false],
    jobDesc: ['']
  });

  public workHistoryForm: FormGroup = this.formBuilder.group({
    workHistorys: this.formBuilder.array([this.workHistory])
  });

  private skill: FormGroup = this.formBuilder.group({
    skillName: ['', Validators.required],
    skillLevel: ['', Validators.required]
  })

  private skillCategoryForm: FormGroup = this.formBuilder.group({
    skillCategoryName: ['', Validators.required],
    skills: this.formBuilder.array([this.skill])
  });

  public skillCategoryFormGrp: FormGroup = this.formBuilder.group({
    skillCategorys: this.formBuilder.array([this.skillCategoryForm])
  });

  public summaryForm: FormGroup = this.formBuilder.group({
    summaryDesc: ['', Validators.required]
  })

  formFields: Observable<FormField<any>[]>;

  constructor(private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    service: FormfieldControlService) {
    this.formFields = service.getFormFields();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.educationForm.value);
    console.log(this.workHistoryForm.value);
    console.log(this.skillCategoryFormGrp.value);
    console.log(this.summaryForm.value);
  }

  addEducation() {
    const control = <FormArray>this.educationForm.controls['educations'];
    control.push(
      this.formBuilder.group({
        schoolName: ['', Validators.required],
        fieldOfStudy: ['', Validators.required],
        city: [''],
        country: [''],
        startDate: [''],
        endDate: [''],
        degree: [''],
        isAttended: [false]
      })
    );
  }

  addWorkExperience() {
    const control = <FormArray>this.workHistoryForm.controls['workHistorys'];
    control.push(this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      city: [''],
      country: [''],
      startDate: [''],
      endDate: [''],
      isWorkingHere: [false],
      jobDesc: ['']
    }));
  }

  addSkill(skillCategory: any) {
    const control = <FormArray>skillCategory.controls['skills'];
    control.push(this.formBuilder.group({
      skillName: ['', Validators.required],
      skillLevel: ['', Validators.required]
    }));
  }

  addSkillCategory() {
    const control = <FormArray>this.skillCategoryFormGrp.controls['skillCategorys'];
    control.push(this.formBuilder.group({
      skillCategoryName: ['', Validators.required],
      skills: this.formBuilder.array([this.formBuilder.group({
        skillName: ['', Validators.required],
        skillLevel: ['', Validators.required]
      })])
    }));
  }

  removeForm(index: number, form: FormGroup, controlName: string ) {
    const control = <FormArray>form.controls[controlName];
    control.removeAt(index);
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
    let nextIndex = keys.indexOf(active) + 1;
    let nextItem = keys[nextIndex];
    //this.active = nextItem;
    this.nav.select(nextItem);
  }


  @ViewChild("nav")
  nav;

  clickPrev(active: any) {
    let keys = Object.keys(this.tabs);
    let prevIndex = keys.indexOf(active) - 1;
    let prevItem = keys[prevIndex];
    //this.active = prevItem;
    this.nav.select(prevItem);
  }

  public keepOriginalOrder = (a, b) => a.key;

}

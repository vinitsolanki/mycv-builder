import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../dynamic-form/form-field';
import { FormfieldControlService } from '../dynamic-form/formfield-control.service';
import { of, Observable } from 'rxjs';
import { CvBuilder } from '../CvBuilder';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FormfieldControlService]
})
export class HomeComponent implements OnInit {
  active = 'personalDetail';
  public keepOriginalOrder = (a, b) => a.key;

  private cvBuilder;

  tabs = {
    personalDetail: {
      id: 'personalDetail',
      label: 'Personal Details'
    }, workHistory: {
      id: 'workHistory',
      label: 'WORK HISTORY'
    }, education: {
      id: 'education',
      label: 'EDUCATION'
    }, skills: {
      id: 'skills',
      label: 'SKILLS'
    }, summary: {
      id: 'summary',
      label: 'SUMMARY'
    }, finalize: {
      id: 'finalize',
      label: 'FINALIZE'
    }
  };

  public get firstName() {
    if (this.personalDetailForm.value.firstName)
      return this.personalDetailForm.value.firstName;
    else
      return '[Full Name]';
  }

  public get lastName() {
    if (this.personalDetailForm.value.lastName)
      return this.personalDetailForm.value.lastName;
    else
      return '';
  }

  public get profession() {
    const val = this.personalDetailForm.value.profession;
    return val ? val : '[Profession]'
  }

  public get city() {
    const val = this.personalDetailForm.value.city;
    return val ? val : '[City]'
  }

  public get state() {
    const val = this.personalDetailForm.value.state;
    return val ? val : '[State]'
  }

  public get country() {
    const val = this.personalDetailForm.value.country;
    return val ? val : '[Country]'
  }

  public get postalCode() {
    const val = this.personalDetailForm.value.postalCode;
    return val ? val : '[PostalCode]'
  }

  public get phone() {
    const val = this.personalDetailForm.value.phone;
    return val ? val : '[Phone]'
  }

  public get email() {
    const val = this.personalDetailForm.value.email;
    return val ? val : '[Email]'
  }

  public getSchoolName(formControl: FormControl): string {
    const val = formControl.value.schoolName;
    return val ? val : '[SchoolName]';
  }

  public getFieldOfStudy(formControl: FormControl): string {
    const val = formControl.value.fieldOfStudy;
    return val ? val : '[FieldOfStudy]';
  }

  public getCity(formControl: FormControl): string {
    const val = formControl.value.city;
    return val ? val : '[City]';
  }

  public getCountry(formControl: FormControl): string {
    const val = formControl.value.country;
    return val ? val : '[Country]';
  }

  public getDegree(formControl: FormControl): string {
    const val = formControl.value.degree;
    return val ? val : '[Degree]';
  }

  public getJobTitle(formControl: FormControl): string {
    const val = formControl.value.jobTitle;
    return val ? val : '[JobTitle]';
  }

  public getCompanyName(formControl: FormControl): string {
    const val = formControl.value.companyName;
    return val ? val : '[CompanyName]';
  }

  public getJobDesc(formControl: FormControl): string {
    const val = formControl.value.jobDesc;
    return val ? val : '[JobDescription]';
  }

  public getSkillCategoryName(formControl: FormControl): string {
    const val = formControl.value.skillCategoryName;
    return val ? val : '[SkillCategoryName]';
  }

  public getSkillName(formControl: FormControl): string {
    const val = formControl.value.skillName;
    return val ? val : '[Skill]';
  }

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
    this.cvBuilder = JSON.parse(localStorage.getItem('CvBuilder')) || {} as CvBuilder;
    console.log(this.cvBuilder)
    if (this.cvBuilder.personalDetail) {
      this.personalDetailForm.patchValue(this.cvBuilder.personalDetail);
    }
    if (this.cvBuilder.education) {
      this.cvBuilder.education.educations.forEach((educationData, index) => {
        if (index <= this.cvBuilder.education.educations.length - 1) {
          if (index === 0) {
            // Deleted default empty form
            this.removeForm(index, this.educationForm, 'educations');
          }

          (this.educationForm.get('educations') as FormArray).push(this.formBuilder.group({
            schoolName: [educationData.schoolName, Validators.required],
            fieldOfStudy: [educationData.fieldOfStudy, Validators.required],
            city: [educationData.city],
            country: [educationData.country],
            startDate: [educationData.startDate],
            endDate: [educationData.endDate],
            degree: [educationData.degree],
            isAttended: [educationData.isAttended]
          }));
        }
      })
    }
    if (this.cvBuilder.workExperiance) {
      this.cvBuilder.workExperiance.workHistorys.forEach((data, index) => {
        if (index <= this.cvBuilder.workExperiance.workHistorys.length - 1) {
          if (index === 0) {
            // Deleted default empty form
            this.removeForm(index, this.workHistoryForm, 'workHistorys');
          }

          (this.workHistoryForm.get('workHistorys') as FormArray).push(this.formBuilder.group({
            jobTitle: [data.jobTitle, Validators.required],
            companyName: [data.companyName, Validators.required],
            city: [data.city],
            country: [data.country],
            startDate: [data.startDate],
            endDate: [data.endDate],
            isWorkingHere: [data.isWorkingHere],
            jobDesc: [data.jobDesc]
          }));
        }
      })
    }

    if (this.cvBuilder.skillSet) {
      this.cvBuilder.skillSet.skillCategorys.forEach((skillCategory, i) => {
        if (i <= this.cvBuilder.skillSet.skillCategorys.length - 1) {
          if (i === 0) {
            // Deleted default empty form
            this.removeForm(i, this.skillCategoryFormGrp, 'skillCategorys');
          }

          let skillArray = [];
          skillCategory.skills.forEach((skill, j) => {
            console.log(skill);
            skillArray.push(this.formBuilder.group({
              skillName: [skill.skillName, Validators.required],
              skillLevel: [skill.skillLevel, Validators.required]
            }));
          });

          (this.skillCategoryFormGrp.get('skillCategorys') as FormArray).push(this.formBuilder.group({
            skillCategoryName: [skillCategory.skillCategoryName, Validators.required],
            skills: this.formBuilder.array(skillArray)
          }));

          // var t = ((this.skillCategoryFormGrp.get('skillCategorys') as FormArray).get('skills') as FormArray)
          console.log(skillCategory.skills.length)
        }
      })
    }

    if (this.cvBuilder.summary) {
      this.summaryForm.patchValue(this.cvBuilder.summary);
    }

  }

  onSubmit() {
    console.log(this.personalDetailForm.value);
    console.log(this.workHistoryForm.value);
    console.log(this.educationForm.value);
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

  removeForm(index: number, form: FormGroup, controlName: string) {
    const control = <FormArray>form.controls[controlName];
    control.removeAt(index);
  }

  clickNext(activeTab: any) {
    let keys = Object.keys(this.tabs);
    let nextIndex = keys.indexOf(activeTab) + 1;
    let nextItem = keys[nextIndex];
    //this.active = nextItem;
    this.nav.select(nextItem);

    this.saveInLocal(activeTab);
  }

  private saveInLocal(tab: any) {
    switch (tab) {
      case 'personalDetail':
        this.cvBuilder.personalDetail = this.personalDetailForm.value;
        break
      case 'education':
        this.cvBuilder.education = this.educationForm.value;
        break
      case 'workHistory':
        this.cvBuilder.workExperiance = this.workHistoryForm.value;
        break
      case 'skills':
        this.cvBuilder.skillSet = this.skillCategoryFormGrp.value;
        break
      case 'summary':
        this.cvBuilder.summary = this.summaryForm.value;
        break
    }

    localStorage.setItem("CvBuilder", JSON.stringify(this.cvBuilder));
  }

  resetForm(tab: string) {
    switch (tab) {
      case 'personalDetail':
        this.personalDetailForm.reset();
        this.cvBuilder.personalDetail = '';
        break
      case 'education':
        this.educationForm.reset();
        this.cvBuilder.education = '';
        const educationFormArr = <FormArray>this.educationForm.controls['educations'];
        educationFormArr.clear();
        this.addEducation();
        break
      case 'workHistory':
        this.workHistoryForm.reset();
        this.cvBuilder.workExperiance = '';
        const workHistoryFormArr = <FormArray>this.workHistoryForm.controls['workHistorys'];
        workHistoryFormArr.clear();
        this.addWorkExperience();
        break
      case 'skills':
        this.skillCategoryFormGrp.reset();
        this.cvBuilder.skillSet = '';
        const skillCategorysFormArr = <FormArray>this.skillCategoryFormGrp.controls['skillCategorys'];
        skillCategorysFormArr.clear();
        this.addSkillCategory();
        break
      case 'summary':
        this.summaryForm.reset();
        this.cvBuilder.summary = '';
        break
    }
    localStorage.setItem("CvBuilder", JSON.stringify(this.cvBuilder));
  }

  @ViewChild("nav")
  nav;

  clickPrev(tab: any) {
    let keys = Object.keys(this.tabs);
    let prevIndex = keys.indexOf(tab) - 1;
    let prevItem = keys[prevIndex];
    //this.tab = prevItem;
    this.nav.select(prevItem);
    this.saveInLocal(tab);
  }

  exportPDF() {
    const element = document.getElementById('resume_container') as HTMLElement;

    html2canvas(element, {}).then(canvas => {
      // console.log(canvas.width)
      // canvas.width = (600*120/100);
      // canvas.height = (863*120/100);
      // console.log(canvas.height)
      const img = canvas.toDataURL('image/jpeg ', 1.0);
      console.log(img);

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(img, 'PNG', 0, 0, 210, 297);
      pdf.save('resume.pdf');
    })
  }

}

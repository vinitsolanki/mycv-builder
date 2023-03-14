import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../dynamic-form/form-field';
import { FormfieldControlService } from '../dynamic-form/formfield-control.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [FormfieldControlService]
})
export class HomeComponent implements OnInit {
  active = 'heading';

  tabs = [{
    id: 'heading',
    label: 'HEADING'
  }, {
    id: 'education',
    label: 'EDUCATION'
  }, {
    id: 'workHistory',
    label: 'WORK HISTORY'
  }, {
    id: 'skills',
    label: 'SKILLS'
  }, {
    id: 'summary',
    label: 'SUMMARY'
  }, {
    id: 'finalize',
    label: 'FINALIZE'
  } ];

  formFields: Observable<FormField<any>[]>;
  
  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, service: FormfieldControlService) {
    this.formFields = service.getFormFields();
  }
  ngOnInit(): void {
    
  }

  onSubmit(value: any) {
    alert(value);
  }


}

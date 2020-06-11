import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestFormComponent } from './request-form.component';

/* String constants for testing form input fields and behavior. */
const sampleFirstNameValue = 'Joe';
const sampleLastNameValue = 'Smith';
const sampleValidEmailValue = 'joesmith@fakeemail.com';
const sampleInvalidEmailValue = 'joesmith';
const samplePhoneNumberValue = '555-555-5555';
const sampleDescriptionValue = 'I am requesting toys for children age 6-12.';

/* Convenience class for quickly accessing various html tags for testing. */
class FormHTMLTags {
  /* Main divs for input screen and confirmation screen. */
  readonly inputScreenDiv: any;
  readonly confirmationScreenDiv: any;
  
  /* Form input fields */
  readonly firstNameInput: any;
  readonly lastNameInput: any;
  readonly emailInput: any;
  readonly phoneNumberInput: any;
  readonly descriptionInput: any;
  
  /* Form buttons. */
  readonly submitButton: any;
  readonly editButton: any;
  
  /* Validation error messages */
  readonly firstNameInvalidMsg: any;
  readonly lastNameInvalidMsg: any;
  readonly emailInvalidMsg: any;
  readonly phoneNumberInvalidMsg: any;
  readonly descriptionInvalidMsg: any;
  
  /* Confirmation messages. */
  readonly successMsg: any;
  readonly nameConfMsg: any;
  readonly emailConfMsg: any;
  readonly phoneNumberConfMsg: any;
  readonly descriptionConfMsg: any;
  
  /* Constructor makes handles for various html tags for convenient reference
   * accross tests / ease of updating in case html tag ids are ever changed. */
  constructor(private testFixture: ComponentFixture<RequestFormComponent>) {
    this.inputScreenDiv = testFixture.nativeElement.querySelector('#inputScreen');
    this.confirmationScreenDiv = testFixture.nativeElement.querySelector('#confirmationScreen');
    
    this.firstNameInput = testFixture.nativeElement.querySelector('#firstName');
    this.lastNameInput = testFixture.nativeElement.querySelector('#lastName');
    this.emailInput = testFixture.nativeElement.querySelector('#email');
    this.phoneNumberInput = testFixture.nativeElement.querySelector('#phoneNumber');
    this.descriptionInput = testFixture.nativeElement.querySelector('#description');
    
    this.submitButton = testFixture.nativeElement.querySelector('#submit');
    this.editButton = testFixture.nativeElement.querySelector('#edit');
    
    this.firstNameInvalidMsg = testFixture.nativeElement.querySelector('#firstNameInvalidMsg');
    this.lastNameInvalidMsg = testFixture.nativeElement.querySelector('#lastNameInvalidMsg');
    this.emailInvalidMsg = testFixture.nativeElement.querySelector('#emailInvalidMsg');
    this.phoneNumberInvalidMsg = 
      testFixture.nativeElement.querySelector('#phoneNumberInvalidMsg');
    this.descriptionInvalidMsg = 
      testFixture.nativeElement.querySelector('#descriptionInvalidMsg');

    this.successMsg = testFixture.nativeElement.querySelector('#successMsg');
    this.nameConfMsg = testFixture.nativeElement.querySelector('#nameConf');
    this.emailConfMsg = testFixture.nativeElement.querySelector('#emailConf');
    this.phoneNumberConfMsg = testFixture.nativeElement.querySelector('#phoneNumberConf');
    this.descriptionConfMsg = testFixture.nativeElement.querySelector('#descriptionConf');
  }
  
  updateInputField(inputField: any, newValue: string): void {
    /* Only allow actual input fields to be modified; simply print warning message
     * to console and return if user calls this function on any non-input field. */
    if (
      inputField !== this.firstNameInput &&
      inputField !== this.lastNameInput &&
      inputField !== this.emailInput &&
      inputField !== this.phoneNumberInput &&
      inputField !== this.descriptionInput
    ) {
      console.error('FormHTMLTags.updateInputField(): Invalid input field passed.');
      return;
    }
    
    inputField.value = newValue;
    inputField.dispatchEvent(new Event('input'));
  }
}

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let formTags: FormHTMLTags;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFormComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;
    formTags = new FormHTMLTags(fixture);
    fixture.detectChanges();
  });

  it('should create the request form', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have component.submitted set to false upon form creation', async(() => {
    fixture.whenStable().then(() => {
      expect(component.submitted).toBe(false);
    });
  }));
  
  it('should have model.form_type set to \'Request\' upon form creation', async(() => {
    fixture.whenStable().then(() => {
      expect(component.model.form_type).toBe('Request');
    });
  }));
  
  it('should display the inputScreenDiv upon form creation', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.inputScreenDiv.hidden).toBe(false);
    });
  }));
  
  it('should hide the confirmationScreenDiv upon form creation', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.confirmationScreenDiv.hidden).toBe(true);
    });
  }));
  
  /* Test firstName view-to-model. */
  it('should update firstName in the model upon updating it in the input field',
    async(() => {
      // Wait for form input values to be initialized as empty from model.
      fixture.whenStable().then(() => {
        // Set value of 'firstName' field to 'Joe.'
        formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
        
        // Wait for updating of input field value and model to complete,
        // and then assert the update went through correctly.
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.firstName).toBe(sampleFirstNameValue);
        });
      });
    }
  ));
  
  /* Test firstName model-to-view. */
  it('should update firstName in the input field upon updating it in the model',
    async(() => {
      // Update firstName in the model.
      component.model.firstName = sampleFirstNameValue;
      
      // Wait for the change to go through,
      // and then assert that the value in the form field matches.
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.firstNameInput.value).toBe(sampleFirstNameValue);
      });
    }
  ));
  
  it('should leave submit button disabled if firstName field is empty', async(() => {
    fixture.whenStable().then(() => {        
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));
  
  it('should hide firstNameInvalidMsg before user edits firstName field', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.firstNameInvalidMsg.hidden).toBe(true);
    });
  }));
  
  it('should display firstNameInvalidMsg if firstName is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.firstNameInput, '');
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.firstNameInvalidMsg.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should hide firstNameInvalidMsg if valid firstName is entered', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.firstNameInvalidMsg.hidden).toBe(true);
      });
    });
  }));
  
  it('should update lastName in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.lastName).toBe(sampleLastNameValue);
      });
    });
  }));
  
  it('should update lastName in the input field upon updating it in the model', async(() => {
    component.model.lastName = sampleLastNameValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(formTags.lastNameInput.value).toBe(sampleLastNameValue);
    });
  }));
  
  it('should leave submit button disabled if lastName field is empty', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));

  it('should hide lastNameInvalidMsg before user edits lastName field', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.lastNameInvalidMsg.hidden).toBe(true);
    });
  }));
  
  it('should display lastNameInvalidMsg if lastName is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.lastNameInput, '');
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.lastNameInvalidMsg.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should hide lastNameInvalidMsg if valid lastName is entered', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.lastNameInvalidMsg.hidden).toBe(true);
      });
    });
  }));
  
  it('should update email in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.email).toBe(sampleValidEmailValue);
      });
    });
  }));
  
  it('should update email in the input field upon updating it in the model', async(() => {
    component.model.email = sampleValidEmailValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(formTags.emailInput.value).toBe(sampleValidEmailValue);
    });
  }));
  
  it('should leave submit button disabled if email field is empty', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));
  
  it('should leave submit button disabled if email is in invalid format', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));
  
  it('should hide emailInvalidMsg before user edits email field', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.emailInvalidMsg.hidden).toBe(true);
    });
  }));
  
  it('should display emailInvalidMsg if email is entered then cleared', async(() => {
    fixture.whenStable().then(() => {             
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.emailInput, '');
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.emailInvalidMsg.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should display emailInvalidMsg if invalid email is entered', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.emailInvalidMsg.hidden).toBe(false);
      });
    });
  }));
  
  it('should hide emailInvalidMsg if valid email is entered', async(() => {
    fixture.whenStable().then(() => {            
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.emailInvalidMsg.hidden).toBe(true);
      });
    });
  }));
  
  it('should update phoneNumber in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.phoneNumber).toBe(samplePhoneNumberValue);
      });
    });
  }));
  
  it('should update phoneNumber in the input field upon updating it in the model', async(() => {
    component.model.phoneNumber = samplePhoneNumberValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(formTags.phoneNumberInput.value).toBe(samplePhoneNumberValue);
    });
  }));
  
  it('should leave submit button disabled if phoneNumber field is empty', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));

  it('should hide phoneNumberInvalidMsg before user edits phoneNumber field', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.phoneNumberInvalidMsg.hidden).toBe(true);
    });
  }));
  
  it('should display phoneNumberInvalidMsg if phoneNumber is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.phoneNumberInput, '');
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.phoneNumberInvalidMsg.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should hide phoneNumberInvalidMsg if valid phoneNumber is entered', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.phoneNumberInvalidMsg.hidden).toBe(true);
      });
    });
  }));
  
  it('should update description in the model upon updating it in the textarea field', 
    async(() => {
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.description).toBe(sampleDescriptionValue);
        });
      });
    }
  ));
  
  it('should update description in the textarea field upon updating it in the model', 
    async(() => {
      component.model.description = sampleDescriptionValue;
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.descriptionInput.value).toBe(sampleDescriptionValue);
      });
    }
  ));
  
  it('should leave submit button disabled if description field is empty', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(true);
      });
    });
  }));

  it('should hide descriptionInvalidMsg before user edits description field', async(() => {
    fixture.whenStable().then(() => {
      expect(formTags.descriptionInvalidMsg.hidden).toBe(true);
    });
  }));
  
  it('should display descriptionInvalidMsg if description is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.updateInputField(formTags.descriptionInput, '');
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.descriptionInvalidMsg.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should hide descriptionInvalidMsg if valid description is entered', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.descriptionInvalidMsg.hidden).toBe(true);
      });
    });
  }));
  
  it('should not submit upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.submitted).toBe(false);
        });
      });
    });
  }));
  
  it('should continue to display inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.inputScreenDiv.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should continue to hide confirmationScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.confirmationScreenDiv.hidden).toBe(true);
        });
      });
    });
  }));
  
  it('should still display user-entered value for firstNameInput in inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.firstNameInput.value).toBe(sampleFirstNameValue);
        });
      });
    });
  }));
  
  it('should still contain user-entered value for firstNameInput in model upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.firstName).toBe(sampleFirstNameValue);
        });
      });
    });
  }));
  
  it('should still display user-entered value for lastNameInput in inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.lastNameInput.value).toBe(sampleLastNameValue);
        });
      });
    });
  }));
  
  it('should still contain user-entered value for lastNameInput in model upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.lastName).toBe(sampleLastNameValue);
        });
      });
    });
  }));
  
  it('should still display user-entered value for emailInput in inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.emailInput.value).toBe(sampleInvalidEmailValue);
        });
      });
    });
  }));
  
  it('should still contain user-entered value for emailInput in model upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.email).toBe(sampleInvalidEmailValue);
        });
      });
    });
  }));
  
  it('should still display user-entered value for phoneNumberInput in inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.phoneNumberInput.value).toBe(samplePhoneNumberValue);
        });
      });
    });
  }));
  
  it('should still contain user-entered value for phoneNumberInput in model upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.phoneNumber).toBe(samplePhoneNumberValue);
        });
      });
    });
  }));
  
  it('should still display user-entered value for descriptionInput in inputScreenDiv upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.descriptionInput.value).toBe(sampleDescriptionValue);
        });
      });
    });
  }));
  
  it('should still contain user-entered value for descriptionInput in model upon submit button click if any field is invalid', async(() => {
    fixture.whenStable().then(() => {
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleInvalidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.description).toBe(sampleDescriptionValue);
        });
      });
    });
  }));
  
  it('should enable submit button if all fields contain valid values', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(formTags.submitButton.disabled).toBe(false);
      });
    });
  }));

  it('should submit upon submit button click if all fields contain valid values', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.submitted).toBe(true);
        });
      });
    });
  }));
  
  it('should hide inputScreenDiv upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.inputScreenDiv.hidden).toBe(true);
        });
      });
    });
  }));
  
  it('should display confirmationScreenDiv upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.confirmationScreenDiv.hidden).toBe(false);
        });
      });
    });
  }));
  
  it('should display user-entered firstName in successMsg upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.successMsg.innerHTML.includes(sampleFirstNameValue)).toBe(true);
        });
      });
    });
  }));
  
  it('should display user-entered firstName in nameConf upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.nameConfMsg.innerHTML.includes(sampleFirstNameValue)).toBe(true);
        });
      });
    });
  }));
  
  it('should still contain user-entered firstName in the model upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.firstName).toBe(sampleFirstNameValue);
        });
      });
    });
  }));
  
  it('should display user-entered lastName in nameConf upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.nameConfMsg.innerHTML.includes(sampleLastNameValue)).toBe(true);
        });
      });
    });
  }));
  
  it('should still contain user-entered lastName in the model upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.lastName).toBe(sampleLastNameValue);
        });
      });
    });
  }));
  
  it('should display user-entered email in emailConf upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.emailConfMsg.innerHTML.includes(sampleValidEmailValue)).toBe(true);
        });
      });
    });
  }));
  
  it('should still contain user-entered email in the model upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.email).toBe(sampleValidEmailValue);
        });
      });
    });
  }));
  
  it('should display user-entered phoneNumber in phoneNumberConf upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.phoneNumberConfMsg.innerHTML.includes(samplePhoneNumberValue))
            .toBe(true);
        });
      });
    });
  }));
  
  it('should still contain user-entered phoneNumber in the model upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.phoneNumber).toBe(samplePhoneNumberValue);
        });
      });
    });
  }));
  
  it('should display user-entered description in descriptionConf upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(formTags.descriptionConfMsg.innerHTML.includes(sampleDescriptionValue))
            .toBe(true);
        });
      });
    });
  }));
  
  it('should still contain user-entered description in the model upon successful form submission', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.description).toBe(sampleDescriptionValue);
        });
      });
    });
  }));
  
  it('should reset component.submitted to false upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.submitted).toBe(false);
          });
        });
      });
    });
  }));
  
  it('should show inputScreenDiv upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.inputScreenDiv.hidden).toBe(false);
          });
        });
      });
    });
  }));
  
  it('should hide confirmationScreenDiv upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.confirmationScreenDiv.hidden).toBe(true);
          });
        });
      });
    });
  }));
  
  it('should display user-entered firstName in firstNameInput field upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.firstNameInput.value).toBe(sampleFirstNameValue);
          });
        });
      });
    });
  }));
  
  it('should contain user-entered firstName in model upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.model.firstName).toBe(sampleFirstNameValue);
          });
        });
      });
    });
  }));
  
  it('should display user-entered lastName in lastNameInput field upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.lastNameInput.value).toBe(sampleLastNameValue);
          });
        });
      });
    });
  }));
  
  it('should contain user-entered lastName in model upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.model.lastName).toBe(sampleLastNameValue);
          });
        });
      });
    });
  }));
  
  it('should display user-entered email in emailInput field upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.emailInput.value).toBe(sampleValidEmailValue);
          });
        });
      });
    });
  }));
  
  it('should contain user-entered email in model upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.model.email).toBe(sampleValidEmailValue);
          });
        });
      });
    });
  }));
  
  it('should display user-entered phoneNumber in phoneNumberInput field upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.phoneNumberInput.value).toBe(samplePhoneNumberValue);
          });
        });
      });
    });
  }));
  
  it('should contain user-entered phoneNumber in model upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.model.phoneNumber).toBe(samplePhoneNumberValue);
          });
        });
      });
    });
  }));
  
  it('should display user-entered description in descriptionInput field upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(formTags.descriptionInput.value).toBe(sampleDescriptionValue);
          });
        });
      });
    });
  }));
  
  it('should contain user-entered description in model upon editButton click', async(() => {
    fixture.whenStable().then(() => {      
      formTags.updateInputField(formTags.firstNameInput, sampleFirstNameValue);
      formTags.updateInputField(formTags.lastNameInput, sampleLastNameValue);
      formTags.updateInputField(formTags.emailInput, sampleValidEmailValue);
      formTags.updateInputField(formTags.phoneNumberInput, samplePhoneNumberValue);
      formTags.updateInputField(formTags.descriptionInput, sampleDescriptionValue);
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        formTags.submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          formTags.editButton.click();
          
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.model.description).toBe(sampleDescriptionValue);
          });
        });
      });
    });
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestFormComponent } from './request-form.component';

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create the request form', () => {
    expect(component).toBeTruthy();
  });
  
  /* Test firstName view-to-model. */
  it('should update firstName in the model upon updating it in the input field',
    async(() => {
      // Wait for form input values to be initialized as empty from model.
      fixture.whenStable().then(() => {
        // Set value of 'firstName' field to 'Joe.'
        const newFirstNameValue = 'Joe';
        const firstNameInput = fixture.nativeElement.querySelector('#firstName');
        firstNameInput.value = 'Joe';
        firstNameInput.dispatchEvent(new Event('input'));
        
        // Wait for updating of input field value and model to complete,
        // and then assert the update went through correctly.
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.firstName).toBe(newFirstNameValue);
        });
      });
    }
  ));
  
  /* Test firstName model-to-view. */
  it('should update firstName in the input field upon updating it in the model',
    async(() => {
      // Update firstName in the model.
      const newFirstNameValue = 'Joe';
      component.model.firstName = newFirstNameValue;
      
      // Wait for the change to go through,
      // and then assert that the value in the form field matches.
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const firstNameInput = fixture.nativeElement.querySelector('#firstName');
        expect(firstNameInput.value).toBe(newFirstNameValue);
      });
    }
  ));
  
  it('should leave submit button disabled if firstName field is empty', async(() => {
    fixture.whenStable().then(() => {      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));
  
  it('should hide firstNameInvalidMsg before user edits firstName field', async(() => {
    fixture.whenStable().then(() => {
      const firstNameInvalidMsg = fixture.nativeElement.querySelector('#firstNameInvalidMsg');
      expect(firstNameInvalidMsg.hidden).toBeTruthy();
    });
  }));
  
  it('should display firstNameInvalidMsg if firstName is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstNameInput.value = '';
        firstNameInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const firstNameInvalidMsg = fixture.nativeElement.querySelector('#firstNameInvalidMsg');
          expect(firstNameInvalidMsg.hidden).toBeFalsy();
        });
      });
    });
  }));
  
  it('should hide firstNameInvalidMsg if valid firstName is entered', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const firstNameInvalidMsg = fixture.nativeElement.querySelector('#firstNameInvalidMsg');
        expect(firstNameInvalidMsg.hidden).toBeTruthy();
      });
    });
  }));
  
  it('should update lastName in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.lastName).toBe(newLastNameValue);
      });
    });
  }));
  
  it('should update lastName in the input field upon updating it in the model', async(() => {
    const newLastNameValue = 'Smith';
    component.model.lastName = newLastNameValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const lastNameField = fixture.nativeElement.querySelector('#lastName');
      expect(lastNameField.value).toBe(newLastNameValue);
    });
  }));
  
  it('should leave submit button disabled if lastName field is empty', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));

  it('should hide lastNameInvalidMsg before user edits lastName field', async(() => {
    fixture.whenStable().then(() => {
      const lastNameInvalidMsg = fixture.nativeElement.querySelector('#lastNameInvalidMsg');
      expect(lastNameInvalidMsg.hidden).toBeTruthy();
    });
  }));
  
  it('should display lastNameInvalidMsg if lastName is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        lastNameInput.value = '';
        lastNameInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const lastNameInvalidMsg = fixture.nativeElement.querySelector('#lastNameInvalidMsg');
          expect(lastNameInvalidMsg.hidden).toBeFalsy();
        });
      });
    });
  }));
  
  it('should hide lastNameInvalidMsg if valid lastName is entered', async(() => {
    fixture.whenStable().then(() => {      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const lastNameInvalidMsg = fixture.nativeElement.querySelector('#lastNameInvalidMsg');
        expect(lastNameInvalidMsg.hidden).toBeTruthy();
      });
    });
  }));
  
  it('should update email in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.email).toBe(newEmailValue);
      });
    });
  }));
  
  it('should update email in the input field upon updating it in the model', async(() => {
    const newEmailValue = 'joesmith@bogusemail.com';
    component.model.email = newEmailValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailInput = fixture.nativeElement.querySelector('#email');
      expect(emailInput.value).toBe(newEmailValue)
    });
  }));
  
  it('should leave submit button disabled if email field is empty', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));
  
  it('should leave submit button disabled if email is in invalid format', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));
  
  it('should hide emailInvalidMsg before user edits email field', async(() => {
    fixture.whenStable().then(() => {
      const emailInvalidMsg = fixture.nativeElement.querySelector('#emailInvalidMsg');
      expect(emailInvalidMsg.hidden).toBeTruthy();
    });
  }));
  
  it('should display emailInvalidMsg if email is entered then cleared', async(() => {
    fixture.whenStable().then(() => {             
      const newEmailValue = 'joesmith@fakeemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        emailInput.value = '';
        emailInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const emailInvalidMsg = fixture.nativeElement.querySelector('#emailInvalidMsg');
          expect(emailInvalidMsg.hidden).toBeFalsy();
        });
      });
    });
  }));
  
  it('should display emailInvalidMsg if invalid email is entered', async(() => {
    fixture.whenStable().then(() => {      
      const newEmailValue = 'joesmith';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const emailInvalidMsg = fixture.nativeElement.querySelector('#emailInvalidMsg');
        expect(emailInvalidMsg.hidden).toBeFalsy();
      });
    });
  }));
  
  it('should hide emailInvalidMsg if valid email is entered', async(() => {
    fixture.whenStable().then(() => {            
      const newEmailValue = 'joesmith@fakeemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const emailInvalidMsg = fixture.nativeElement.querySelector('#emailInvalidMsg');
        expect(emailInvalidMsg.hidden).toBeTruthy();
      });
    });
  }));
  
  it('should update phoneNumber in the model upon updating it in the input field', async(() => {
    fixture.whenStable().then(() => {
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.model.phoneNumber).toBe(newPhoneNumberValue);
      });
    });
  }));
  
  it('should update phoneNumber in the input field upon updating it in the model', async(() => {
    const newPhoneNumberValue = '555-555-5555';
    component.model.phoneNumber = newPhoneNumberValue;
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      expect(phoneNumberInput.value).toBe(newPhoneNumberValue);
    });
  }));
  
  it('should leave submit button disabled if phoneNumber field is empty', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));

  it('should hide phoneNumberInvalidMsg before user edits phoneNumber field', async(() => {
    fixture.whenStable().then(() => {
      const phoneNumberInvalidMsg = fixture.nativeElement.querySelector('#phoneNumberInvalidMsg');
      expect(phoneNumberInvalidMsg.hidden).toBeTruthy();
    });
  }));
  
  it('should display phoneNumberInvalidMsg if phoneNumber is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        phoneNumberInput.value = '';
        phoneNumberInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const phoneNumberInvalidMsg = fixture.nativeElement.querySelector('input');
          expect(phoneNumberInvalidMsg.hidden).toBeFalsy();
        });
      });
    });
  }));
  
  it('should hide phoneNumberInvalidMsg if valid phoneNumber is entered', async(() => {
    fixture.whenStable().then(() => {      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const phoneNumberInvalidMsg = 
              fixture.nativeElement.querySelector('#phoneNumberInvalidMsg');
        expect(phoneNumberInvalidMsg.hidden).toBeTruthy();
      });
    });
  }));
  
  it('should update description in the model upon updating it in the textarea field', 
    async(() => {
      fixture.whenStable().then(() => {
        const newDescriptionValue = 'I am requesting toys for children age 6-12.';
        const descriptionTextarea = fixture.nativeElement.querySelector('#description');
        descriptionTextarea.value = newDescriptionValue;
        descriptionTextarea.dispatchEvent(new Event('input'));
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.model.description).toBe(newDescriptionValue);
        });
      });
    }
  ));
  
  it('should update description in the textarea field upon updating it in the model', 
    async(() => {
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      component.model.description = newDescriptionValue;
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const descriptionTextarea = fixture.nativeElement.querySelector('#description');
        expect(descriptionTextarea.value).toBe(newDescriptionValue);
      });
    }
  ));
  
  it('should leave submit button disabled if description field is empty', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeTruthy();
      });
    });
  }));

  it('should hide descriptionInvalidMsg before user edits description field', async(() => {
    fixture.whenStable().then(() => {
      const descriptionInvalidMsg = fixture.nativeElement.querySelector('#descriptionInvalidMsg');
      expect(descriptionInvalidMsg.hidden).toBeTruthy();
    });
  }));
  
  it('should display descriptionInvalidMsg if description is entered then cleared', async(() => {
    fixture.whenStable().then(() => {      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        descriptionInput.value = '';
        descriptionInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const descriptionInvalidMsg = 
                fixture.nativeElement.querySelector('#descriptionInvalidMsg');
          expect(descriptionInvalidMsg.hidden).toBeFalsy();
        });
      });
    });
  }));
  
  it('should hide descriptionInvalidMsg if valid description is entered', async(() => {
    fixture.whenStable().then(() => {      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const descriptionInvalidMsg = 
              fixture.nativeElement.querySelector('#descriptionInvalidMsg');
        expect(descriptionInvalidMsg.hidden).toBeTruthy();
      });
    });
  }));
  
  it('should enable submit button if all fields contain valid values', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        expect(submitButton.disabled).toBeFalsy();
      });
    });
  }));
  
  it('should submit upon submit button click if all fields contain valid values', async(() => {
    fixture.whenStable().then(() => {      
      const newFirstNameValue = 'Joe';
      const firstNameInput = fixture.nativeElement.querySelector('#firstName');
      firstNameInput.value = newFirstNameValue;
      firstNameInput.dispatchEvent(new Event('input'));
      
      const newLastNameValue = 'Smith';
      const lastNameInput = fixture.nativeElement.querySelector('#lastName');
      lastNameInput.value = newLastNameValue;
      lastNameInput.dispatchEvent(new Event('input'));
      
      const newEmailValue = 'joesmith@bogusemail.com';
      const emailInput = fixture.nativeElement.querySelector('#email');
      emailInput.value = newEmailValue;
      emailInput.dispatchEvent(new Event('input'));
      
      const newPhoneNumberValue = '555-555-5555';
      const phoneNumberInput = fixture.nativeElement.querySelector('#phoneNumber');
      phoneNumberInput.value = newPhoneNumberValue;
      phoneNumberInput.dispatchEvent(new Event('input'));
      
      const newDescriptionValue = 'I am requesting toys for children age 6-12.';
      const descriptionInput = fixture.nativeElement.querySelector('#description');
      descriptionInput.value = newDescriptionValue;
      descriptionInput.dispatchEvent(new Event('input'));
      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const submitButton = fixture.nativeElement.querySelector('button.btn-success');
        submitButton.click();
        
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.submitted).toBe(true);
        });
      });
    });
  }));
});

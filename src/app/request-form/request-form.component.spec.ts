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
  it('should update the firstName in the model upon updating it in the input field',
    async(() => {
      // Wait for form input values to be initialized as empty from model.
      fixture.detectChanges();
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
  it('should update the firstName in the input field upon updating it in the model',
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
});

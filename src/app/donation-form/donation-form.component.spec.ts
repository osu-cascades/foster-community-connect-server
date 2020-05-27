import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DonationFormComponent } from './donation-form.component';

describe('DonationFormComponent', () => {
  let component: DonationFormComponent;
  let fixture: ComponentFixture<DonationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationFormComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

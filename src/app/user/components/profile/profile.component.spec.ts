import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProfileComponent } from './profile.component';

describe('User > Components > Profile', () => {
  const TITLE = 'test';
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let localStorage: LocalStorageService;
  const mockAuthStore = jasmine.createSpyObj('user', ['dispatch'], {
    ath$: of([]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(Store, { useValue: mockAuthStore });
    localStorage = TestBed.inject(LocalStorageService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeTruthy();
  });
});

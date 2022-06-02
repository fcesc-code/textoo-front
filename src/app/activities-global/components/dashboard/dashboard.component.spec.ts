import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesGlobalService } from './../../services/activities-global.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: ActivitiesGlobalService;
  let sharedService: SharedService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [ActivitiesGlobalService, AuthService, SharedService],
    })
      .compileComponents()
      .then();
    service = TestBed.inject(ActivitiesGlobalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

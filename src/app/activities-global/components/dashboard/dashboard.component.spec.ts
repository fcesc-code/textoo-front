import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesGlobalService } from './../../services/activities-global.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardComponent } from './dashboard.component';
import { DebugElement } from '@angular/core';
import {
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
} from 'mockdata/activity.mock';
import { GetLanguagePipe } from '../../pipes/get-language-name.pipe';
import { of } from 'rxjs';
describe('activities-global > components > dashboard > dashboardComponent', () => {
  const TITLE = 'test';
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let service: ActivitiesGlobalService;
  let sharedService: SharedService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const MOCK_ACTIVITIES = [
    MOCK_ACTIVITY_BEST_OPTION,
    MOCK_ACTIVITY_SELECT_TEXT,
    MOCK_ACTIVITY_TRANSFORM_ASPECT,
  ];
  const mockActivitiesGlobalService = {
    getAllActivities: () => of(MOCK_ACTIVITIES),
    getAllActivitiesByUserId: (id: string) =>
      of(MOCK_ACTIVITIES.filter((activity) => activity.author === id)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardComponent, GetLanguagePipe],
      providers: [
        {
          provide: ActivitiesGlobalService,
          useValue: mockActivitiesGlobalService,
        },
        AuthService,
        SharedService,
      ],
    }).compileComponents();
    service = TestBed.inject(ActivitiesGlobalService);
    authService = TestBed.inject(AuthService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeDefined();
  });

  it(`${TITLE} 2 > method loadActivities populates the component with data`, () => {
    component.loadActivities();
    fixture.isStable();
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();
    expect(component.filteredActivities.length).not.toEqual(0);
  });

  it(`${TITLE} 3 > without filter, filteredActivities and activities$ have the same lenght and filtersApplied is false`, () => {
    component.activities$ = MOCK_ACTIVITIES;
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();

    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(true);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 4 > method filterByKeyword filters data`, () => {
    component.activities$ = MOCK_ACTIVITIES;
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();

    component.filterByKeyword('paradoxes');
    fixture.detectChanges();
    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED < UNFILTERED).toBe(true);
    expect(FILTERED).toEqual(1);
    expect(component.filtersApplied()).toBe(true);
  });

  it(`${TITLE} 5 > method filterByType filters data`, () => {
    component.activities$ = MOCK_ACTIVITIES;
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();

    component.filterByType('best_option');
    fixture.detectChanges();
    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED < UNFILTERED).toBe(true);
    expect(FILTERED).toEqual(1);
    expect(component.filtersApplied()).toBe(true);
  });

  it(`${TITLE} 6 > method filterByLanguage filters data`, () => {
    component.activities$ = MOCK_ACTIVITIES;
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();

    component.filterByLanguage('ca');
    fixture.detectChanges();
    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(true);
    expect(FILTERED).toEqual(3);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 7 > method removeFilters should remove filters`, () => {
    component.activities$ = MOCK_ACTIVITIES;
    component.filteredActivities = MOCK_ACTIVITIES;
    fixture.detectChanges();

    component.filterByType('select_text');
    fixture.detectChanges();
    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(false);
    expect(component.filtersApplied()).toBe(true);

    component.removeFilters();
    fixture.detectChanges();

    const FILTERED2 = component.filteredActivities.length;
    const UNFILTERED2 = component.activities$.length;
    expect(FILTERED2).toEqual(UNFILTERED2);
    expect(FILTERED2 === UNFILTERED2).toBe(true);
    expect(FILTERED2).toEqual(3);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 8 > method loadActivities return activities`, () => {
    authService.setUser({
      userId: 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867',
      accessToken: 'some weird user token',
    });
    component.loadActivities();
    fixture.detectChanges();

    const FILTERED = component.filteredActivities.length;
    const UNFILTERED = component.activities$.length;
    expect(FILTERED).toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(true);
    expect(component.filtersApplied()).toBe(false);
  });
});

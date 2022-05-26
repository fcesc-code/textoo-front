import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EditBestOptionComponent } from './edit-best-option.component';
import { ActivitiesService } from 'src/app/activity/services/activities.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { MOCK_ACTIVITY_BEST_OPTION } from 'mockdata/activity.mock';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  ParamMap,
  Params,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityBestOptionModule } from '../../activity-best-option.module';

class ActivatedRouteStub implements Partial<ActivatedRoute> {
  private _paramMap!: ParamMap;
  private subject = new ReplaySubject<ParamMap>();

  paramMap = this.subject.asObservable();
  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this._paramMap,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params?: Params) {
    const paramMap = convertToParamMap(params as Params);
    this._paramMap = paramMap;
    this.subject.next(paramMap);
  }
}
describe('EditBestOptionComponent', () => {
  let component: EditBestOptionComponent;
  let fixture: ComponentFixture<EditBestOptionComponent>;
  class TemporalComponentForRoutes {}
  let activitiesService: ActivitiesService;
  let debugElement: DebugElement;

  const TEST = 'test';
  const MOCK_ACTIVITY_ID = MOCK_ACTIVITY_BEST_OPTION.id;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    routeStub.setParamMap({ id: MOCK_ACTIVITY_ID });
    await TestBed.configureTestingModule({
      imports: [
        ActivityBestOptionModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: `play/best-option/${MOCK_ACTIVITY_ID}`,
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      providers: [
        ActivitiesService,
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [EditBestOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    activitiesService = TestBed.inject(ActivitiesService);
    fixture = TestBed.createComponent(EditBestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it(`${TEST} 1 > should create`, () => {
    expect(component).toBeTruthy();
  });
});

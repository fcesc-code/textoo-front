import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PlayBestOptionComponent } from './play-best-option.component';
import { ActivitiesSharedService } from 'src/app/activities-shared/services/activities-shared.service';
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
import { By } from '@angular/platform-browser';

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
describe('PlayBestOptionComponent', () => {
  let component: PlayBestOptionComponent;
  let fixture: ComponentFixture<PlayBestOptionComponent>;
  class TemporalComponentForRoutes {}
  let activitiesSharedService: ActivitiesSharedService;
  let debugElement: DebugElement;

  const TITLE = 'Play best-option Component';
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
        ActivitiesSharedService,
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [PlayBestOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    activitiesSharedService = TestBed.inject(ActivitiesSharedService);
    fixture = TestBed.createComponent(PlayBestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it(`${TITLE} 1 > should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 > should set completed to true if validate button is triggered`, () => {
    const validateButton = debugElement.query(By.css('#showResults'));
    validateButton.triggerEventHandler('click', null);
    expect(component.completed).toBeTrue();
  });

  it(`${TITLE} 3 > should set completed to false if replay button is triggered`, () => {
    component.completed = true;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    const replayButton = debugElement.query(By.css('#replayActivity'));
    replayButton.triggerEventHandler('click', null);
    expect(component.completed).toBeFalse();
  });

  xit(`${TITLE} 4 > should get one incorrect answer if an incorrect answer is set`, () => {
    const question = debugElement.query(By.css('#SEL-3'));
    question.nativeElement.click();
    fixture.detectChanges();
    question.nativeElement.children[1].click();
    fixture.detectChanges();
    // console.log('VALUE?', question.nativeElement.children[1].attributes.select.value);
    const validateButton = debugElement.query(By.css('#showResults'));
    validateButton.triggerEventHandler('click', null);
    const ANSWERS = component.answers.insights;
    // console.log('ANSWERS', ANSWERS);
    const INCORRECT_ANSWERS = ANSWERS.insights.incorrect.length;
    const EXPECTED_INCORRECT_ANSWERS = 1;
    expect(INCORRECT_ANSWERS).toEqual(EXPECTED_INCORRECT_ANSWERS);
  });
});

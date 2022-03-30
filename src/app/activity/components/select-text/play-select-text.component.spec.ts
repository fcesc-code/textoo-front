import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PlaySelectTextComponent } from './play-select-text.component';
import { ActivitiesService } from '../../services/activities.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
} from 'mockdata/activity.mock';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  ParamMap,
  Params,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityModule } from '../../activity.module';
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
describe('PlaySelectTextComponent', () => {
  let component: PlaySelectTextComponent;
  let fixture: ComponentFixture<PlaySelectTextComponent>;
  class TemporalComponentForRoutes {}
  let activitiesService: ActivitiesService;
  let debugElement: DebugElement;

  const TITLE = 'Play select-text Component';
  const MOCK_ACTIVITY_ID = MOCK_ACTIVITY_SELECT_TEXT.id;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    routeStub.setParamMap({ id: MOCK_ACTIVITY_ID });
    await TestBed.configureTestingModule({
      imports: [
        ActivityModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: `play/selected-text/${MOCK_ACTIVITY_ID}`,
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      providers: [
        ActivitiesService,
        { provide: ActivatedRoute, useValue: routeStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [PlaySelectTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    activitiesService = TestBed.inject(ActivitiesService);
    fixture = TestBed.createComponent(PlaySelectTextComponent);
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

  xit(`${TITLE} 4 > should select some text and get the selected text`, () => {
    const question = debugElement.query(By.css('#activityMainText'));
    const { x, y } = question.nativeElement.getBoundingClientRect();
    // console.log('COORDINATES', x, y);
    question.triggerEventHandler('mousedown', { pageX: x, pageY: y });
    fixture.detectChanges();
    question.triggerEventHandler('mouseup', { pageX: x + 250, pageY: y });
    fixture.detectChanges();
    console.log('component.selectedText', component.selectedText);
    // const validateButton = debugElement.query(By.css('#showResults'));
    // validateButton.triggerEventHandler('click', null);
    // const ANSWERS = component.answers.insights;
    // // console.log('ANSWERS', ANSWERS);
    // const INCORRECT_ANSWERS = ANSWERS.insights.incorrect.length;
    // const EXPECTED_INCORRECT_ANSWERS = 1;
    // expect(INCORRECT_ANSWERS).toEqual(EXPECTED_INCORRECT_ANSWERS);
  });
});

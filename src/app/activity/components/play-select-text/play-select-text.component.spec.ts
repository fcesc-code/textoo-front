import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlaySelectTextComponent } from './play-select-text.component';
import { ActivitiesService } from '../../services/activities.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlayComponent', () => {
  let component: PlaySelectTextComponent;
  let fixture: ComponentFixture<PlaySelectTextComponent>;
  class TemporalComponentForRoutes {}
  let activitiesService: ActivitiesService;

  const TESTED = 'PlayActivityComponent';
  const MOCK_ACTIVITY = '9e26ab71-a2d0-43b5-b0fa-38910b7ebe1b';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaySelectTextComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: `play/${MOCK_ACTIVITY}`,
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      providers: [ActivitiesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    activitiesService = TestBed.inject(ActivitiesService);
    fixture = TestBed.createComponent(PlaySelectTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit(`${TESTED} > should create`, () => {
    component.ngOnInit();
    // hi ha un problema amb el mètode onDestroy, al text no carrega la subscripció i al destroy la crida sobre undefined.
    // més info: https://angular.io/guide/testing-components-scenarios
    expect(component).toBeTruthy();
  });

  xit(`${TESTED} > should load post if a postId is provided`, () => {
    // const activitiesService =
    //   fixture.debugElement.injector.get(ActivitiesService);
    const spy = spyOn(activitiesService, 'getActivity').and.callThrough();
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(MOCK_ACTIVITY);
  });
});

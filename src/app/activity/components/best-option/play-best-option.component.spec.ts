import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayBestOptionComponent } from './play-best-option.component';
import { ActivitiesService } from '../../services/activities.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MOCK_ACTIVITY_BEST_OPTION } from 'mockdata/activity.mock';

describe('PlayBestOptionComponent', () => {
  let component: PlayBestOptionComponent;
  let fixture: ComponentFixture<PlayBestOptionComponent>;
  class TemporalComponentForRoutes {}
  let activitiesService: ActivitiesService;

  const TITLE = 'PlayActivityComponent';
  const MOCK_ACTIVITY_ID = MOCK_ACTIVITY_BEST_OPTION.id;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayBestOptionComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: `play/best-option/${MOCK_ACTIVITY_ID}`,
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
    fixture = TestBed.createComponent(PlayBestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should create`, () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayBestOptionComponent } from './play-best-option.component';
import { ActivitiesService } from '../../services/activities.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlayBestOptionComponent', () => {
  let component: PlayBestOptionComponent;
  let fixture: ComponentFixture<PlayBestOptionComponent>;
  class TemporalComponentForRoutes {}
  let activitiesService: ActivitiesService;

  const TESTED = 'PlayActivityComponent';
  const MOCK_ACTIVITY = '120460f9-5a23-4050-95a9-4f9d1de87672';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayBestOptionComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: `play/best-option/${MOCK_ACTIVITY}`,
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

  xit(`${TESTED}:1 > should create`, () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});

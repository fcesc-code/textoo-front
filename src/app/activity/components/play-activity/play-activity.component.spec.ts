import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayActivityComponent } from './play-activity.component';

describe('PlayComponent', () => {
  let component: PlayActivityComponent;
  let fixture: ComponentFixture<PlayActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

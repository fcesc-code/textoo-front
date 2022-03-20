import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBestOptionComponent } from './play-best-option.component';

describe('PlayBestOptionComponent', () => {
  let component: PlayBestOptionComponent;
  let fixture: ComponentFixture<PlayBestOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayBestOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayBestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

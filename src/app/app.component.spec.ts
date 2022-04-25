import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('Root > AppComponent', () => {
  const TITLE = 'test';
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockAuthStore = jasmine.createSpyObj('AuthStore', ['dispatch'], {
    ath$: of([]),
  });

  beforeEach(async () => {
    @Component({ selector: 'app-header', template: '' })
    class HeaderStubComponent {}

    @Component({ selector: 'app-footer', template: '' })
    class FooterStubComponent {}

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AppComponent, HeaderStubComponent, FooterStubComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(Store, { useValue: mockAuthStore });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(`${TITLE} 1 > should create the app`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`${TITLE} 2 > should have as title 'TEXTOO'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('textoo');
  });
});

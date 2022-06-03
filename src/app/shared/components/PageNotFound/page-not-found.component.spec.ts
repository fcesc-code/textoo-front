import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PageNotFoundComponent } from './page-not-found.component';

describe('shared > components > footer > PageNotFoundComponent', () => {
  const TITLE = 'test';
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PageNotFoundComponent],
      providers: [AuthService],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 > set UserIsLoggedIn to true if there is a user in the session`, () => {
    const MOCK_AUTH = { userId: 'someUserId', accessToken: 'someAccessToken' };
    authService.setUser(MOCK_AUTH);
    component.ngOnInit();
    const RESULT = component.userIsLoggedIn;
    expect(RESULT).toBe(true);
  });
});

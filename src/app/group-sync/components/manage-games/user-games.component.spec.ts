import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesGlobalService } from 'src/app/activities-global/services/activities-global.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserGamesComponent } from './user-games.component';
import { DebugElement } from '@angular/core';
import { MOCK_GAMES } from 'mockdata/games.mock';
import { GetLanguagePipe } from 'src/app/activities-global/pipes/get-language-name.pipe';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { GroupSyncModule } from '../../group-sync.module';
import { GroupGameService } from '../../services/group-game.service';
import { BooleanLocalePipe } from '../../pipes/booleanLocale.pipe';
import { FriendlyTimePipe } from '../../pipes/friendlyTime.pipe';
describe('group-sync > components > manage-games > userGamesComponent', () => {
  const TITLE = 'test';
  let component: UserGamesComponent;
  let fixture: ComponentFixture<UserGamesComponent>;
  let de: DebugElement;
  let service: GroupGameService;
  let sharedService: SharedService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const mockFirestore = {
    refs: {
      gamesColByUser: (id: string) =>
        of(MOCK_GAMES.filter((game) => game.status.organizer === id)),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [
        UserGamesComponent,
        GetLanguagePipe,
        BooleanLocalePipe,
        FriendlyTimePipe,
      ],
      providers: [
        // {
        //   provide: Firestore,
        //   useValue: mockFirestore,
        // },
        AuthService,
        SharedService,
        GroupGameService,
      ],
    }).compileComponents();
    service = TestBed.inject(GroupGameService);
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGamesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeDefined();
  });

  it(`${TITLE} 2 > method loadActivities populates the component with data`, () => {
    authService.setUser({
      userId: 'someUserId',
      accessToken: 'someAccessToken',
    });
    component.loadGames();
    fixture.isStable();
    component.filteredUserGames = MOCK_GAMES;
    fixture.detectChanges();
    expect(component.filteredUserGames.length).not.toEqual(0);
  });

  it(`${TITLE} 3 > without filter, filteredUserGames and userGames have the same lenght and filtersApplied is false`, () => {
    component.loadGames();
    fixture.detectChanges();

    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(true);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 4 > method filterByKeyword filters data`, () => {
    component.userGames = MOCK_GAMES;
    component.filteredUserGames = MOCK_GAMES;
    fixture.detectChanges();

    component.filterByKeyword('cats');
    fixture.detectChanges();
    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED < UNFILTERED).toBe(true);
    expect(FILTERED).toEqual(1);
    expect(component.filtersApplied()).toBe(true);
  });

  it(`${TITLE} 5 > method filterByType filters data`, () => {
    component.userGames = MOCK_GAMES;
    component.filteredUserGames = MOCK_GAMES;
    fixture.detectChanges();

    component.filterByType('best-option');
    fixture.detectChanges();
    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED < UNFILTERED).toBe(true);
    expect(FILTERED).toEqual(1);
    expect(component.filtersApplied()).toBe(true);
  });

  it(`${TITLE} 6 > method filterByLanguage filters data`, () => {
    component.userGames = MOCK_GAMES;
    component.filteredUserGames = MOCK_GAMES;
    fixture.detectChanges();

    component.filterByLanguage('ca');
    fixture.detectChanges();
    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(false);
    expect(component.filtersApplied()).toBe(true);
  });

  it(`${TITLE} 7 > method removeFilters should remove filters`, () => {
    component.userGames = MOCK_GAMES;
    component.filteredUserGames = MOCK_GAMES;
    fixture.detectChanges();

    component.filterByType('select-text');
    fixture.detectChanges();
    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).not.toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(false);
    expect(component.filtersApplied()).toBe(true);

    component.removeFilters();
    fixture.detectChanges();

    const FILTERED2 = component.filteredUserGames.length;
    const UNFILTERED2 = component.userGames.length;
    expect(FILTERED2).toEqual(UNFILTERED2);
    expect(FILTERED2 === UNFILTERED2).toBe(true);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 8 > method loadActivities return activities`, () => {
    authService.setUser({
      userId: 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867',
      accessToken: 'some weird user token',
    });
    component.loadGames();
    fixture.detectChanges();

    const FILTERED = component.filteredUserGames.length;
    const UNFILTERED = component.userGames.length;
    expect(FILTERED).toEqual(UNFILTERED);
    expect(FILTERED === UNFILTERED).toBe(true);
    expect(component.filtersApplied()).toBe(false);
  });

  it(`${TITLE} 9 > fail in deleting a game that does not exist`, () => {
    authService.setUser({
      userId: 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867',
      accessToken: 'some weird user token',
    });
    component.loadGames();
    fixture.detectChanges();
    const PREVIOUS = component.userGames.length;

    component.deleteGame('some-fake-id');
    const POST = component.userGames.length;
    expect(PREVIOUS).toEqual(POST);
    expect(component.filtersApplied()).toBe(false);
  });
});

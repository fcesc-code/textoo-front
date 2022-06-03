import { TestBed } from '@angular/core/testing';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GroupGameService } from './group-game.service';
import {
  deleteDoc,
  addDoc,
  updateDoc,
  Firestore,
} from '@angular/fire/firestore';

describe('group-sync > services > groupGameService', () => {
  const TITLE = 'test';
  let service: GroupGameService;
  const MOCK = {
    id: '',
  };
  const stub = {
    called: false,
    arguments: [],
  };
  let deleteDocStub = (args: any) =>
    setTimeout(() => {
      stub.called = true;
      stub.arguments = args;
    }, 0);
  let updateDocStub = (args: any) =>
    setTimeout(
      () => ({
        called: true,
        arguments: args,
      }),
      0
    );
  let addDocStub = (args: any) =>
    setTimeout(
      () => ({
        called: true,
        arguments: args,
      }),
      0
    );
  let firestoreStub = {} as Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupGameService,
        SharedService,
        {
          provide: deleteDoc,
          useValue: deleteDocStub,
        },
        {
          provide: updateDoc,
          useValue: updateDocStub,
        },
        {
          provide: addDoc,
          useValue: addDocStub,
        },
        {
          provide: Firestore,
          useValue: firestoreStub,
        },
      ],
    });
    service = TestBed.inject(GroupGameService);
    stub.called = false;
    stub.arguments = [];
  });

  xit(`${TITLE} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  xit(`${TITLE} 2 > service exports references to db collections`, () => {
    const REFS = service.refs;
    expect(REFS.gamesCol).toBeTruthy();
    expect(typeof REFS.gamesCol).toBe('function');
    expect(REFS.gamesColByUser).toBeTruthy();
    expect(typeof REFS.gamesColByUser).toBe('function');
    expect(REFS.gameDoc).toBeTruthy();
    expect(typeof REFS.gameDoc).toBe('function');
    expect(REFS.gameUsersCol).toBeTruthy();
    expect(typeof REFS.gameUsersCol).toBe('function');
    expect(REFS.gameScoresCol).toBeTruthy();
    expect(typeof REFS.gameScoresCol).toBe('function');
  });

  xit(`${TITLE} 3 > delete game galls a method (delete) from the db`, () => {
    const MOCK_ID = 'randomId';
    service.deleteGame('randomId');
    expect(stub.called).toBeTrue();
    expect(stub.arguments[0]).toEqual(MOCK_ID);
  });

  xit(`${TITLE} 4 > delete game galls a method (update) from the db`, () => {
    const MOCK_GAME = { id: 'randomId', info: {}, status: {}, title: 'title' };
    service.deleteGame('randomId');
    expect(stub.called).toBeTrue();
    expect(stub.arguments[0]).toEqual(MOCK_GAME);
  });

  xit(`${TITLE} 5 > create game galls a method (add) from the db`, () => {
    const MOCK_GAME = { id: 'randomId', info: {}, status: {}, title: 'title' };
    service.deleteGame('randomId');
    expect(stub.called).toBeTrue();
    expect(stub.arguments[0]).toEqual(MOCK_GAME);
  });
});

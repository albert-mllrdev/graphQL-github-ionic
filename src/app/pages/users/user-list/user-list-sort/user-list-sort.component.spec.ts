import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserListSortComponent } from './user-list-sort.component';

describe('UserListSortComponent', () => {
  let component: UserListSortComponent;
  let fixture: ComponentFixture<UserListSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListSortComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

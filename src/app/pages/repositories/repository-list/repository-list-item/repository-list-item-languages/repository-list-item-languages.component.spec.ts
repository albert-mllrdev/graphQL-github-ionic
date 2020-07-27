import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepositoryListItemLanguagesComponent } from './repository-list-item-languages.component';

describe('RepositoryListItemLanguagesComponent', () => {
  let component: RepositoryListItemLanguagesComponent;
  let fixture: ComponentFixture<RepositoryListItemLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryListItemLanguagesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListItemLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

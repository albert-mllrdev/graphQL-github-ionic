import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepositoryHeaderCountComponent } from './repository-header-count.component';

describe('RepositoryHeaderCountComponent', () => {
  let component: RepositoryHeaderCountComponent;
  let fixture: ComponentFixture<RepositoryHeaderCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryHeaderCountComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryHeaderCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

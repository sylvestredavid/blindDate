import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurComponent } from './mur.component';

describe('MurComponent', () => {
  let component: MurComponent;
  let fixture: ComponentFixture<MurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

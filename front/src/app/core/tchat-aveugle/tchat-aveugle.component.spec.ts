import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatAveugleComponent } from './tchat-aveugle.component';

describe('TchatAveugleComponent', () => {
  let component: TchatAveugleComponent;
  let fixture: ComponentFixture<TchatAveugleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TchatAveugleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchatAveugleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

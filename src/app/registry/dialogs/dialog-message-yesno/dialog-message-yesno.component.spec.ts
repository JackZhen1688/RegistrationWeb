import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageYesnoComponent } from './dialog-message-yesno.component';

describe('DialogMessageYesnoComponent', () => {
  let component: DialogMessageYesnoComponent;
  let fixture: ComponentFixture<DialogMessageYesnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMessageYesnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageYesnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

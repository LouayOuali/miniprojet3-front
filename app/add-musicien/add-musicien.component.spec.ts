import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicienComponent } from './add-musicien.component';

describe('AddMusicienComponent', () => {
  let component: AddMusicienComponent;
  let fixture: ComponentFixture<AddMusicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMusicienComponent]
    });
    fixture = TestBed.createComponent(AddMusicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

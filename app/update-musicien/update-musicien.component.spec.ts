import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMusicienComponent } from './update-musicien.component';

describe('UpdateMusicienComponent', () => {
  let component: UpdateMusicienComponent;
  let fixture: ComponentFixture<UpdateMusicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMusicienComponent]
    });
    fixture = TestBed.createComponent(UpdateMusicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

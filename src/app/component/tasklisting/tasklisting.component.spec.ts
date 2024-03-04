import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistingComponent } from './tasklisting.component';

describe('TasklistingComponent', () => {
  let component: TasklistingComponent;
  let fixture: ComponentFixture<TasklistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklistingComponent]
    });
    fixture = TestBed.createComponent(TasklistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

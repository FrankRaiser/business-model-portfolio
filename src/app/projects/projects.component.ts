import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'bmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('projectPw')
  projectPasswordRef: ElementRef;

  projects: any;

  project = {
    name: '',
    password: ''
  };
  buttonText = 'Create new project';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects() {
    this.http.get(environment.apiUrl + 'projects').subscribe(projects => this.projects = projects);
  }

  accessProject() {
    this.http.post(environment.apiUrl + 'projects', this.project)
      .subscribe(_ => {
          this.snackBar.open('Project created successfully');
          // TODO redirect
          this.loadProjects();
        },
        response => this.snackBar.open(response.error));
  }

  selectProject(project: string) {
    this.project.name = project;
    this.buttonText = 'Access project';
    this.projectPasswordRef.nativeElement.focus();
  }
}

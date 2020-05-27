import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JwPaginationComponent } from 'jw-angular-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WebReqInterceptor } from './web-req.interceptor';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { listFilterPipe } from './pages/_helpers/list-filter.pipe';
import { taskFilterPipe } from './pages/_helpers/task-filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination'
import { DateAgoPipe } from './pages/_helpers/date-ago.pipe';
import { MomentPipe } from './pages/_helpers/moment.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { DialogBoxComponent } from './pages/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxFileComponent } from './pages/dialog-box-file/dialog-box-file.component';
import { SharedService } from './pages/_helpers/shared-service';




@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupPageComponent,
    EditTaskComponent,
    JwPaginationComponent,
    listFilterPipe,
    taskFilterPipe,
    DateAgoPipe,
    MomentPipe,
    DialogBoxComponent,
    DialogBoxFileComponent,
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    OrderModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatDialogModule,
    
    
    
    
  ],
  entryComponents: [DialogBoxComponent,DialogBoxFileComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

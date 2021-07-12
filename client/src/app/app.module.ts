import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AgentsComponent } from './agents/agents.component';
import { AnashComponent } from './anash/anash.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { FamiliesComponent } from './families/families.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { FamilyComponent } from './family/family.component';
import { FamilyOffspringsComponent } from './family-offsprings/family-offsprings.component';
import { FamilyHistoryComponent } from './family-history/family-history.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { FormComponent } from './form/form.component';
import { FamilyAddComponent } from './family-add/family-add.component';
import { BasicTableComponent } from './basic-table/basic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppointmentsComponent,
    AgentsComponent,
    AnashComponent,
    CrudTableComponent,
    FamiliesComponent,
    FamilyDetailsComponent,
    FamilyComponent,
    FamilyOffspringsComponent,
    FamilyHistoryComponent,
    PersonAddComponent,
    PersonEditComponent,
    FormComponent,
    FamilyAddComponent,
    BasicTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

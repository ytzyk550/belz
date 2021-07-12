import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonAddComponent } from './person-add/person-add.component';
import { FamilyOffspringsComponent } from './family-offsprings/family-offsprings.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { FamiliesComponent } from './families/families.component';
import { AnashComponent } from './anash/anash.component';
import { AgentsComponent } from './agents/agents.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyComponent } from './family/family.component';
import { FamilyHistoryComponent } from './family-history/family-history.component';
import { FamilyAddComponent } from './family-add/family-add.component';

const routes: Routes = [
  {path: "", component: HomeComponent, children: [
    {path: "appointments", component: AppointmentsComponent},
    {path: "agents", component: AgentsComponent},
    {path: "anash", component: AnashComponent},
    {path: "families", component: FamiliesComponent},
    {path: "family", children: [
      {path: "add", component: FamilyAddComponent},
      {path: ":id", component: FamilyComponent, children: [
        {path: "details", component: FamilyDetailsComponent},
        {path: "offsprings", component: FamilyOffspringsComponent},
        {path: "history", component: FamilyHistoryComponent}
      ]},
    ]},
    {path: "person", children: [
      {path: "add", component: PersonAddComponent},
      {path: "edit/:id", component: PersonEditComponent},
    ]},
  ]},

  {path:  "**", pathMatch:  "full",redirectTo:  ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

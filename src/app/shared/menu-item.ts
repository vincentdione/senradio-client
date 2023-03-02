import { Injectable } from "@angular/core"

export interface  Menu {
  state: string,
  name: string,
  icon: string,
  role: string
}

const MENU_ITEMS = [
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_ADMIN'},

  {state : 'users', name: 'Utilisateurs', icon: 'person', role:'ROLE_ADMIN'},
  {state : 'historique', name: 'Historiques', icon: 'list', role:'ROLE_ADMIN'},

  {state : 'patient', name: 'Patients', icon: 'person_pin', role:'ROLE_DOCTEUR'},
  {state : 'hopital', name: 'Hopitaux', icon: 'local_hospital', role:'ROLE_DOCTEUR'},
  {state : 'radios', name: 'Radiologies', icon: 'view_list', role:'ROLE_DOCTEUR'},

  {state : 'hopital', name: 'Hopitaux', icon: 'local_hospital', role:'ROLE_SECRETAIRE'},
  {state : 'patient', name: 'Patients', icon: 'person_pin', role:'ROLE_SECRETAIRE'},
  {state : 'radios', name: 'Radiologies', icon: 'view_list', role:'ROLE_SECRETAIRE'},

]


@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
     return MENU_ITEMS;
  }
}

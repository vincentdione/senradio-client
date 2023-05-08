import { Injectable } from "@angular/core"

export interface  Menu {
  state: string,
  name: string,
  icon: string,
  role: string
}

const MENU_ITEMS = [
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_SUPER_ADMIN'},
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_ADMIN'},

  {state : 'users-admin', name: 'Utilisateurs', icon: 'person', role:'ROLE_SUPER_ADMIN'},
  {state : 'hopital', name: 'Hopitaux', icon: 'local_hospital', role:'ROLE_SUPER_ADMIN'},
  {state : 'facture', name: 'Factures', icon: 'payment', role:'ROLE_SUPER_ADMIN'},


  {state : 'users', name: 'Utilisateurs', icon: 'person', role:'ROLE_ADMIN'},
  {state : 'historique', name: 'Historiques', icon: 'list', role:'ROLE_ADMIN'},



  {state : 'patient', name: 'Patients', icon: 'person_pin', role:'ROLE_SECRETAIRE'},
  {state : 'radios', name: 'Radiologies', icon: 'view_list', role:'ROLE_SECRETAIRE'},
  {state : 'radios-docteur', name: 'Radiologies', icon: 'view_list', role:'ROLE_DOCTEUR'},

]


@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
     return MENU_ITEMS;
  }
}

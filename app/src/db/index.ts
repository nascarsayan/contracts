import Dexie from "dexie";

class AppDatabase extends Dexie {
  owners!: Dexie.Table<IOwner, number>;
  tenants!: Dexie.Table<ITenant, number>;
  properties!: Dexie.Table<IProperty, number>;
  contracts!: Dexie.Table<IContract, number>;
  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      owners:
        "++id, name, gender, guardian, relationToGuardian, faith, nationality, occupation, address, isDeleted",
      tenants:
        "++id, name, gender, guardian, relationToGuardian, faith, nationality, occupation, address, isDeleted",
      properties: "++id, address, description, municipalty, isDeleted",
      contracts:
        "++id, owner, tenant, property, startDate, endDate, rent, deposit, duration, paydate, isDeleted",
    });
  }
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface IOwner {
  id?: number;
  name: string;
  gender: Gender;
  guardian: string;
  relationToGuardian: string;
  faith: string;
  nationality: string;
  occupation: string;
  address: Address;
  isDeleted?: boolean;
}

export interface ITenant {
  id?: number;
  name: string;
  gender: Gender;
  guardian: string;
  relationToGuardian: string;
  faith: string;
  nationality: string;
  occupation: string;
  address: Address;
  isDeleted?: boolean;
}

export interface IProperty {
  id?: number;
  address: Address;
  description: string;
  municipality: string;
  name: string;
  isDeleted?: boolean;
}

export interface IContract {
  id?: number;
  owner: IOwner;
  tenant: ITenant;
  property: IProperty;
  duration: number;
  startDate: Date;
  endDate: Date;
  signDate: Date;
  rent: number;
  paydate: number;
  deposit: number;
  isDeleted?: boolean;
}

export const db = new AppDatabase();

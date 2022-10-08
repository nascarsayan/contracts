import Dexie from "dexie";

class AppDatabase extends Dexie {
    owners!: Dexie.Table<IOwner, number>;
    tenants!: Dexie.Table<ITenant, number>;
    properties!: Dexie.Table<IProperty, number>;
    contracts!: Dexie.Table<IContract, number>;
    constructor () {
        super("AppDatabase");
        this.version(1).stores({
            owners: "++id, name, guardian, relationToGuardian, faith, nationality, occupation, address",
            tenants: "++id, name, guardian, relationToGuardian, faith, nationality, occupation, address",
            properties: "++id, address, description, municipalty",
            contracts: "++id, owner, tenant, property, startDate, endDate, rent, deposit, duration, paydate"
        });
    }
}

export interface Address {
    street: string,
    city: string,
    state: string,
    country: string,
    zip: string,
}

export interface IOwner {
  id?: number,
  name: string,
  guardian: string,
  relationToGuardian: string,
  faith: string,
  nationality: string,
  occupation: string,
  address: Address,
}

export interface ITenant {
  id?: number,
  name: string,
  guardian: string,
  relationToGuardian: string,
  faith: string,
  nationality: string,
  occupation: string,
  address: Address,
}

export interface IProperty {
  address: Address,
  description: string,
  municipality: string,
  name: string,
}

export interface IContract {
  owner: IOwner,
  tenant: ITenant,
  property: IProperty,
  duration: number,
  startDate: Date,
  endDate: Date,
  signDate: Date,
  rent: number,
  paydate: number,
  deposit: number,
}

export const db = new AppDatabase();
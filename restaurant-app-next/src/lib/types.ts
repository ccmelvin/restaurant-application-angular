export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  email: string;
  services: string;
  mobile: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  mobile: number;
  password: string;
}
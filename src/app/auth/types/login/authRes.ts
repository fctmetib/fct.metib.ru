export interface AuthRes {
  UserID: number;
  StaffID: number;
  ManagerID: number;
  OrganizationID: number;
  CustomerID: number;
  DebtorID: number;
  DebtorAgencyID: number;
  IP: string;
  Environment: string;
  Login: string;
  Name: string;
  Avatar: string;
  Code: string;
  Date: Date;
  Expire: Date;
  Roles: string[];
  Pemissions: string[];
}

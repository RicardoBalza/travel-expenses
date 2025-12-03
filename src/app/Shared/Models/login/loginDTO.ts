

export class AuthUser {
  userId!: number;
  companyId!: number;
  fullName!: string;
  idCardCountry!: string;
  idCardType!: string;
  idCardNumber!: string;
  email!: string;
  mailboxPasswordEncrypted!: string;
  phoneNumber!: string;
  roleId!: number;
  isActive!: boolean;
  advanceBalanceAvailable!: string;      // "500.00"
  hasPendingAdvanceLiquidation!: boolean;
  licenseType!: string;
  createdAt!: string;                    // o Date si luego lo parseas
  updatedAt!: string;
}

export class UserResponse {
  user!: AuthUser;
  token!: string;
}

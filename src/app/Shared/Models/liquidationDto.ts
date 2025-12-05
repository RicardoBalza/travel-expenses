// Clase principal para la liquidación
export class LiquidationDto {
  liquidationId!: number;
  liquidationNumber!: string;
  userId!: number;
  companyId!: number;
  liquidationDate!: string;
  totalLiquidatedAmount!: string;
  advanceAppliedAmount!: string;
  status!: string;
  liquidatorUserId!: number;
  createdAt!: string;
  updatedAt!: string;
  liquidatorUser!: LiquidatorUserDto;
  company!: CompanyDto;
  expenses!: ExpenseDto[];
}

// Clase para el usuario liquidador
export class LiquidatorUserDto {
  userId!: number;
  companyId!: number;
  fullName!: string;
  idCardCountry!: string;
  idCardType!: string;
  idCardNumber!: string;
  email!: string;
  passwordHash!: string;
  mailboxPasswordEncrypted!: string | null;
  phoneNumber!: string;
  roleId!: number;
  isActive!: boolean;
  advanceBalanceAvailable!: string;
  hasPendingAdvanceLiquidation!: boolean;
  licenseType!: string;
  createdAt!: string;
  updatedAt!: string;
}

// Clase para la compañía
export class CompanyDto {
  companyId!: number;
  companyName!: string;
  taxIdentificationNumber!: string;
  masterInvoiceEmail!: string;
  mailServerConfigJson!: string;
  managesAdvancess!: boolean;
  isActive!: boolean;
  countryId!: number;
  createdAt!: string;
  updatedAt!: string;
}

// Clase para los gastos/egresos
export class ExpenseDto {
  expenseId!: number;
  userId!: number;
  companyId!: number;
  expenseType!: string;
  expenseCategoryId!: number;
  expenseDate!: string;
  totalAmount!: string;
  currencyCode!: string;
  description!: string;
  establishmentName!: string;
  establishmentTaxId!: string;
  liquidationStatus!: string;
  liquidationId!: number;
  pdfFilePath!: string | null;
  xmlFilePath!: string | null;
  photoFilePath!: string | null;
  isCompanyCopyForwarded!: boolean;
  sourceEmailMessageId!: string | null;
  isDeletable!: boolean;
  createdAt!: string;
  updatedAt!: string;
}

// Clase para respuesta de liquidaciones (array)
export class LiquidationResponseDto {
  liquidations!: LiquidationDto[];
  total!: number;
  page!: number;
  limit!: number;
}

// Clase para crear nueva liquidación
export class CreateLiquidationDto {
  userId!: number;
  companyId!: number;
  liquidationDate!: string;
  expenseIds!: number[];
}

// Clase para actualizar liquidación
export class UpdateLiquidationDto {
  status?: string;
  liquidatorUserId?: number;
}

// Enum para estados de liquidación
export enum LiquidationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Enum para tipos de gastos
export enum ExpenseType {
  ELECTRONIC_INVOICE_EMAIL = 'electronic_invoice_email',
  MANUAL_ENTRY = 'manual_entry',
  PHOTO_RECEIPT = 'photo_receipt'
}
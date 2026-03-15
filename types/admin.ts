export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  lastLoginAt: string | null;
}

export type AccountStatus = 'active' | 'suspended' | 'deactivated';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type DocumentType =
  | 'registration_certificate'
  | 'tax_id'
  | 'proof_of_address'
  | 'id_document'
  | 'other';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface AdminListUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  status: AccountStatus;
  createdAt: string;
  lastActiveAt?: string;
  organizationId?: string | null;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone?: string;
  logoUrl?: string;
  status: AccountStatus;
  verificationStatus: VerificationStatus;
  memberCount: number;
  createdAt: string;
  documents: OrganizationDocument[];
}

export interface OrganizationDocument {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationLogoUrl?: string;
  type: DocumentType;
  fileName: string;
  fileSize: number;
  mimeType: string;
  downloadUrl: string;
  status: DocumentStatus;
  rejectionReason?: string;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedById?: string;
}

export interface AccountActionPayload {
  reason?: string;
}

export interface DocumentRejectPayload {
  reason: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

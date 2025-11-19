import { AppConfig } from '@/lib/constants/config';
// import CryptoJS from "crypto-js";
import forge from "node-forge";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface LoginRequest {
  mobile_number: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface ProfileData {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: {
    street?: string;
    district?: string;
    island?: string;
  };
}

export interface Wallet {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  status: string;
  accountNumber?: string;
}

export interface WalletsResponse {
  wallets: Wallet[];
  totalBalance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  timestamp: string;
  mobileNumber?: string;
  accountNumber?: string;
  status?: string;
  date?: string;
}

export interface TransferRequest {
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  transactionPin: string;
}

export interface TopupRequest {
  amount: number;
  paymentMode: string;
  notes?: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  validity: string;
  category: string;
  data?: string;
  voice?: string;
  speed?: string;
}

export interface PackagesResponse {
  packages: Package[];
  totalCount: number;
}

export interface PurchasePackageRequest {
  packageId: string;
  mobileNumber?: string;
  destinationNumber?: string;
  accountNumber?: string;
  countryCode?: string;
  transactionPin: string;
}

export interface RechargeRequest {
  destinationNumber: string;
  mobileNumber: string;
  amount: number;
  pin: string;
}

export interface BillPayRequest {
  destinationNumber: string;
  mobileNumber: string;
  amount: string;
  pin: string;
}

export interface RechargeResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface BillPaymentResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: {
      errorInfo: string;
    }
  };
}

export interface Bill {
  mobileNumber: Number;
  countryCode: string;
}

export interface BillResponse {
  data: {
    content: {
      totalBill: string;
      accountName: string;
      accountNo: string;
      responseCode: string;
    };
    txnId: string;
    reqTxnId: string;
    appName: string;
    operation: string;
    errorCode: number;
    statusCode: string;
    description: string;
  };
}

export interface mobilePackageRequest {
  dealersrvno: String;
  mobileNumber: Number;
  countryCode: string;
}

export interface MobilePackageResponse {
  success: boolean;
  data?: ResponseItem[];
  error?: MobilePackageError;
  categories?: [];
}

export interface MobilePackageError {
  code: string;
  message: MobilePackageErrorMessage;
}

export interface MobilePackageErrorMessage {
  errorCode: string;
  errorDescription: string;
  exceptionMessage: string | null;
  refId: string;
}

export interface ResponseItem {
  buyerSegment: number;
  serviceId: number;
  tariffCode: string;
  subsType: string;
  type: string;
  productInfo: ProductInfo[];
}

export interface ProductInfo {
  productNumber: number;
  srvId: number;
  taxCode: string | null;
  productName: string;
  description: string;
  features: string;
  imageUrl: string;
  productCode: string;
  status: number;
  stockQuantity: number;
  cfgJson: string; // JSON string, can parse into CfgJson if needed
  creatorId: number;
  modifierId: number;
  catalog: string | null;
  segmentList: any[]; // empty array, can type later if known
  productpriceList: ProductPrice[];
  tags: Tag[];
}

export interface ProductPrice {
  effectiveFrom: string; // e.g. "2025-09-28T12:44"
  effectiveTo: string;   // e.g. "2026-03-31T12:44:59"
  priceMaxUnits: number;
  priceMinUnits: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface walletRequestData {
  accId: String;
}

export interface WalletResponseRoot {
  data: WalletData;
  message: string;
  success: boolean;
}

export interface recentTransactionsRequestData {
  serviceNo: String;
  rownum: String;
  serviceId: String;
}

export interface recentTransactionsResponseRoot {
  data?: WalletDataForTransaction; // made optional for safety
  message?: string;
  success: boolean;
  // sometimes apiClient may return `response` at top-level; allow it via index signature
  [key: string]: any;
}

export interface WalletDataForTransaction {
  response?: WalletAccountForTransaction[];
}

export interface WalletAccountForTransaction {
  entry_time?: string;
  Wallet?: string;
  order_number?: string;
  debit_amount?: number;
  credit_amount?: number;
  description?: string;
  // allow other fields
  [key: string]: any;
}

export interface WalletData {
  response: WalletAccount[];
}

export interface WalletAccount {
  AccountId: number;
  Wallettypeid: number;
  WallettypeName: string;
  ReservedBalance: number;
  ERPAccountID: string;
  Walletname: string;
  WalletId: number;
  Balance: number;
  UsableBalance: number;
}

export interface submitMobilePackageRequest {
  mobileNumber: string;
  amount: Number;
  destinationNumber: string;
  countryCode: string;
  pin: string;
  productId: string;
}

export interface SubmitMobilePackageResponse {
  data: {
    response: {
      refId: string;
      orderNumber: string;
      apiStatus: string;
      detail: string;
    };
  };
  error: {
    message: {
      errorInfo: string;
    }
  };
  errorCode: String;
  errorDescription: String;
  errorInfo: string;
  success: string;
}

export interface broadbandPackageRequest {
  dealersrvno: String;
  mobileNumber: String;
  countryCode: string;
}

export interface BillDetailsResponse {
  subscriberMsisdn: string;
  bills: Bill[];
  totalAmount: number;
  accountNumber: string;
}

export interface StockDetails {
  pkgName: string;
  simName: string;
  msisdn: string;
  simNo: string;
}

export interface InventoryResponse {
  result: {
    code: number;
    message: string;
    requestId: string;
    referenceId: string;
    error: string[];
  };
  stockDetails: StockDetails[] | StockDetails;
}

export interface simkycresponce<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

// KYC Document
export interface KycDocument {
  code: string;
  dataType: string;
  data1?: string;
  data2?: string;
  identityNumber?: string;
  issueDate?: string;
  validityDate?: string;
  status?: string;
}

// KYC Payload structure
export interface KycPayload {
  searchType: string;
  searchNumber: string;
  appRefId?: string;
  customerType?: string;
  documents: KycDocument[];
  firstName?: string;
  middleName?: string;
  lastName?: string;
  subscriberName?: string;
  dob?: string;
  pob?: string;
  gender?: string;
  emailId?: string;
  qualification?: string;
  profession?: string;
  maritialStatus?: string;
  presentAddress?: Record<string, any>;
  permanentAddress?: Record<string, any>;
  altNumber?: string;
  reKyc?: boolean;
  comment?: string;
  kycMode?: string;
  agentId?: string;
  agentName?: string;
  agentMsisdn?: string;
  agentLocation?: string;
  channelMode?: number;
  jobCardAssignmentId?: string;
}

export interface KycResponseData {
  referenceId: string;
  status: string;
  details?: any;
}

export interface EncryptedResult {
  encryptedKey: string;
  encryptedPayload: string;
  iv: string;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private publicKey: string;

  constructor() {
    this.baseUrl = AppConfig.apiBaseUrl;
    this.timeout = AppConfig.apiTimeout;
    this.publicKey = AppConfig.encryptionKey;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTUjAwMSIsInVzZXJuYW1lIjoiZGVhbGVyMTIzIiwicm9sZSI6ImRlYWxlciIsImlhdCI6MTc2MTU0MjI3MywiZXhwIjoxNzYxODAxNDczfQ.tq8RhbR7mCyo5MUwSs3L95lb8S0wquSietc_96z14Fc";
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = await this.getAuthToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    if (token && !endpoint.includes('/auth/login')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`[API] ${options.method || 'GET'} ${endpoint}`);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        console.error(`[API Error] ${endpoint}:`, data);
        return {
          success: false,
          error: data.error || {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
          },
        };
      }

      console.log(`[API Success] ${endpoint}`);
      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        console.error(`[API Timeout] ${endpoint}`);
        return {
          success: false,
          error: {
            code: 'TIMEOUT',
            message: 'Request timeout',
          },
        };
      }

      console.error(`[API Error] ${endpoint}:`, error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error.message || 'Network error occurred',
        },
      };
    }
  }

  async billQuery(params: any): Promise<BillResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[rechargeTopup] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/billQuery`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async billPayment(params: any): Promise<BillPaymentResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[rechargeTopup] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/billpay`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async mobilePackage(params: any): Promise<MobilePackageResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[mobilePackage] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/mobilePackages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[mobilePackages] Error:', error);
      throw error;
    }
  }

  async walletRequest(params: any): Promise<WalletResponseRoot> {
    try {
      console.log("inside walletRequest=================================================:: ", params);

      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/walletRequest`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async recentTransactions(params: any): Promise<recentTransactionsResponseRoot> {
    try {
      console.log("inside recentTransactions=================================================:: ", params);
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/recentTransactions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async submitMobilePackage(params: any): Promise<SubmitMobilePackageResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[broadbandPackage] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/recharge/submitPackageMobile`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async submitBroadbandPackage(params: any): Promise<SubmitMobilePackageResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[broadbandPackage] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/recharge/submitPackageBroadband`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async submitBroadbandPackageAlpha(params: any): Promise<SubmitMobilePackageResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[broadbandPackage alpha] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/recharge/submitPackageBroadbandAlpha`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async broadbandPackage(params: any): Promise<MobilePackageResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[broadbandPackage] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/broadbandPackages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  async rechargeTopup(params: any): Promise<RechargeResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[rechargeTopup] AES key encrypted with RSA-OAEP params', params);

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/recharge/topup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  /////////////////////////////////SIMINVENTARY///////////////////////////

  async getInventory(params: any): Promise<InventoryResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[Inventory] AES key encrypted with RSA-OAEP');

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/inventory`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  /////////////////////////////////SIMINVENTARY for filter///////////////////////////

  async getInventoryForfilter(params: any): Promise<InventoryResponse> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[Inventory] AES key encrypted with RSA-OAEP');

      // 4️⃣ Get auth token
      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      // 5️⃣ Send encrypted request
      const url = `${this.baseUrl}/api/package/inventory`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv, // send IV to server
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Inventory] Error:', error);
      throw error;
    }
  }

  /////////////////////////////package///////////////////////////////////////

  async getPackageDetails(params: { appReqId: string }): Promise<any> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey || !encryptedPayload || !iv) {
        throw new Error('Encryption failed');
      }

      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      const url = `${this.baseUrl}/api/inventory/getPackageDetails`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch package details: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[PackageDetails] API Response:', result);
      return result;
    } catch (error: any) {
      console.error('[PackageDetails] Error:', error);
      throw error;
    }
  }

  ////////////////////////////SIM SALE//////////////////////////////

  async submitKycApplication(params: any): Promise<simkycresponce> {
    try {
      const { searchType, searchNumber, ...payloadData } = params;

      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(payloadData, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }

      console.log('[KYC] AES key encrypted with RSA-OAEP params', payloadData);

      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      const url = `${this.baseUrl}/api/kyc/submit`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
          searchType,
          searchNumber,
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[KYC] Error:', error);
      throw error;
    }
  }

  //--------------------------------JOB-CARD------------------------------------//
  async getJobCardInfo(params: any): Promise<any> {
    try {
      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(params, this.publicKey);

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }
      console.log('[JobCardInfo] AES key encrypted with RSA-OAEP');

      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      const url = `${this.baseUrl}/api/jobcardinfo`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('[JobCardInfo] Error:', error);
      throw error;
    }
  }

  //--------------------------Transfer--------------------------------------------//
  async submitCreditPurchase(params: any): Promise<any> {
    try {
      const { refId, ...payloadData } = params;

      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(
        payloadData,
        this.publicKey
      );

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }

      console.log('[Credit Purchase] AES key encrypted with RSA-OAEP', payloadData);

      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      const url = `${this.baseUrl}/api/credit/purchase`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
          refId,
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Credit Purchase] Error:', error);
      throw error;
    }
  }

  //--------------------------settlements--------------------------------------------//

  async submitCreditPurchaseReverse(params: any): Promise<any> {
    try {
      const { refId, ...payloadData } = params;

      const { encryptedKey, encryptedPayload, iv } = await this.encryptPayload(
        payloadData,
        this.publicKey
      );

      if (!encryptedKey) {
        throw new Error('RSA-OAEP encryption failed');
      }

      console.log('[Credit Purchase] AES key encrypted with RSA-OAEP', payloadData);

      const token = await this.getAuthToken();
      if (!token) throw new Error('No auth token found');

      const url = `${this.baseUrl}/api/credit/reverse`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: encryptedKey,
          data: encryptedPayload,
          iv,
          refId,
        }),
      });

      return await response.json();
    } catch (error: any) {
      console.error('[Credit Purchase] Error:', error);
      throw error;
    }
  }
  //-------------------------------------------------------------------------------------------------//

  private async encryptPayload(params: any, serverPublicKeyPem: string): Promise<EncryptedResult> {
    const aesKey = forge.random.getBytesSync(16);

    const iv = forge.random.getBytesSync(16);
    const cipher = forge.cipher.createCipher('AES-CBC', aesKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(JSON.stringify(params), 'utf8'));
    cipher.finish();
    const encryptedPayload = forge.util.encode64(cipher.output.getBytes());

    const publicKey = forge.pki.publicKeyFromPem(serverPublicKeyPem);
    const encryptedKey = forge.util.encode64(
      publicKey.encrypt(aesKey, 'RSA-OAEP', { md: forge.md.sha256.create() })
    );

    return {
      encryptedKey,
      encryptedPayload,
      iv: forge.util.encode64(iv),
    };
  }
}

export const apiClient = new ApiClient();
export default apiClient;

# Backend API Documentation (UI-Driven)

This document lists every API the backend must provide for the loveResale customer frontend. All shapes and endpoints are inferred from **HTML templates**, **form definitions**, and **component input/output types** only (services are neglected).

---

## 1. Authentication

### 1.1 Sign In

**POST** `/auth/sign-in` (or equivalent)

**Request body:**

```ts
{
  mobile: string;        // phone number
  password: string;
  countryCode: string;    // e.g. dial code from mobile input
}
```

**Response:** User object + token (see Current User below). After 403, frontend may call send OTP and then verify OTP.

---

### 1.2 Send OTP

**POST** `/auth/send-otp` (or similar)

**Request:** `countryCode`, `phoneNumber` (query or body).

**Response:** `{ message: string }` (message contains masked contact after colon, e.g. `"... : ***123"`).

**Used by:** Sign-in (when 403), Sign-up (before verify), Forget password.

---

### 1.3 Verify OTP (sign-up)

**POST** `/auth/verify-otp`

**Request body:**

```ts
{
  countryCode: number;
  mobile: string;
  otp: number | null;    // 6 digits
}
```

**Response:** Success; no specific body required (dialog closes).

---

### 1.4 Verify OTP (password reset)

**POST** `/auth/verify-reset-otp`

**Request body:**

```ts
{
  otp: string;
  countryCode: string;
  identifier: string;    // phone from forget-password
}
```

**Response:** Success; frontend then opens "new password" dialog.

---

### 1.5 Forget Password

**POST** `/auth/forget-password`

**Request body:**

```ts
{
  identifier: string;    // phone number
  countryCode: string;
}
```

**Response:** `{ message: string }` (masked contact in message).

---

### 1.6 Reset / Confirm Password

**POST** `/auth/confirm-password` (or reset-password)

**Request body:**

```ts
{
  confirmPassword: string;
  countryCode: string;
  identifier: number;    // from verify step
  newPassword: string;
}
```

**Response:** Success; frontend then opens sign-in.

---

### 1.7 Register

**POST** `/auth/register`

**Request body:**

```ts
{
  fullName: string | null;
  mobile: string | null;
  password: string | null;
  nationality: string;
  recaptcha: string;
  mail: string;
}
```

**Response:** Success; frontend then calls send OTP and verify OTP.

---

### 1.8 Get Current User

**GET** `/auth/current-user` (or `/user/me`)

**Response:** Used after sign-in; must match at least:

```ts
{
  customerId: number;
  fullName: string;
  mobile: string;
  email: string;
  nationality: string;
  address?: any;
  isVerified: boolean;
  nationalId?: any;
  passportNumber?: string;
  countryCode: string;
  education?: any;
  occupation?: any;
  gender?: any;
  country?: any;
  landline?: any;
  area?: any;
  birthdate?: string;
  hasAppointmentToRate?: boolean;
  hasActiveCall?: boolean;
  appointmentId?: number;
  isMarried?: any;
  numberOfChildren?: any;
  sapPartnerId?: string;
  profileCompletion?: string;
  profilePictureImageType?: string;
  nationalIdImageType?: string;
  fcmToken?: any;
  isNewCustomer?: any;
  projectNames?: any[];
  showPopup?: boolean;
  popupContent?: any;
  popupTitle?: string;
  token?: string;       // if not in separate header
}
```

---

## 2. Search & Units Listing

### 2.1 Get Search Model (filters + options)

**GET** `/search/model` (or `/search/filters`)

**Response:**

```ts
{
  locations: { id: number; name: string; }[];
  projects: { id: number; name: string; code: string; }[];
  unitTypes: { id: number; name: string; }[];
  areaRanges: number[];
  unitModels: string[];
  bedrooms: string[];
  bathrooms: string[];
  floors: string[];
  deliveries: string[];
}
```

**Used by:** Home hero search, All-units search header and filters sidebar (locations, projects, types, bedrooms, bathrooms, delivery, etc.).

---

### 2.2 Search Units (list with pagination)

**GET** `/search/units` (or `/units`)

**Query params:**

```ts
{
  page?: number;
  locationId?: number;
  projectIds?: number | number[];
  usageTypeIds?: number | number[];
  areaFrom?: number;
  areaTo?: number;
  modelCode?: string;
  bathrooms?: number;
  bedrooms?: number;
  floors?: number | number[];
  deliveryDateFrom?: number | string;
  deliveryDateTo?: number | string;
  sortBy?: string;           // e.g. 'price_asc' | 'price_desc'
  view?: string;
  garden?: boolean;
  finishingType?: string;
  deliveryDate?: string;
  model?: string;
  totalAmountFrom?: number;
  totalAmountTo?: number;
  depositAmountFrom?: number;
  depositAmountTo?: number;
  installmentPeriod?: string;
}
```

**Response (paginated):**

```ts
{
  content: UnitCardItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
```

**UnitCardItem:**

```ts
{
  id: number;
  imageUrl: string;
  location: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  view: string;
  area: number;
  garage: boolean;
  readyToMove: boolean;
  totalPrice: number;
  paidAmount: number;
  offerAmount: number;
  isFavorite?: boolean;
}
```

**Used by:** All-units page, home featured properties (if backed by same API).

---

### 2.3 Toggle Unit Favorite

**POST** or **DELETE** `/units/:id/favorite` (or `/favorites/:unitId`)

**Request:** Unit id in path (or body).  
**Response:** Success; frontend refreshes or updates `isFavorite` on the card.

**Used by:** Unit card "favorite" button, featured properties favorite.

---

## 3. Unit / Model Details

### 3.1 Get Unit/Model Details by ID

**GET** `/units/:id` or `/models/:id`

**Response:** Must support at least:

```ts
{
  unitId: number;
  modelId: number;
  modelCode: string;
  unitModelCode: string;
  usageTypeId: number;
  usageType: string;
  locationId: number;
  locationName: string;
  locationNameAr: string;
  projectId: number;
  projectName: string;
  projectNameAr: string;
  projectVideoURL?: string;
  deliveryDate: string;
  bedrooms: string;
  bathrooms: string;
  modelImageUrl?: string;
  floor: string;
  unitSize: number;
  garage: boolean;
  club: boolean;
  storage: boolean;
  ac: boolean;
  companyCode: string;
  projectCode: string;
  rentalUnit?: string;
  isAvailable: boolean;
  statusDescription: string;
  media: {
    singleImages: { "360"?: string; Floor?: string; PDF?: string; Basement?: string; UnitPlan?: string; Finishing?: string; };
    multiImages: { Small?: string[]; Medium?: string[]; Main?: string[]; };
  };
}
```

**Used by:** Model/unit details page (gallery, header, features, map, payment plan).

---

### 3.2 Get Similar Units

**GET** `/units/:id/similar` or query param on details

**Response:** Array of:

```ts
{
  id: number;
  imageUrl: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  readyToMove: boolean;
  price: number;
}
```

**Used by:** Similar units section on unit details page.

---

## 4. Projects

### 4.1 Get Projects List

**GET** `/projects`

**Response:** Array of:

```ts
{
  id: number;
  name: string;
  nameAr?: any;
  code: string;
}
```

**Used by:** Layout (header/nav), Home projects listing, All-units filters, Projects page.

---

### 4.2 Get Project Details by ID

**GET** `/projects/:id`

**Response:** Must support at least:

- Project name (and Ar), hero image URL.
- Overview text.
- Features: `{ icon: string; label: string; }[]`.
- Model types: `{ id: number; name: string; imageUrl: string; }[]`.
- Gallery: `string[]` (image URLs).
- Map/video URL if any.
- About sidebar: `{ icon: string; title: string; value: string; }[]`.

**Used by:** Project details page (hero, overview, features, model types carousel, gallery, map, about sidebar).

---

## 5. Contact & Lead Forms

### 5.1 Footer Contact Form

**POST** `/contact` (or `/contact-us`)

**Request body:**

```ts
{
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

**Used by:** [contact-form.html](src/app/layout/components/footer/contact-form/contact-form.html).

---

### 5.2 Project Contact Form

**POST** `/projects/:projectId/contact` (or `/contact/project`)

**Request body:**

```ts
{
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
```

**Used by:** [project-contact-form.html](src/app/features/project-details/components/project-contact-form/project-contact-form.html).

---

### 5.3 Register Interest (Contact Us page)

**POST** `/contact/register-interest` (or `/leads/interest`)

**Request body:**

```ts
{
  fullName: string;
  phone: string;
  email: string;
  location: string;
  project: string;
  branch: string;
  message?: string;
}
```

**Used by:** [register-interest.html](src/app/features/contact-us/components/register-interest/register-interest.html).

---

## 6. Add Property (Sell / Nomination)

### 6.1 Submit Property for Sale

**POST** `/properties` or `/sell` or `/nominate`

**Request body:** Combined from add-property forms:

```ts
{
  // Details
  project: string;
  type: string;
  floor: string;
  bathrooms: number;
  finishing: string;
  delivery: string;
  area: number;
  group: number;
  unitNumber: string;
  view: string;
  garage: string;
  bedrooms: number;
  // Payment
  unitPrice: number;
  paidAmount: number;
  overAmount: number;
  installmentPlan: string;
  // Contact
  name: string;
  email: string;
  phoneNumber: string;
  whatsapp: string;
  // Media
  images: string[];   // base64 or uploaded URLs
}
```

**Used by:** [add-property](src/app/features/add-property) (property-details, payment, contact, media forms).

---

## 7. Profile

### 7.1 Get Profile

**GET** `/profile`

**Response:**

```ts
{
  fullName: string;
  arabicFullName?: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  nationalId: string;
  address: string;
  occupation?: string;
  education?: string;
  gender: string;
  country?: string;
  governorate?: string;
  city?: string;
  district?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
}
```

**Used by:** Profile page form prefill.

---

### 7.2 Update Profile

**PUT** or **PATCH** `/profile`

**Request body:** Same shape as profile form:

```ts
{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumberOptional?: string;
  email: string;
  birthDate: string | null;
  nationality: string;
  gender: string;
}
```

**Used by:** [profile-form.component.html](src/app/features/profile/components/profile-form/profile-form.component.html).

---

### 7.3 Get Profile Picture

**GET** `/profile/profilePicture`  
**Response:** Blob (image).

---

### 7.4 Get National ID Picture

**GET** `/profile/nationalIdPicture`  
**Response:** Blob (image).

---

## 8. Reserved Units & Payments

### 8.1 Get Reserved Units (paginated)

**GET** `/profile/reserved-units` (or `/reserved-units`)

**Query:** `page`, `size` (or similar).

**Response:**

```ts
{
  content: {
    offerId: number;
    unitId: number;
    offerNumber: string;
    projectName: string;
    unitNumber: string;
    reservationAmount: any;
    remainingTime: any;
    orderDateTime: any;
    status: string;
    expirationDate: string;
    paymentPlan: string;
    finishing: string;
    maintenancePlan: string;
    customerId?: any;
    customerName?: any;
    customerMobile?: any;
    customerEmail?: any;
    customerNationality?: any;
  }[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
```

**Used by:** Profile → Reserved units section.

---

### 8.2 Payment Page Data

**GET** `/payment/:offerId` or `/reserved-units/:offerId/payment` (when user goes to payment for a reserved unit)

**Response:** Must provide:

- **Unit preview:** `imageUrl`, `location`, `title`, `type`, `floor`, `bed`, `bedrooms`, `bathrooms`, `finishing`, `delivery`, `area`, `group`, `unitNumber`, `garage`.
- **Payment summary:** `unitPrice`, `amountPaid`, `remainingTime`, `paymentDate`, `paymentAmount`, `currency`.

**Used by:** [payment.html](src/app/features/payment/payment.html), payment-summary and payment-preview components.

---

### 8.3 Select Payment Method / Initiate Payment

**POST** `/payment` (or `/payments/initiate`)

**Request body:** At least `offerId` or `unitId`, and `method: 'card' | 'bank'`.

**Response:** Redirect URL or payment session id as needed by the UI.

**Used by:** Payment page "pay" after selecting card or bank.

---

## 9. Appointments

### 9.1 Get Appointments

**GET** `/appointments` (or `/profile/appointments`)

**Response:** Array of:

```ts
{
  appointmentId: number;
  userFullName: string;
  appointmentDateTime: string;
  status: string;
}
```

**Used by:** Profile → Appointments.

---

### 9.2 Create Appointment

**POST** `/appointments`

**Request body:**

```ts
{
  selectedDate: string;
}
```

**Used by:** Model details "Book appointment" (and possibly project/unit context in body).

---

### 9.3 Appointment Feedback

**POST** `/appointments/:id/feedback`

**Request body:**

```ts
{
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  comment: string;
}
```

**Response:** Can include zoom/meeting info if needed:

```ts
{
  id: number;
  modelId?: any;
  userId: number;
  customerId: number;
  appointmentDate: string;
  c4CId?: any;
  status: string;
  type: string;
  feedbackMessage?: any;
  rating?: any;
  zoomStartUrl?: string;
  zoomMeetingId?: string;
  zoomUrl?: string;
  startTime?: string;
  endTime?: string;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  comment: string;
}
```

**Used by:** Post-appointment feedback flow.

---

## 10. Unit Details Actions (Contact Salesman)

### 10.1 Zoom Meeting

**POST** `/units/:id/zoom-meeting` (or similar)

**Request:** Unit/model id.  
**Response:** `{ url: string }` or similar for Zoom link.

**Used by:** [contact-salesman.html](src/app/features/model-details/components/contact-salesman/contact-salesman.html) "Zoom meeting".

---

### 10.2 Book Appointment (from unit)

**POST** `/units/:id/appointment` or reuse **POST** `/appointments` with unit/model id in body.

**Used by:** "Book appointment" on unit details.

---

### 10.3 Submit Contact Request (unit)

**POST** `/units/:id/contact-request`

**Request body:** Optional name, phone, message (UI does not show form fields; backend can define minimal payload).

**Used by:** "Submit request" on unit details contact-salesman.

---

## 11. Blog / Articles

### 11.1 Get Featured Articles

**GET** `/blog/featured` or **GET** `/articles?featured=true`

**Response:** Array of:

```ts
{
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  isRecentlyUpdated?: boolean;
}
```

**Used by:** [featured-blogs.html](src/app/features/blog/components/featured-blogs/featured-blogs.html).

---

### 11.2 Get All Articles (with optional year filter)

**GET** `/blog/articles` or **GET** `/articles`

**Query:** `year?: number`, `page`, `size` if paginated.

**Response:** Same article shape as above; optionally grouped by year (UI has `years()` and `articles()`).

**Used by:** [all-articles.html](src/app/features/blog/components/all-articles/all-articles.html).

---

## 12. Static / Config (optional)

- **Branches / contact info:** Get-in-touch section uses static list (titleKey, addressKey, type, icon). Can be **GET** `/config/branches` returning array of `{ titleKey, addressKey, type, icon }` or localized `title`, `address`.
- **Navigation items:** Header nav and footer sections can be **GET** `/config/nav` and **GET** `/config/footer` if backend drives them; otherwise frontend-only.

---

## 13. Generic Response Wrapper

Where applicable, wrap payloads in a common envelope (as in [general-api.ts](src/app/core/models/general-api.ts)):

```ts
{
  message: string;
  data: T;
  status: boolean;
}
```

---

## Summary Table

| Area           | Endpoints summary |
|----------------|-------------------|
| Auth           | sign-in, send-otp, verify-otp, verify-reset-otp, forget-password, confirm-password, register, current-user |
| Search/Units   | search model (filters), search units (paginated), toggle favorite |
| Unit details   | get unit by id, similar units |
| Projects       | list projects, get project by id |
| Contact        | footer contact, project contact, register interest |
| Add property   | submit property (sell/nominate) |
| Profile        | get profile, update profile, profile picture, national id picture |
| Reserved/Pay   | reserved units list, payment page data, select payment method |
| Appointments   | list, create, feedback |
| Unit actions   | zoom meeting, book appointment, contact request |
| Blog           | featured articles, all articles (optional year) |

All request/response types above are derived from the frontend UI (HTML + component TS). Backend can map these to internal models and add validation, auth, and error codes as needed.

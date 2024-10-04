export type Entity = Property | Agent; // Union type for Property and Agent
export type FieldValue = string | number | boolean | null | Record<string, unknown> | FieldValue[];


export type Location = {
   __typename: string; // Location typename for dynamic rendering
  id?: string;
  address?: string; // Renamed civicName to address for consistency
  civicName?: string; // Can be kept for compatibility
  codePostal?: string;
  country?: string;
  lat?: string | null; // Allow nulls based on the sample data
  long?: string | null; // Allow nulls based on the sample data
  state?: string;
  street?: string;
  city?: string; // Added city field to match typical location structure
};

export type Characteristics = {
   __typename: string; // Characteristics typename for dynamic rendering
  id: string;
  sqMts: number;
  bathrooms: number;
  elevator: boolean;
  pool: boolean | null; // Pool can be null, as shown in the data
  rooms: number;
  vigilanceSystem: boolean;
};

export type Media = {
  __typename: string; // To help differentiate media types
  previewUrl: string | null; // Preview URL can be null, as shown in the data
  caption?: string; // Media caption
  url: string; // Actual media URL
  name: string; // Name of the media file
};

export type Property = {
  documentId: string;
  __typename: string; // Property typename for dynamic rendering
  catastroId: string;
  media: Media[]; // Array of media objects
  location?: Location; // Location object
  characteristics?: Characteristics; // Characteristics object (specific to properties)
};

export type Agent = {
  documentId: string;
  __typename: 'Agent';
  id: string;  
  firstName: string;
  lastName: string;
  agentLicenseNumber: string;
  agency: Agency;
  contact: Contact;
  location: Location;
};

export type Contact = {
  email: string;
  primaryPhone: string;
  website?: string | null; // Optional website
};

export type Agency = {
  name: string;
};


// Default empty location object
export const defaultLocation: Location = {
   __typename: 'Location',
  id: '',
  address: '',
  civicName: '',
  codePostal: '',
  country: '',
  lat: '',
  long: '',
  state: '',
  street: '',
  city: ''
};

// Default empty characteristics object
export const defaultCharacteristics: Characteristics = {
  __typename: 'Characteristics',
  id: '',
  sqMts: 0,
  bathrooms: 0,
  elevator: false,
  pool: null,
  rooms: 0,
  vigilanceSystem: false
};

// Default empty media object
export const defaultMedia: Media = {
  __typename: 'UploadFile',
  previewUrl: null,
  caption: '',
  url: '',
  name: ''
};

// Default empty property object
export const defaultProperty: Property = {
  documentId: '',
  __typename: 'Property',
  catastroId: '',
  media: [defaultMedia],
  location: defaultLocation,
  characteristics: defaultCharacteristics
};

// Default empty agent object
export const defaultAgent: Agent = {
  documentId: '',
  id:'',
  __typename: 'Agent',
  firstName: '',
  lastName: '',
  agentLicenseNumber: '',
  agency: { name: '' },
  contact: { email: '', primaryPhone: '', website: '' },
  location: defaultLocation
};


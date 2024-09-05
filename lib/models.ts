import 'server-only';
export interface UserData {
  id:number
  email:string
}

export interface PatientFormDTO {
  first_name: string
  last_name: string
  email: string
  identification_number: string
  birthday: Date
}

export interface PatientFileDTO {
  patient_file_id: number
  path: string
  file_status_name: string
  file_status_id: number
  user_account_id: number
  message: string
  prediction_value: number
}

export interface PatientDTO {
  user_account_id: number
  first_name: string
  last_name: string
  email: string
  identification_number: string
  birthday: Date
}

export interface SelectProduct {
  id: number;
  imageUrl: string;
  name: string;
  status: string;
  price: number;
  stock: number;
  availableAt: Date;
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: any[];
  newOffset: number | null;
  totalProducts: number;
}> {
  var products = GET()

  if (offset === null) {
    return { products: products, newOffset: 0, totalProducts: 0 };
  }

  let newOffset = offset + 5;

  return {
    products: products,
    newOffset,
    totalProducts: products.length
  };
}

export async function deleteProductById(id: number) { }



export function GetPatientsMock(): PatientDTO[] {
  return [
    {
      user_account_id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      identification_number: "A1234567",
      birthday: new Date('1990-05-15')
    },
    {
      user_account_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      identification_number: "B9876543",
      birthday: new Date('1985-07-22')
    },
    {
      user_account_id: 3,
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@example.com",
      identification_number: "C7654321",
      birthday: new Date('1978-09-30')
    },
    {
      user_account_id: 4,
      first_name: "Emily",
      last_name: "Davis",
      email: "emily.davis@example.com",
      identification_number: "D4567890",
      birthday: new Date('1992-03-14')
    },
    {
      user_account_id: 5,
      first_name: "David",
      last_name: "Miller",
      email: "david.miller@example.com",
      identification_number: "E2345678",
      birthday: new Date('1988-11-04')
    }
  ]
};


export function GetPatientFileMock(): PatientFileDTO[] {
  return [
    {
      patient_file_id: 1,
      path: '/images/test.png',
      file_status_name: 'processing',
      file_status_id: 1,
      user_account_id: 1,
      message: 'test message',
      prediction_value: 0.85
    },
    {
      patient_file_id: 2,
      path: '/images/test.png',
      file_status_name: 'completed',
      file_status_id: 2,
      user_account_id: 2,
      message: 'test message',
      prediction_value: 0.90
    },
    {
      patient_file_id: 3,
      path: '/images/test.png',
      file_status_name: 'error',
      file_status_id: 3,
      user_account_id: 3,
      message: 'test message',
      prediction_value: 0.65
    },
    {
      patient_file_id: 4,
      path: '/images/test.png',
      file_status_name: 'completed',
      file_status_id: 2,
      user_account_id: 4,
      message: 'test message',
      prediction_value: 0.92
    },
    {
      patient_file_id: 5,
      path: '/images/test.png',
      file_status_name: 'processing',
      file_status_id: 1,
      user_account_id: 5,
      message: 'test message',
      prediction_value: 0.78
    }
  ]
};



export function GET(): any[] {
  return [
    {
      id: 1,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
      name: 'Smartphone X Pro',
      status: 'active',
      price: '999.00',
      stock: 150,
      availableAt: new Date()
    },
    {
      id: 2,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
      name: 'Wireless Earbuds Ultra',
      status: 'active',
      price: '199.00',
      stock: 300,
      availableAt: new Date()
    },
    {
      id: 3,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
      name: 'Smart Home Hub',
      status: 'active',
      price: '149.00',
      stock: 200,
      availableAt: new Date()
    },
    {
      id: 4,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
      name: '4K Ultra HD Smart TV',
      status: 'active',
      price: '799.00',
      stock: 50,
      availableAt: new Date()
    },
    {
      id: 5,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
      name: 'Gaming Laptop Pro',
      status: 'active',
      price: '1299.00',
      stock: 75,
      availableAt: new Date()
    },
    {
      id: 6,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
      name: 'VR Headset Plus',
      status: 'active',
      price: '349.00',
      stock: 120,
      availableAt: new Date()
    },
    {
      id: 7,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
      name: 'Smartwatch Elite',
      status: 'active',
      price: '249.00',
      stock: 250,
      availableAt: new Date()
    },
    {
      id: 8,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
      name: 'Bluetooth Speaker Max',
      status: 'active',
      price: '99.00',
      stock: 400,
      availableAt: new Date()
    },
    {
      id: 9,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
      name: 'Portable Charger Super',
      status: 'active',
      price: '59.00',
      stock: 500,
      availableAt: new Date()
    },
    {
      id: 10,
      imageUrl:
        'https:uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
      name: 'Smart Thermostat Pro',
      status: 'active',
      price: '199.00',
      stock: 175,
      availableAt: new Date()
    }
  ];
}


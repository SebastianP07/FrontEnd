import { Dominio } from './../models/dominio.model';

export abstract class DominiosData {
  static readonly tiposdeDocumento: Dominio[] = [
    { id: 1, valor: 'CC', descripcion: 'Cédula de Ciudadania' },
    { id: 2, valor: 'CE', descripcion: 'Cédula de Extranjería' },
    { id: 3, valor: 'NIT', descripcion: 'Número de Identificación Tributaria' },
  ];

  static readonly periodicidadImpuesto: Dominio[] = [
    { id: 1, valor: 'CA', descripcion: 'Cada año' },
    { id: 2, valor: 'CSM', descripcion: 'Cada Seis Meses' },
    { id: 3, valor: 'U', descripcion: 'Una vez' },
  ];
}

export abstract class DataToken {
  static readonly tokenUser = [
    {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTYyMTI3NDQ3MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjQ4MWJkNzk2LTliZjMtNGQ3Ni1iMjkzLWUyMGVmOWNlMGEwNCIsImVtYWlsIjoidXN1YXJpb0BnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyQXBwIn0.zJzXOpLE8Cr_YRhO21Yt_L2_xnnHYxMRWrO4UivcPzo',
      token_type: 'bearer',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF0aSI6IjQ4MWJkNzk2LTliZjMtNGQ3Ni1iMjkzLWUyMGVmOWNlMGEwNCIsImV4cCI6MTYyMTI3NDQ3MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI2ZjVjM2VkLTZhNDktNDlmNC1hZTVjLTY2N2YyMDJmNTZiOCIsImVtYWlsIjoidXN1YXJpb0BnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyQXBwIn0.m7VFCB5K9yy_85FYUu2rmNPF1RHwcyzzQ1vr1NbV4z8',
      expires_in: 3599,
      scope: 'read write',
      email: 'usuario@gmail.com',
      jti: '481bd796-9bf3-4d76-b293-e20ef9ce0a04',
      username: 'user',
      password: '1234',
    },
    {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2MjEyNzQ2MTMsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiOTFjZTczODEtZmEzNC00MDUzLTlkZTctNDlmOWQwNWMwZTlhIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyQXBwIn0.u4zGM84w123sJqmxzW7mUREJQd7PlC6GW9iLfXU-rFU',
      token_type: 'bearer',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiI5MWNlNzM4MS1mYTM0LTQwNTMtOWRlNy00OWY5ZDA1YzBlOWEiLCJleHAiOjE2MjEyNzQ2MTMsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiYmVhZmY5YjEtNTlhMS00NTdmLWFiY2ItZDI0MTRkMDMxNGU5IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhbmd1bGFyQXBwIn0.kBCJs54BT9F3hd22Y9oIAJEXTjn8-TwEL2rf2VwgJLw',
      expires_in: 3599,
      scope: 'read write',
      email: 'admin@gmail.com',
      jti: '91ce7381-fa34-4053-9de7-49f9d05c0e9a',
      username: 'admin',
      password: '5678',
    },
  ];
}

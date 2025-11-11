export interface School {
  id: string;
  name: string;
  address: string;
  classesCount?: number;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  year: string;
}

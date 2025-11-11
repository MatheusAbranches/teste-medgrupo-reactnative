import { createServer, Model, Response, Server } from 'miragejs';

export function makeServer(): Server {
  return createServer({
    models: {
      school: Model,
      class: Model,
    },

    seeds(server) {
      server.create('school', { id: '1', name: 'Escola Municipal João Silva', address: 'Rua das Flores, 123' });
      server.create('school', { id: '2', name: 'Escola Estadual Maria Santos', address: 'Av. Principal, 456' });
      server.create('school', { id: '3', name: 'Escola Municipal Pedro Álvares', address: 'Rua do Comércio, 789' });
      server.create('school', { id: '4', name: 'Colégio Estadual Dom Pedro II', address: 'Av. Brasil, 1010' });
      server.create('school', { id: '5', name: 'Escola Municipal Ana Costa', address: 'Rua São José, 250' });
      server.create('school', { id: '6', name: 'Escola Estadual Santos Dumont', address: 'Av. Independência, 567' });
      server.create('school', { id: '7', name: 'Escola Municipal Vila Nova', address: 'Rua das Acácias, 88' });
      server.create('school', { id: '8', name: 'Colégio Estadual Tiradentes', address: 'Av. Central, 333' });

      server.create('class', { id: '1', schoolId: '1', name: '5º Ano A', shift: 'Manhã', year: '2025' });
      server.create('class', { id: '2', schoolId: '1', name: '6º Ano B', shift: 'Tarde', year: '2025' });
      server.create('class', { id: '3', schoolId: '2', name: '7º Ano A', shift: 'Manhã', year: '2025' });
      server.create('class', { id: '4', schoolId: '3', name: '8º Ano C', shift: 'Noite', year: '2025' });
      server.create('class', { id: '5', schoolId: '3', name: '9º Ano A', shift: 'Tarde', year: '2025' });
      server.create('class', { id: '6', schoolId: '4', name: '1º Ano A', shift: 'Manhã', year: '2025' });
      server.create('class', { id: '7', schoolId: '5', name: '2º Ano B', shift: 'Tarde', year: '2025' });
      server.create('class', { id: '8', schoolId: '6', name: '3º Ano A', shift: 'Manhã', year: '2025' });
      server.create('class', { id: '9', schoolId: '7', name: '4º Ano B', shift: 'Tarde', year: '2025' });
      server.create('class', { id: '10', schoolId: '8', name: '5º Ano C', shift: 'Noite', year: '2025' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/schools', (schema) => {
        return schema.all('school');
      });

      this.get('/schools/:id', (schema, request) => {
        const id = request.params.id;
        return schema.find('school', id);
      });

      this.post('/schools', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('school', attrs);
      });

      this.put('/schools/:id', (schema, request): any => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const school = schema.find('school', id);
        return school ? school.update(attrs) : new Response(404);
      });

      this.delete('/schools/:id', (schema, request) => {
        const id = request.params.id;
        schema.find('school', id)?.destroy();
        return new Response(204);
      });

      this.get('/classes', (schema, request) => {
        const schoolId = request.queryParams.schoolId;
        if (schoolId) {
          return schema.where('class', (classItem: any) => classItem.schoolId === schoolId);
        }
        return schema.all('class');
      });

      this.get('/classes/:id', (schema, request) => {
        const id = request.params.id;
        return schema.find('class', id);
      });

      this.post('/classes', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('class', attrs);
      });

      this.put('/classes/:id', (schema, request): any => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const classItem = schema.find('class', id);
        return classItem ? classItem.update(attrs) : new Response(404);
      });

      this.delete('/classes/:id', (schema, request) => {
        const id = request.params.id;
        schema.find('class', id)?.destroy();
        return new Response(204);
      });
    },
  });
}

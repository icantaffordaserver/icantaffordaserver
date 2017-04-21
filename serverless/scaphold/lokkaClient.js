/**
 * Created by alexandermann on 2017-03-05.
 */
import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

// outdated
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg1NzgzNDYsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.Rt8sUyF4vF8_Ya21fbzDC22RU8NJ5cLrWjI6KAtaPbg';

// outdated
export default new Lokka({
  transport: new Transport('https://us-west-2.api.scaphold.io/graphql/shift-beta', {
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
  }),
});


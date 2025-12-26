const assert = require('assert');
const { expect } = require('chai');

describe('Fitur Login', () => {

  //  GET Request
  it('GET API Home', async () => {
    const response = await fetch('https://belajar-bareng.onrender.com/');

    const data = await response.text();

    // Assert 1: Status code
    expect(response.status).to.equal(200);

    // Assert 2: Response body
    expect(data).to.not.be.empty;
  });

  //  POST Login - Positive Case
  it('Ensure success login', async () => {
    const response = await fetch(
      'https://belajar-bareng.onrender.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin',
        }),
      }
    );

    const data = await response.json();

    // Assert 1: Status code
    expect(response.status).to.equal(200);

    // Assert 2: Response body
    expect(data).to.have.property('token');
  });

  //  POST Login - Negative Case
  it('Ensure failed login', async () => {
    const response = await fetch(
      'https://belajar-bareng.onrender.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'salahpassword',
        }),
      }
    );

    const data = await response.json();

    // Assert 1: Status code
    expect(response.status).to.equal(401);

    // Assert 2: Response body
    expect(data).to.have.property('message');
  });

});

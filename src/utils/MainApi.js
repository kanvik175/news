class MainApi {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async signup(email, password, name) {
    console.log(email, password, name);
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.status);
    }
  }

  async signin(email, password) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return await response.json();
  }
}

export default MainApi;

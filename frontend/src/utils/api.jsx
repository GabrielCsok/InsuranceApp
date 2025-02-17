import { useLoaderData } from "react-router-dom";

const BASE_URL = 'http://localhost:8080/api';

export async function initializeCsrf() {
    try {
        const response = await fetch(`${BASE_URL}/csrf`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('CSRF token request failed');
        }

        // Wait for the browser to store the cookie
        await new Promise(resolve => setTimeout(resolve, 500));

        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (!csrfToken) {
            throw new Error('CSRF token not found in cookies');
        }

        console.log('CSRF token fetched:', csrfToken);
        return csrfToken;
    } catch (err) {
        console.error('CSRF initialization failed:', err);
        throw err;
    }
}
  

export async function apiGet(endpoint) {

    const url = `${BASE_URL}/${endpoint}`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

   if (!response.ok) {
    throw new Error (`Failed to fetch: ${response.status}`);
   }

   return response.json();
}

export async function apiPost(endpoint, data) {
    const url = `${BASE_URL}${endpoint}`;
    console.log("Making API call to:", url);

    let csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (!csrfToken) {
        console.log('Fetching CSRF token...');
        csrfToken = await initializeCsrf();
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API error:", errorMessage);
        throw new Error(`Failed to create data: ${errorMessage}`);
    }

    return await response.json();
}


export async function apiPut(endpoint, data) {

    const url = `${BASE_URL}/${endpoint}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update');
    }

    return response.json();
}

export async function apiDelete(endpoint) {

    const url = `${BASE_URL}/${endpoint}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete');
    }

    return response.json();
}

export async function apiFormPost(endpoint, data) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN": csrfToken
      },
      body: formData.toString(),
      credentials: "include", // For cookies/session
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit form");
    }
    return response.json();
  }
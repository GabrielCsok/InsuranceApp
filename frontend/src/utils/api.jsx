// Base URL for all API endpoints
const BASE_URL = 'http://localhost:8080/api';

/**
 * initializeCsrf
 * Fetches the CSRF token from the API and extracts it from the document cookies.
 *
 * @returns {Promise<string>} The CSRF token.
 * @throws {Error} If the request fails or the token cannot be found.
 */
export async function initializeCsrf() {
    // Send a GET request to the /csrf endpoint with credentials included.
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
 
        // Wait briefly to allow the token to be set in cookies.
        await new Promise(resolve => setTimeout(resolve, 500));

        // Extract the CSRF token from the cookies.
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
  
/**
 * apiGet
 * Performs a GET request to the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch (should start with a slash).
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {Error} If the response is not successful.
 */
export async function apiGet(endpoint) {

    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

   if (!response.ok) {
    throw new Error (`Failed to fetch: ${response.status}`);
   }

   return response.json();
}

/**
 * apiPost
 * Performs a POST request to the specified API endpoint with JSON data.
 *
 * @param {string} endpoint - The API endpoint (should start with a slash).
 * @param {object} data - The data to send in the request body.
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {Error} If the request fails.
 */
export async function apiPost(endpoint, data) {
    const url = `${BASE_URL}${endpoint}`;
    console.log("Making API call to:", url);

    // Try to extract the CSRF token from cookies.
    let csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    // If no token is found, initialize CSRF.
    if (!csrfToken) {
        console.log('Fetching CSRF token...');
        csrfToken = await initializeCsrf();
    }

    // Send POST request with JSON body and CSRF header.
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

/**
 * apiPut
 * Performs a PUT request to update data at the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint (should start with a slash).
 * @param {object} data - The data to update.
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {Error} If the update fails.
 */
export async function apiPut(endpoint, data) {

    const url = `${BASE_URL}${endpoint}`;

    // Try to extract the CSRF token from cookies.
    let csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    // Initialize CSRF if token not found.
    if (!csrfToken) {
        csrfToken = await initializeCsrf();
    }

    // Send PUT request with JSON data.
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to update');
    }

    return response.json();
}

/**
 * apiDelete
 * Performs a DELETE request to remove data from the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint (should start with a slash).
 * @returns {Promise<any>} The parsed JSON response or an empty object if no response.
 * @throws {Error} If the deletion fails.
 */
export async function apiDelete(endpoint) {

    const url = `${BASE_URL}${endpoint}`;

    // Extract CSRF token from cookies.
    let csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    // Initialize CSRF if token is not available.
    if (!csrfToken) {
        csrfToken = await initializeCsrf();
    }

    // Send DELETE request with CSRF header.
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to delete');
    }

    // Try to parse response as JSON, or return an empty object if no content.
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}

/**
 * apiFormPost
 * Performs a POST request to submit form data (URL-encoded) to the specified endpoint.
 *
 * @param {string} endpoint - The API endpoint (should start with a slash).
 * @param {object} data - The form data to be sent.
 * @returns {Promise<any>} The parsed JSON response.
 * @throws {Error} If the form submission fails.
 */
export async function apiFormPost(endpoint, data) {
    // Convert the data object into URL-encoded form data.
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Extract the CSRF token from cookies
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
  
    // Send POST request with URL-encoded data.
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XSRF-TOKEN": csrfToken
      },
      body: formData.toString(),
      credentials: "include", 
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit form");
    }
    return response.json();
  }
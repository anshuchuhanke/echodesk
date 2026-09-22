const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api"
).replace(/\/+$/, "");


export async function getOrder(orderId, token) {
  const response = await fetch(
    `${API_URL}/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Order not found");
  }

  return response.json();
}
export async function getRefund(orderId, token) {
  const response = await fetch(
    `${API_URL}/refunds/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Refund not found");
  }

  return response.json();
}
export async function checkReturnEligibility(orderId, token) {
  const response = await fetch(
    `${API_URL}/returns/eligibility/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not check return eligibility");
  }

  return response.json();
}

export async function createReturnRequest(data, token) {
  const response = await fetch(`${API_URL}/returns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Could not create return request");
  }

  return response.json();
}
export async function getTickets(token) {
  const response = await fetch(
    `${API_URL}/support/tickets/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch tickets");
  }

  return response.json();
}
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function askAI(message, token, history = []) {
  const response = await fetch(
    `${API_URL}/support/tickets/ai`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        history,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Could not get AI response"
    );
  }

  return data;
}
export async function createAIReturnRequest(
  orderId,
  productId,
  reason,
  token
) {
  const response = await fetch(
    `${API_URL}/returns`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        productId,
        reason,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Could not create return request"
    );
  }

  return data;
}
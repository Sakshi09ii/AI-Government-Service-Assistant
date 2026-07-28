export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data);

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        response: "Unable to connect to AI server."
      },
      {
        status: 500
      }
    );
  }
}
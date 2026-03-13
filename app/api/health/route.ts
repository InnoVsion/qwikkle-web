// Health check endpoint — used by Docker and load balancers
export async function GET(): Promise<Response> {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

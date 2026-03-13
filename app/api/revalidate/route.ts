// TODO: Implement on-demand ISR revalidation triggered by Go backend after CMS saves
// Verify REVALIDATION_SECRET header before calling revalidatePath()
export async function POST(): Promise<Response> {
  // TODO: Validate secret, call revalidatePath(path), return 200
  return Response.json({ revalidated: false, message: 'Not implemented' }, { status: 501 });
}

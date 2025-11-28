import { VERIFY_ENDPOINT } from "../endpoints";
import { verifyResponseSchema, type VerifyResponse } from "../schema";

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function verifyUser(userId: string): Promise<VerifyResponse> {
  const endpoint = VERIFY_ENDPOINT;

  try {
    const fd = new FormData();
    fd.append("userId", userId);
    fd.append("phase", String(2));
    fd.append("country", "CZ");
    const response = await fetch(endpoint, {
      method: "POST",
      body: fd,
    });

    const result = verifyResponseSchema.safeParse(response);

    return result;
  } catch (error) {
    throw new Error("Check failed");
  }
}

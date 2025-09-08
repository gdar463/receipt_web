import { httpGet } from "../wrapper";

export type Body = {
  data: string;
  mime: string;
};

export async function apiGetScan(data: {
  id: string;
  token: string;
}): Promise<Body> {
  const res = await httpGet(`/receipt/${data.id}/component/scan`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return {
    data: await res.text(),
    mime: res.headers.get("Content-Type")!,
  };
}

import type { ReceiptComponent } from "@s/components";

export type Receipt = {
  id: string;
  name: string;
  components: ReceiptComponent[];
  createdAt: Date;
  updatedAt: Date;
};

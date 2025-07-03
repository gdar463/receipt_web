import { type Config } from "prettier";

const config: Config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^(bun|path|os|sys|stream)",
    "<THIRD_PARTY_MODULES>",
    "^@/.*",
    "^../",
    "^./",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;

const fs = require("fs");
const path = require("path");

const featureName = process.argv[2];

if (!featureName) {
  console.error(
    "❌ Please provide a feature name: npm run add-feature -- <feature-name>",
  );
  process.exit(1);
}

const baseDir = path.resolve(__dirname, "..", "features", featureName);
const storeDir = path.join(baseDir, "store");
const componentsDir = path.join(baseDir, "components");

const files = [
  {
    path: path.join(storeDir, "slice.ts"),
    content: `import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const ${featureName}Slice = createSlice({
  name: "${featureName}",
  initialState,
  reducers: {},
});

export default ${featureName}Slice.reducer;
export const {} = ${featureName}Slice.actions;
`,
  },
  {
    path: path.join(storeDir, "types.ts"),
    content: `// Define types related to ${featureName} feature here

export interface ${capitalize(featureName)} {
  // example: data: string;
}
`,
  },
  {
    path: path.join(storeDir, "selector.ts"),
    content: `import type { RootState } from "@/store";

import { ${featureName}Api } from "./api";

export const select${capitalize(featureName)} = (state: RootState) => state.${featureName};
export const select${capitalize(featureName)}Api = (state: RootState) => state[${featureName}Api.reducerPath];
`,
  },
  {
    path: path.join(storeDir, "api.ts"),
    content: `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ${capitalize(featureName)} } from "./types";

export const ${featureName}Api = createApi({
  reducerPath: "${featureName}Api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // example endpoint
    getExample: builder.query<${capitalize(featureName)}, void>({
      query: () => "/${featureName}",
    }),
  }),
});

export const { useGetExampleQuery } = ${featureName}Api;
`,
  },
  {
    path: path.join(componentsDir, `${capitalize(featureName)}.tsx`),
    content: `import React from "react";

import { View, Text } from "react-native";

const ${capitalize(featureName)} = () => {
  return (
    <View>
      <Text>${capitalize(featureName)} Component</Text>
    </View>
  );
};

export default ${capitalize(featureName)};
`,
  },
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createTemplate() {
  // Create directories
  [baseDir, storeDir, componentsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Write files
  files.forEach((file) => {
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content, "utf8");
      console.log(`✅ Created ${file.path}`);
    } else {
      console.warn(`⚠️ File already exists: ${file.path}`);
    }
  });
}

createTemplate();

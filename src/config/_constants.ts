export type Capabilities =
  | "manage-everything"
  | "manage-users"
  | "manage-roles"
  | "manage-pages";

interface Capability {
  name: Capabilities;
  description: string;
}

const _constants: {
  capabilities: Capability[];
} = {
  capabilities: [
    {
      name: "manage-everything",
      description: "Can manage everything",
    },
    {
      name: "manage-users",
      description: "Can manage users",
    },
    {
      name: "manage-roles",
      description: "Can manage roles",
    },
    {
      name: "manage-pages",
      description: "Can manage pages",
    },
  ],
};

export default _constants;

import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { toast } from "~modules-core/toast";

export const Home = () => {
  return (
    <div>
      Dashboard home page{" "}
      <Button
        onClick={() => signOut()}
      >
        logout
      </Button>
    </div>
  );
};

import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
// import unAuthorized from "./401";

export default function Test() {
  const session = useSession();

  // useEffect(() => {
  //   console.log("1", session);
  // }, [session]);
  if (session.status === "authenticated")
    return (
      <>
        <h2>
          Halo {session.data.user.name}{" "}
          <a
            href=""
            className="text-primary"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </a>
        </h2>
      </>
    );
  else if (session.status === "unauthenticated") return Router.replace("/401");
}

import { BsHammer, BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div>{session ? User(session) : Guest()}</div>
    </>
  );
}

function Guest() {
  return (
    <>
      <div className="container mx-auto py-5">
        <h1 className="text-4xl text-center text-indigo-800 font-bold py-16">
          HomePage{" "}
          <span className="text-2xl text-indigo-400">
            <br></br>Guest User
          </span>
        </h1>
        <div className="flex justify-center">
          <Link legacyBehavior href={"/login"}>
            <a className="text-center bg-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-500 hover:text-slate-100">
              Sign In
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

function User({ ...session }) {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl text-center text-indigo-800 font-bold py-16">
        Profile Page{" "}
        <span className="text-2xl text-indigo-400">
          <br></br>User
        </span>
      </h1>

      <div className="text-center">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className="flex justify-center">
        <button onClick={signOut} className="py-2 px-2 rounded-sm">
          Sign Out
        </button>
      </div>
      <div className="flex justify-center">
        <Link legacyBehavior href={"/profile"}>
          <a className="text-center bg-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-500 hover:text-slate-100">
            Profile
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

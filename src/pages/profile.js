import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="container mx-auto py-16">
      <h5 className="text-center text-indigo-800">Profile Page</h5>

      <p className="text-center">
        {" "}
        <Link legacyBehavior href="/" className="mx-auto">
          <a> HomePage</a>
        </Link>
      </p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession(req);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        parmanent: false,
      },
    };
  }
  return { session };
}

import { getAbout } from "@/lib/sanity.actions";
import AboutPageComponent from "./About";
import type { About } from "@/typings";

export const revalidate = 60; // ISR

export default async function AboutPage() {
  const about: About[] = await getAbout();

  return <AboutPageComponent about={about} />;
}
// import React from "react";

// export default function About() {
//   return (
//     <div>
//       <h1>About</h1>
//     </div>
//   );
// }

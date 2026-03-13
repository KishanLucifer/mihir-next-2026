// import Link from "next/link";
// import React from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Logo from "../public/logo/logo2.png";

// export default function LogoComponent() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   // don't render the header at all inside Sanity Studio
//   if (pathname?.startsWith("/studio")) {
//     return null;
//   }
//   return (
//     <>
//       <Link href="/" className="group flex items-center gap-2 z-50">
//         {/* hide the logo on the about page (header still present with nav links) */}
//         {pathname !== "/about" && (
//           <div className="relative flex items-center justify-center rounded-full text-background overflow-hidden transition-transform group-hover:scale-105">
//             <Image src={Logo} alt="Logo" className="w-18 h-18" />
//           </div>
//         )}
//         {/* <span
//           className={cn(
//             "text-2xl font-display font-bold tracking-tight transition-colors",
//             isScrolled ? "text-foreground" : "text-black",
//           )}></span> */}
//       </Link>
//     </>
//   );
// }

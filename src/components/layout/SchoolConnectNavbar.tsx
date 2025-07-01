import Image from "next/image";
import { Button } from "../ui/button";

const SchoolConnectNavbar = () => (
  <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm fixed top-0 left-0 z-50 border-b border-gray-100">
    <div className="flex items-center gap-2">
      <Image src="/trademarks/wordmark-dark.svg" alt="Logo" width={36} height={36} />
    </div>
    <div className="flex items-center gap-4">
      <Button variant="outline" className="flex items-center gap-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-medium shadow-sm border-0 focus:border-0 active:border-0 hover:border-0 ring-0 focus:ring-0 active:ring-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H9m0 0l3-3m-3 3l3 3" />
        </svg>
        Logout
      </Button>
    </div>
  </nav>
);

export default SchoolConnectNavbar; 
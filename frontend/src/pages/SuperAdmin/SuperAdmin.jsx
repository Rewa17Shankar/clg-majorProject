
// import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
// import SuperAdminDashboard from "./SuperAdminDashboard";

// const SuperAdmin = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       {/* When not logged in → Show Clerk SignIn */}
//       <SignedOut>
//         <SignIn routing="path" path="/admin" />
//       </SignedOut>

//       {/* When logged in → Go straight to SuperAdminDashboard */}
//       <SignedIn>
//         <SuperAdminDashboard />
//       </SignedIn>
//     </div>
//   );
// };

// export default SuperAdmin;



import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SuperAdminDashboard from "./SuperAdminDashboard";

const SuperAdmin = () => {
  return (
    <>
      {/* When not logged in → Show Clerk SignIn with dark theme */}
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="w-full max-w-md">
            <SignIn 
              routing="path" 
              path="/admin"
              forceRedirectUrl="/admin"
              fallbackRedirectUrl="/admin"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-xl",
                }
              }}
            />
          </div>
        </div>
      </SignedOut>

      {/* When logged in → Go straight to SuperAdminDashboard */}
      <SignedIn>
        <SuperAdminDashboard />
      </SignedIn>
    </>
  );
};

export default SuperAdmin;

// "use client";
// import { redirect } from "next/navigation";

export function SuccessMessage() {
  //   location.href = "/accounts";
  // redirect("/accounts");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-opacity duration-500 ease-in-out">
      <div className="p-6 bg-black rounded-lg shadow-xl w-96">
        <p className="text-green-500 font-semibold text-center">
          Authorized Successfully, You will be redirected to dashboard.
        </p>
      </div>
    </div>
  );
}

export function FailedMessage({ error }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-opacity duration-500 ease-in-out">
      <div className="p-6 bg-[#fc042e] rounded-lg shadow-xl w-96">
        <p className="text-white font-semibold text-center">
          Authorized Failed. Please try again after some time.
        </p>
        <p className="text-white font-semibold text-center">{error}</p>
      </div>
    </div>
  );
}

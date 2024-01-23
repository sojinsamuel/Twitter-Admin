import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { table } from "console";
import { PlusIcon, Table } from "lucide-react";
import { columns } from "../accounts/columns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="py-24 bg-gray-100">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">All Accounts</h1>
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between mb-10">
            <Input
              placeholder="Search users..."
              className="max-w-sm border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />

            <Button variant="blue">
              <PlusIcon className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </div>
          {/* <p className="text-center">Loading...</p> */}
          <div className="flex justify-center items-center ">
            <div className="  shadow rounded-md space-y-5 p-4  mx-auto mb-6">
              {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className="animate-pulse mb-4">
                  <div className="flex space-x-4 mx-auto  w-full">
                    {[...Array(4)].map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className="w-40 h-11  bg-gray-300 rounded "
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        ​
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarClose } from "lucide-react";
import Link from "next/link";

const SHEET_SIDES = ["left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function Sidebar() {
  return (
    <>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            {/* <Button variant="outline">{side}</Button> */}
            {/* <SidebarClose
              height={30}
              width={30}
              className="cursor-pointer ml-10 mt-10"
            /> */}
            <Button variant="blue" className="relative top-14 left-11">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side={side} className="text-center ">
            <SheetHeader>
              <SheetTitle>Extra Settings</SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            <div className="grid gap-4 py-4 text-center  text-2xl mx-auto">
              <div className="hover:underline  mx-auto ">
                {/* <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                <Link href="/accounts">Home</Link>
              </div>
              <div className="hover:underline mx-auto ">
                {/* <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" /> */}
                <Link href="/replies">Replies</Link>
              </div>
            </div>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
}

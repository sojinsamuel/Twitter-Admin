"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Power, HeartIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowUpDown,
  Copy,
  Link as LinkICON,
} from "lucide-react";
import {
  deleteRecord,
  updateKeywords,
  manageCron,
  toggleMode,
  updateConfig,
  toggleLikeAndRetweetMode,
} from "./action";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export type Account = {
  method: string;
  screen_name: string;
  active: string;
  user_id: string;
  activity: string;
  keyword: string;
  State: string;
  undressai_mode: boolean;
  configuration: string;
  like_and_retweet: boolean;
};

export const columns: ColumnDef<Account>[] = [
  // {
  //   accessorKey: "undressai_mode",
  //   header: "Undressai Mode",
  //   cell: function Cell({ row }) {
  //     const [isPressed, setIsPressed] = useState(false);
  //     const handleToggleChange = () => {
  //       setIsPressed((prev) => !prev);
  //       const res = toggleMode(
  //         row.original.screen_name,
  //         row.original.undressai_mode === true ? false : true
  //       );
  //       console.log(res);
  //     };
  //     return (
  //       <Toggle
  //         size="lg"
  //         aria-label="Toggle bold "
  //         pressed={isPressed}
  //         onPressedChange={handleToggleChange}
  //       >
  //         {/* {JSON.stringify(row.original.undressai_mode)} */}
  //         <Power
  //           className="text-center"
  //           color={`${row.original.undressai_mode ? "green" : "red"}`}
  //           // size={24}
  //         />
  //       </Toggle>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "like_and_retweet",
  //   header: "Like & Retweet",
  //   cell: function Cell({ row }) {
  //     const [isPressed, setIsPressed] = useState(false);
  //     const handleToggleChange = () => {
  //       setIsPressed((prev) => !prev);
  //       const res = toggleLikeAndRetweetMode(
  //         row.original.screen_name,
  //         row.original.like_and_retweet === true ? false : true
  //       );
  //       console.log(res);
  //     };
  //     return (
  //       <Toggle
  //         size="lg"
  //         aria-label="Toggle bold "
  //         pressed={isPressed}
  //         onPressedChange={handleToggleChange}
  //       >
  //         {/* {JSON.stringify(row.original.undressai_mode)} */}
  //         <HeartIcon
  //           className="text-center"
  //           color={`${row.original.like_and_retweet ? "green" : "red"}`}
  //           // size={24}
  //         />
  //       </Toggle>
  //     );
  //   },
  // },
  {
    accessorKey: "screen_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.screen_name;
      return (
        <span className="font-medium flex  items-center">
          {name} &nbsp;
          <Link
            target="_blank"
            href={`https://twitter.com/${name}/with_replies`}
          >
            <LinkICON className="h-4 w-4" color="blue" />
          </Link>
        </span>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const isTrue = row.getValue("active");
      const status = isTrue ? "Active" : "Inactive";
      return <span className="font-medium">{status}</span>;
    },
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: ({ row }) => {
      const account = row.original;
      // const formattedDate = date.toLocaleDateString();
      return <span className="font-medium">{account.activity}</span>;
    },
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: function Cell({ row }) {
      const account = row.original;
      const [addKeyword, setAddKeyword] = useState(false);
      const [keyword, setKeyword] = useState(account?.keyword || "");

      const handleSaveKeyword = async () => {
        if (keyword.trim() === "") return;
        // console.log(keyword, "Keyword saved for", account.screen_name);
        await updateKeywords(account.screen_name, keyword);
        setAddKeyword(false);
      };

      return (
        <>
          <Button
            variant="black"
            className=""
            onClick={() => setAddKeyword(true)}
          >
            Update keyword
          </Button>
          <Dialog open={addKeyword} onOpenChange={setAddKeyword}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Target keyword for{" "}
                  <span className="text-blue-500">@{account.screen_name}</span>
                </DialogTitle>
                {/* <DialogDescription>
                  Only one keyword is allowed per account 
                </DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    keyword
                  </Label>
                  <Input
                    id="username"
                    // defaultValue="Onlyfans"
                    className="col-span-3"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="eg: memes"
                    value={keyword}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveKeyword} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "configuration",
    header: "Configuration",
    cell: function Cell({ row }) {
      const account = row.original;
      const [addConfig, setAddConfig] = useState(false);
      const [config, setConfig] = useState(account?.configuration || "");

      const handleSaveConfig = async () => {
        if (config.trim() === "") return;
        // console.log(keyword, "Keyword saved for", account.screen_name);
        await updateConfig(account.screen_name, config);
        setAddConfig(false);
      };

      return (
        <>
          <Button
            variant="black"
            className=""
            onClick={() => setAddConfig(true)}
          >
            Update Config
          </Button>
          <Dialog open={addConfig} onOpenChange={setAddConfig}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Target config for{" "}
                  <span className="text-blue-500">@{account.screen_name}</span>
                </DialogTitle>
                {/* <DialogDescription>
                  Only one keyword is allowed per account 
                </DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4 ">
                  {/* <Label htmlFor="username" className="text-right">
                    Configuration
                  </Label> */}
                  <Textarea
                    className="w-[360px] h-[120px]"
                    placeholder="Type your message or rules here in bullet points."
                    onChange={(e) => setConfig(e.target.value)}
                    value={config}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveConfig} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },

  {
    id: "actions",
    cell: function Cell({ row }) {
      const account = row.original;
      // const router = useRouter();
      const state = account.State;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border border-gray-300 shadow-lg rounded-md p-2"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(account.user_id)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy user id
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}

            <DropdownMenuItem
              className=""
              onClick={async () => {
                await manageCron(
                  account.screen_name,
                  state === "ENABLED" ? "DISABLED" : "ENABLED"
                );
              }}
            >
              {state === "ENABLED" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await deleteRecord(account.screen_name);
                // router.refresh();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

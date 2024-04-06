import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@/components/ui/card";

function getCurrentMonthName() {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[currentDate.getMonth()];
}

export default function Stats({
  username,
  replies,
  yesterday,
  total,
}: {
  username: string;
  replies: number;
  yesterday: number;
  total: number;
}) {
  return (
    <Card className="w-full max-w-4xl mx-auto -mt-7 rounded-md">
      <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4">
        <div className="space-y-1 text-center md:text-left">
          <CardTitle className="text-2xl">{replies}</CardTitle>
          <CardDescription className="text-sm">Today</CardDescription>
        </div>
        <div className="border border-t-0 border-gray-200 rounded-full w-full max-w-xs dark:border-gray-800 md:hidden" />
        <div className="space-y-1 mt-4 text-center md:mt-0 md:text-left md:ml-auto md:pl-4 md:space-y-0">
          <CardTitle className="text-2xl">{yesterday}</CardTitle>
          <CardDescription className="text-sm">Yesterday</CardDescription>
        </div>
        <div className="border border-t-0 border-gray-200 rounded-full w-full max-w-xs dark:border-gray-800 md:hidden" />
        <div className="space-y-1 mt-4 text-center md:mt-0 md:text-left md:ml-auto md:pl-4 md:space-y-0">
          <CardTitle className="text-2xl">{total}</CardTitle>
          <CardDescription className="text-sm">Total Replies</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

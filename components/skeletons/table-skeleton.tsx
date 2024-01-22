import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTableSkeleton() {
  const headerSkeletonStyles = "border-b dark:border-gray-700";
  const cellSkeletonStyles = "border-b dark:border-gray-700";

  return (
    <div>
      {/* Filter */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="max-w-sm h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Skeleton headers */}
              {Array.from({ length: 3 }).map((_, index) => (
                <TableHead key={index} className={headerSkeletonStyles}>
                  <Skeleton className="w-full h-8" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex} className={cellSkeletonStyles}>
                {/* Skeleton cells */}
                {Array.from({ length: 3 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="w-full h-8" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
    </div>
  );
}

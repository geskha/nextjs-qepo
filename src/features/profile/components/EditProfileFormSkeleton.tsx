import { Skeleton } from "../../../components/ui/skeleton";

export function EditProfileFormSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-[100px] w-[500px]" />
      </div>
    </div>
  );
}

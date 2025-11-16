import { useForm } from "react-hook-form";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useRef } from "react";
import { Camera } from "lucide-react";
import { api } from "../../../utils/api";
import { EditProfileFormSchema } from "../forms/edit-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import EditProfileFormInner from "../components/EditProfileFormInner";
import { EditProfileFormSkeleton } from "../components/EditProfileFormSkeleton";
import { AuthRoute } from "../../../components/layout/AuthRoute";

export const ProfilePage = () => {
  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  return (
    <AuthRoute>
      <PageContainer>
        <SectionContainer padded minFullscreen className="gap-y-6 py-8">
          <h1 className="text-3xl font-semibold">Profile Setting</h1>
          <Card>
            <CardContent className="flex gap-6 pt-6">
              <div className="flex flex-col gap-2">
                <Avatar className="size-24">
                  <AvatarFallback>VF</AvatarFallback>
                  <AvatarImage />
                </Avatar>
                <div className="relative">
                  <Button
                    className="absolute bottom-0 right-0 h-8 w-8"
                    onClick={handleOpenFileExplorer}
                  >
                    <Camera />
                  </Button>
                </div>
                <input type="file" ref={inputFileRef} className="hidden" />
              </div>

              <div className="grid flex-1 grid-cols-2 gap-y-4">
                {getProfileData ? (
                  <EditProfileFormInner
                    defaultValues={{
                      bio: getProfileData?.bio,
                      username: getProfileData?.username,
                    }}
                  />
                ) : (
                  <EditProfileFormSkeleton />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex w-full justify-end">
            <Button>Simpan</Button>
          </div>
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default ProfilePage;

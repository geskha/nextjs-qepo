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
import {
  type ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Camera } from "lucide-react";
import { api } from "../../../utils/api";
import {
  EditProfileFormSchema,
  editProfileFormSchema,
} from "../forms/edit-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import EditProfileFormInner from "../components/EditProfileFormInner";
import { EditProfileFormSkeleton } from "../components/EditProfileFormSkeleton";
import { AuthRoute } from "../../../components/layout/AuthRoute";
import { toast } from "sonner";
import { error } from "console";
import { TRPCError } from "@trpc/server";
import { TRPCClientError } from "@trpc/client";
import { objectUtil } from "zod";

export const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | undefined | null>(
    null,
  );

  const apiUtils = api.useUtils();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
  });

  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const updateProfile = api.profile.upadteProfil.useMutation({
    onSuccess: ({ bio, username }) => {
      form.reset({ bio: bio ?? "", username }, { keepDirtyValues: false });
      toast.success("Berhasil update profile");
    },
    onError: (err) => {
      if (err instanceof TRPCClientError) {
        if (err.message == "USERNAME_USED") {
          form.setError("username", { message: "Username sudah digunakan" });
        }
      }
    },
  });
  const updateProfilePicture = api.profile.updateProfilePicture.useMutation({
    onSuccess: async () => {
      toast.success("Profile berhasil diubah");
      setSelectedImage(undefined);
      await apiUtils.profile.getProfile.invalidate();
    },
    onError: async () => {
      toast.error("Gagal merubah profile");
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfileSubmit = (values: EditProfileFormSchema) => {
    const payload: {
      username?: string;
      bio?: string;
    } = {};

    if (values.username !== getProfileData?.username) {
      payload.username = values.username;
    }

    if (values.bio !== getProfileData?.bio) {
      payload.bio = values.bio;
    }

    updateProfile.mutate({ ...payload });
  };

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const handleRemovePreviewImage = () => {
    setSelectedImage(null);
  };

  const onPickProfilePicture: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0] ?? undefined);
    }
  };

  const handleUpdateProfilePicture = async () => {
    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        const imageBase64 = result.substring(result.indexOf(",") + 1);

        updateProfilePicture.mutate(imageBase64);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const selectedImageProvilePreview: string | undefined = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (getProfileData) {
      form.setValue("username", getProfileData.username ?? "");
      form.setValue("bio", getProfileData.bio ?? "");
    }
  }, [getProfileData]);

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
                  <AvatarImage
                    src={
                      selectedImageProvilePreview ??
                      getProfileData?.profilePictureUrl ??
                      undefined
                    }
                  />
                </Avatar>
                <div className="relative">
                  <Button
                    className="absolute bottom-0 right-0 h-8 w-8"
                    onClick={handleOpenFileExplorer}
                  >
                    <Camera />
                  </Button>
                </div>

                {!!selectedImageProvilePreview && (
                  <>
                    <Button
                      onClick={handleRemovePreviewImage}
                      size="sm"
                      variant="destructive"
                      className="mt-5"
                    >
                      Hapus
                    </Button>
                    <Button size="sm" onClick={handleUpdateProfilePicture}>
                      Simpan
                    </Button>
                  </>
                )}

                <input
                  accept="image/*"
                  onChange={onPickProfilePicture}
                  type="file"
                  ref={inputFileRef}
                  className="hidden"
                />
              </div>

              <div className="grid flex-1 grid-cols-2 gap-y-4">
                {getProfileData ? (
                  <Form {...form}>
                    <EditProfileFormInner
                      defaultValues={{
                        bio: getProfileData.bio,
                        username: getProfileData.username,
                      }}
                    />
                  </Form>
                ) : (
                  <EditProfileFormSkeleton />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex w-full justify-end">
            <Button
              disabled={!form.formState.isDirty}
              onClick={form.handleSubmit(handleUpdateProfileSubmit)}
            >
              Simpan
            </Button>
          </div>
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default ProfilePage;

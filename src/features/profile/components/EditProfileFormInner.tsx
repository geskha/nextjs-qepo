import { useForm, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { type EditProfileFormSchema } from "../forms/edit-profile";

type EditProfileFormInnerProps = {
  defaultValues: {
    username?: string;
    bio?: string | null;
  };
};

export const EditProfileFormInner = (props: EditProfileFormInnerProps) => {
  const form = useForm<EditProfileFormSchema>({
    defaultValues: {
      username: props.defaultValues.username ?? "",
      bio: props.defaultValues.bio ?? "",
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Masukan username" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Masukan bio" rows={3} />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default EditProfileFormInner;

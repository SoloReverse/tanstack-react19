import {createFileRoute} from "@tanstack/react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {z} from "zod";
import {FormSchema} from "~/lib/(login)/formSchema";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {createServerFn} from "@tanstack/start";
import {useRef, useState} from "react";

const TestFunc = createServerFn({
  method: "POST",
})
  .validator((data) => {
    console.log(data);
    return {
      phonenumber: data,
    };
  })
  .handler<string>(async ({data}) => {
    console.log(`client submitted ${data.phonenumber}`);
    return `server sent ${data.phonenumber}`;
  });

export const Route = createFileRoute("/_layout/business/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const result = useState<string>("");

  return (
    <div className="flex items-center justify-center md:h-[900px] md:w-full md:align-middle">
      <div className="md:w-[450px] md:border md:border-neutral-800 md:px-6 md:py-4 md:dark:border-neutral-200">
        <div className="mt-6 border-t">
          <div className="px-6">
            <h1 className="font-khand text-3xl font-bold">Login</h1>
            <p className="font-supreme mt-2 font-normal tracking-tight text-neutral-400">
              Sign in to access your merchant page and start earning money.
            </p>
          </div>
          <Form {...form}>
            <form
              className="mt-4 px-6 pb-8 md:mt-12"
              ref={formRef}
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await TestFunc(new FormData(form.getValues()));
                console.log(result);
              }}
            >
              <FormField
                control={form.control}
                name="phonenumber"
                render={({field}) => (
                  <FormItem className="border-t-neutral-800 py-10 dark:border-t-neutral-200 md:border-t">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center gap-4">
                        <span className="py-3 font-mono text-lg font-semibold">+971</span>
                        <Input {...field} type="tel" className="font-mono" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the phone number you would like to be registered.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex justify-end"></div>
            </form>
          </Form>
          <Button
            onClick={form.handleSubmit(async (data) => {
              const result = await TestFunc({data: data.phonenumber});
              console.log(result);
            })}
            variant={"secondaryNoAnimation"}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

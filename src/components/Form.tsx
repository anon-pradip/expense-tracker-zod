import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name should be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof schema>;

import { FieldValues, useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 3,
            })}
          />

          {errors.name && (
            <Typography color="red" className="-mt-6 ml-2">
              {errors.name.message}
            </Typography>
          )}
          <Input
            type="number"
            size="lg"
            label="Age"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
          {errors.age && (
            <Typography color="red" className="-mt-6 ml-2">
              {errors.age.message}
            </Typography>
          )}
        </div>
        <Button disabled={!isValid} className="mt-6" fullWidth type="submit">
          Register
        </Button>
      </form>
    </Card>
  );
}

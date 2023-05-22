import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AccommodationType } from "@prisma/client";
import { api } from "~/utils/api";
import { type RouterInputs } from "~/utils/api";

const schema = z.object({
  name: z.string(),
  address: z.string(),
  location: z.string(),
  contact_number: z.string(),
  tags: z.string(),
  num_of_rooms: z.number(),
  is_archived: z.boolean(),
  fb_page: z.string().optional(),
  type: z.nativeEnum(AccommodationType),
});

export default function App() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createAccommodation = api.accommodation.add.useMutation();

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((d) =>
        createAccommodation.mutate(d as RouterInputs["accommodation"]["add"]),
      )}
      className="bg-black"
    >
      <input
        {...register("name")}
        className="w-[60%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
      />
      {errors.name?.message && <p>{errors.name?.message as string}</p>}
      <input {...register("address")} />
      {errors.address?.message && <p>{errors.address?.message as string}</p>}
      <input {...register("location")} />
      {errors.location?.message && <p>{errors.location?.message as string}</p>}
      <input {...register("contact_number")} />
      {errors.contact_number?.message && (
        <p>{errors.contact_number?.message as string}</p>
      )}
      <input {...register("tags")} />
      {errors.tags?.message && <p>{errors.tags?.message as string}</p>}
      <input {...register("fb_page")} />
      {errors.fb_page?.message && <p>{errors.fb_page?.message as string}</p>}
      <input type="checkbox" {...register("is_archived")} />
      {errors.is_archived?.message && (
        <p>{errors.is_archived?.message as string}</p>
      )}
      <input {...register("type")} />
      {errors.type?.message && <p>{errors.type?.message as string}</p>}
      <input
        type="number"
        {...register("num_of_rooms", { valueAsNumber: true })}
      />
      {errors.num_of_rooms?.message && (
        <p>{errors.num_of_rooms?.message as string}</p>
      )}
      <button type="submit">submit</button>
    </form>
  );
}

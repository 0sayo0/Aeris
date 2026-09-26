import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { COUNTRIES } from "@/features/weather/constants/countries";
import {
  type WeatherSearch,
  weatherSearchSchema,
} from "@/features/weather/schemas/weather-search.schema";

type WeatherSearchFormProps = {
  onSubmit: (search: WeatherSearch) => void;
};

const countryItems = COUNTRIES.map((country) => ({
  label: country.name,
  value: country.code,
}));

function WeatherSearchForm({ onSubmit }: WeatherSearchFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WeatherSearch>({
    resolver: zodResolver(weatherSearchSchema),
    defaultValues: {
      city: "",
      country: "",
    },
  });

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/16 p-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-sm backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/80 before:to-transparent sm:p-6"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.city)}>
          <FieldLabel
            htmlFor="city"
            className="text-md font-medium text-zinc-100"
          >
            Ciudad
          </FieldLabel>

          <Input
            id="city"
            placeholder="Ej. Ciudad de México"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            {...register("city")}
            className="h-11 rounded-xl border-white/60 bg-white/70 shadow-sm backdrop-blur-md placeholder:text-slate-500"
          />

          <div className="min-h-4">
            {errors.city && (
              <FieldError
                className="text-xs font-bold text-red-500"
                errors={[errors.city]}
              />
            )}
          </div>
        </Field>

        <Controller
          name="country"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="country"
                className="text-sm font-medium text-zinc-100"
              >
                País
              </FieldLabel>

              <Select
                items={countryItems}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="country"
                  aria-invalid={fieldState.invalid}
                  className="h-11 w-full rounded-xl border-white/60 bg-white/70 shadow-sm backdrop-blur-md"
                >
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>

                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="min-h-4">
                {fieldState.invalid && (
                  <FieldError
                    className="text-xs font-bold text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </div>
            </Field>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full cursor-pointer rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-950/20 transition-all hover:translate-x-0.5 hover:-translate-y-1 hover:bg-slate-800"
        >
          Consultar clima
        </Button>
      </FieldGroup>
    </form>
  );
}

export default WeatherSearchForm;

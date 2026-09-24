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
      className="space-y-6"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.city)}>
          <FieldLabel htmlFor="city">Ciudad</FieldLabel>

          <Input
            id="city"
            placeholder="Ej. Ciudad de México"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            {...register("city")}
          />

          {errors.city && <FieldError errors={[errors.city]} />}
        </Field>

        <Controller
          name="country"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="country">País</FieldLabel>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="country"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full">
          Consultar clima
        </Button>
      </FieldGroup>
    </form>
  );
}

export default WeatherSearchForm;

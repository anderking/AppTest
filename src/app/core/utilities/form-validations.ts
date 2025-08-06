import { UntypedFormGroup } from "@angular/forms";

export function isValidField(field: string, mainForm: UntypedFormGroup): boolean {
  return (mainForm.get(field)?.touched || mainForm.get(field)?.dirty) && !mainForm.get(field)?.valid;
}

export function getErrorMessageField(field: string, mainForm: UntypedFormGroup): string {
  console.log(mainForm.get(field));
  let message = "";
  if (mainForm.get(field).hasError("required")) {
    message = "Campo requerido";
  } else if (mainForm.get(field).hasError("pattern")) {
    message = "Campo inválido";
  } else if (mainForm.get(field).hasError("min")) {
    const min = mainForm.get(field)?.errors?.min?.requiredLength;
    message = "El valor debe ser mayor a 0";
  }
  return message;
}

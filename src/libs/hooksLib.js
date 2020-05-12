import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      console.log("event: ", event.target);
      setValues({
        ...fields,
        [event.target.name]: event.target.value,
      });
    },
  ];
}

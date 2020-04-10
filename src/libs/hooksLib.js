import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      console.log("use form event: ", event.target);
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}

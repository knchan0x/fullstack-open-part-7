import { useState, useEffect } from "react";
import CountryService from "../services/countries";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [previousName, setPreviousName] = useState("");

  useEffect(() => {
    if (name !== previousName) {
      CountryService.get(name).then((response) => {
        setCountry({
          found: true,
          data: {
            name: response.name.common,
            capital: response.capital,
            population: response.population,
            flag: response.flags.png,
          },
        });
        setPreviousName(name);
      }).catch((error) => {
        setCountry({
            found: false
        })
    });
    }
  }, [name]);

  return country;
};

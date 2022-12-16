export const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const boletoRegex =
    /^([0-9]{5})([0-9]{5})([0-9]{5})([0-9]{6})([0-9]{5})([0-9]{6})([0-9]{1})([0-9]{14})$/;
  const newValue = event.target.value.substring(0, 54).replace(/\D/g, '') || '';

  if (boletoRegex.test(newValue)) {
    event.currentTarget.value = newValue.replace(
      boletoRegex,
      '$1.$2 $3.$4 $5.$6 $7 $8'
    );
  } else {
    event.currentTarget.value = newValue;
  }
};

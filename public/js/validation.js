function validateRegistrationFormInputs(event) {
  let form = event.currentTarget;
  let button = document.getElementById("submit");

  button.disabled = true;

  if (
    !(
      form.firstname.value.length > 0 &&
      form.firstname.value.length <= 100 &&
      form.lastname.value.length > 0 &&
      form.lastname.value.length < 100 &&
      form.login.value.length > 0 &&
      form.login.value.length <= 25 &&
      form.password.value.length > 0 &&
      form.password.value.length < 100
    )
  ) {
    return;
  } else {
    button.disabled = false;
  }
}

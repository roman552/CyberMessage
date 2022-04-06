function NextStep(event) {
  let form = event.currentTarget;
  let steps = document.getElementsByClassName("step");
  let btn = document.getElementById("submit");

  btn.disabled = true;

  if (steps[1].classList.contains("green")) {
    if (
      form.firstname.value.length > 0 &&
      form.firstname.value.length <= 100 &&
      form.lastname.value.length > 0 &&
      form.lastname.value.length <= 100 &&
      form.login.value.length > 0 &&
      form.login.value.length <= 25 &&
      form.password.value.length > 0 &&
      form.password.value.length <= 100
    ) {
      btn.disabled = false;
    }
  }

  if (steps[1].classList.contains("green") === false) {
    if (
      form.firstname.value.length > 0 &&
      form.firstname.value.length <= 100 &&
      form.lastname.value.length > 0 &&
      form.lastname.value.length <= 100
    ) {
      btn.disabled = false;
      btn.onclick = () => NextStepBtnClick();
    }
  }
}

function NextStepBtnClick() {
  let stepInputs = document.querySelectorAll(".step-inputs > div");
  let steps = document.getElementsByClassName("step");
  let btn = document.getElementById("submit");

  if (!steps[1].classList.contains("green")) {
    steps[1].classList.add("green");
    btn.innerHTML = "<h2>create account</h2>";
    btn.type = "submit";
    btn.onclick = () => {
      steps[2].classList.add("green");
    };
  }

  stepInputs[0].style.animationName = "nextStepForm";
  stepInputs[0].style.animationDuration = ".9s";
  stepInputs[0].style.animationTimingFunction = "ease-out";
  stepInputs[0].style.animationFillMode = "forwards";

  setTimeout(() => {
    stepInputs[0].style.display = "none";
    stepInputs[1].style.display = "flex";
  }, 500);

  btn.disabled = true;
}

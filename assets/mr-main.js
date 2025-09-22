//FAQs
const questions = document.querySelectorAll(".question");

questions.forEach(function (question) {
  const btnsQuestion = question.querySelector(".question-btn");
  // console.log(btn);

  btnsQuestion.addEventListener("click", function () {
    // console.log(question);

    // if click on different items then the previous item show text "show-text" remove
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });
    question.classList.toggle("show-text");
  });
});

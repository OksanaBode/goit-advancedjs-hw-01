const feedbackForm = document.querySelector('.feedback-form');
let formData = {};

checkInputStart();

feedbackForm.addEventListener('input', fieldUserInfo);
feedbackForm.addEventListener('submit', sendUserInfo);

function fieldUserInfo() {
  formData = {
    email: feedbackForm.elements.email.value.trim(),
    message: feedbackForm.elements.message.value.trim(),
  };

  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function sendUserInfo(event) {
  event.preventDefault();

  const email = feedbackForm.elements.email.value.trim();
  const message = feedbackForm.elements.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  const userInfo = { email, message };
  console.log(userInfo);

  feedbackForm.reset();
  formData = {};

  try {
    localStorage.removeItem('feedback-form-state');
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

function checkInputStart() {
  try {
    const localInfo = JSON.parse(localStorage.getItem("feedback-form-state")) ?? {};
    formData = localInfo;
    feedbackForm.elements.email.value = localInfo.email || '';
    feedbackForm.elements.message.value = localInfo.message || '';
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
}

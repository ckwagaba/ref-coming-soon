/**
 * run script when page content has loaded
 * to avoid calling elements that haven't been loaded into the DOM yet
 */
window.onload = function() {
  /**
   * clicking the submit button
   */
  $("submit-button").addEventListener("click", function(event) {
    event.preventDefault();

    /** spinner widget */
    const spinner = _$("div");
    spinner.classList.add("spinner");
    // button label is spinner
    this.innerHTML = spinner.outerHTML;

    /** get data values */
    const email = $("email").value;

    emailExists(email, function(res) {
      // email not duplicate
      if (!res) {
        /** validate and send data */
        if (isValid(email)) {
          const data = {
            formData: {
              email
            }
          };

          // send data
          ajaxRequest("POST", "./save-customer", data, function(res) {
            if (res == 1) {
              // success
              $("form-feedback").classList.add("success");
              $("form-feedback").innerHTML =
                "Congratulations! You are now our loyal VIP customer.";
              resetFeedbackText();
            } else {
              $("form-feedback").classList.add("failure");
              $("form-feedback").innerHTML =
                "Something went wrong. Please try again.";
              resetFeedbackText();
            }
          });
        } else {
          // validation failure
          $("form-feedback").classList.add("failure");
          $("form-feedback").innerHTML = "Please provide the required details.";
          resetFeedbackText();
        }
      } else {
        $("form-feedback").classList.add("failure");
        $("form-feedback").innerHTML = "Looks like you're subscribed already!";
        resetFeedbackText();
      }
    });
  });
};

/**
 * helper functions
 */

function $(id) {
  return document.getElementById(id);
}

function _(className) {
  return document.getElementsByClassName(className);
}

function _$(tagName) {
  return document.createElement(tagName);
}

/**
 * validate data
 * @param {string} data
 */
function isValid(data) {
  if (Number(data) !== 0) {
    // type casting: non-numeric or greater than 0
    return true;
  } else {
    // the default option - 0
    return false;
  }
}

/**
 * check for duplicate email address
 * @param {string} email
 * @returns {boolean}
 */
function emailExists(email, callback) {
  ajaxRequest("POST", "./get-email", { email }, function(res) {
    if (res == 1) {
      // duplicate
      callback(true);
    } else {
      // not duplicate
      callback(false);
    }
  });
}

/**
 * AJAX Request
 * @function
 * @param {string} type - request type: GET or POST
 * @param {string} url - endpoint to handle request
 * @param {string} data - data sent to server
 * @param {function} onSuccess - callback to handle successful request
 */
function ajaxRequest(type, url, data, onSuccess) {
  const xhr = new XMLHttpRequest();
  xhr.open(type, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      onSuccess(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

/**
 * reset feedback text
 */
function resetFeedbackText() {
  setTimeout(function() {
    $("form-feedback").classList.remove("failure");
    $("form-feedback").innerHTML = "&nbsp;";
    $("submit-button").innerHTML = "submit";
  }, 2000);
}

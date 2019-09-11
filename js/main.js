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

    /** validate and send data */
    if (validateEmail(email)) {
      /** check for duplicate email */
      emailExists(email, function(res) {
        if (!res) {
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
          $("form-feedback").classList.add("failure");
          $("form-feedback").innerHTML =
            "Looks like you're subscribed already!";
          resetFeedbackText();
        }
      });
    } else {
      // validation failure
      $("form-feedback").classList.add("failure");
      $("form-feedback").innerHTML = "Please provide a valid email address.";
      resetFeedbackText();
    }
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
 * validate email
 * @param {string} email
 */
function validateEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
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

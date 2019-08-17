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

    /** get data values */
    var firstName = $("first-name").value;
    var lastName = $("last-name").value;
    var email = $("email").value;
    var phone = $("phone").value;
    var dateOfBirth = $("dob").value;
    var country = $("country").value;

    /** validate and send data */
    if (
      isValid(firstName) &&
      isValid(lastName) &&
      isValid(email) &&
      isValid(phone) &&
      isValid(dateOfBirth) &&
      isValid(country)
    ) {
      var data = {
        formData: {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          country
        }
      };

      console.log(data);

      /** spinner widget */
      var spinner = _$("div");
      spinner.classList.add("spinner");

      // button label is spinner
      this.innerHTML = spinner.outerHTML;

      // send data
      ajaxRequest("POST", "./save-customer", data, function() {
        $("form-feedback").classList.add("success");
        $("form-feedback").innerHTML = "Customer successfully added.";

        // allow user to read message
        setTimeout(function() {
          // refresh
          window.location.href = "./";
        }, 1000);
      });
    } else {
      // validation failure
      $("form-feedback").classList.add("failure");
      $("form-feedback").innerHTML = "Please provide all the details.";

      // reset message field
      setTimeout(function() {
        $("form-feedback").classList.remove("failure");
        $("form-feedback").innerHTML = "&nbsp;";
      }, 2000);
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
 * AJAX Request
 * @function
 * @param {string} type - request type: GET or POST
 * @param {string} url - endpoint to handle request
 * @param {string} data - data sent to server
 * @param {function} onSuccess - callback to handle successful request
 */
function ajaxRequest(type, url, data, onSuccess) {
  var xhr = new XMLHttpRequest();
  xhr.open(type, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      onSuccess(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

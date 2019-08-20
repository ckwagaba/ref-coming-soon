/**
 * run script when page content has loaded
 * to avoid calling elements that haven't been loaded into the DOM yet
 */
window.onload = function() {
  // code for homepage - my way of namespacing
  if ($("home-page")) {
    /** months list */
    var monthsList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    for (var i of monthsList) {
      // create list item
      var listItem = _$("option");

      // give it a class
      listItem.classList.add("md-select-component-item");

      // update value
      listItem.value = i;
      listItem.innerHTML = i;

      // add item to list
      $("md-select-component-month").appendChild(listItem);
    }

    /**
     * clicking the month
     * change number of days in month
     */
    $("md-select-month")
      .querySelector("select")
      .addEventListener("change", function() {
        // set days of months
        switch (this.value) {
          case "January":
            setMaxDays(31);
            break;

          case "February":
            setMaxDays(29);
            break;

          case "March":
            setMaxDays(31);
            break;

          case "April":
            setMaxDays(30);
            break;

          case "May":
            setMaxDays(31);
            break;

          case "June":
            setMaxDays(30);
            break;

          case "July":
            setMaxDays(31);
            break;

          case "August":
            setMaxDays(31);
            break;

          case "September":
            setMaxDays(30);
            break;

          case "October":
            setMaxDays(31);
            break;

          case "November":
            setMaxDays(30);
            break;

          case "December":
            setMaxDays(31);
            break;
        }
      });

    /**
     * set max days in month
     * @function
     * @param {number} numberOfDays
     */
    function setMaxDays(numberOfDays) {
      // reset options
      var daySelectComponent = $("md-select-day").querySelector("select");

      for (var i = 0; i < numberOfDays; i++) {
        var option = _$("option");
        option.classList.add("md-select-component-item");
        option.value = i + 1;
        option.innerHTML = i + 1;

        daySelectComponent.appendChild(option);
      }
    }

    /**
     * clicking the country
     * update phone field with dial code
     */
    $("md-select-country")
      .querySelector("select")
      .addEventListener("change", function() {
        $("phone").value = this.options[this.selectedIndex].getAttribute(
          "data-dial-code"
        );
      });

    /**
     * clicking the submit button
     */
    $("submit-button").addEventListener("click", function(event) {
      event.preventDefault();

      const submitButton = this;

      /** get data values */
      var firstName = $("first-name").value;
      var lastName = $("last-name").value;
      var email = $("email").value;
      var phone = $("phone").value;
      var month = $("md-select-month").querySelector("select").value;
      var day = $("md-select-day").querySelector("select").value;
      var dateOfBirth = month + " - " + day;
      var country = $("md-select-country").querySelector("select").value;

      /** validate and send data */
      if (
        isValid(firstName) &&
        isValid(lastName) &&
        isValid(email) &&
        isValid(phone) &&
        isValid(month) &&
        isValid(day) &&
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

        /** spinner widget */
        var spinner = _$("div");
        spinner.classList.add("spinner");

        // button label is spinner
        submitButton.innerHTML = spinner.outerHTML;

        // send data
        ajaxRequest("POST", "./save-customer", data, function(res) {
          if (res == 1) {
            // success
            $("form-feedback").classList.add("success");
            $("form-feedback").innerHTML = "Customer successfully added.";

            // allow user to read message
            setTimeout(function() {
              // refresh
              window.location.href = "./";
            }, 1000);
          } else {
            $("form-feedback").classList.add("failure");
            $("form-feedback").innerHTML =
              "Something went wrong. Please try again.";

            // reset message field
            setTimeout(function() {
              $("form-feedback").classList.remove("failure");
              $("form-feedback").innerHTML = "&nbsp;";
              // reset button label
              submitButton.innerHTML = "submit";
            }, 2000);
          }
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
  }
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

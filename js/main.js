/**
 * run script when page content has loaded
 * to avoid calling elements that haven't been loaded into the DOM yet
 */
window.onload = function() {
  // code for homepage - my way of namespacing
  if ($("home-page")) {
    /** months list */
    const monthsList = [
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

    for (const i of monthsList) {
      // create list item
      const listItem = _$("option");

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
      const daySelectComponent = $("md-select-day").querySelector("select");

      for (let i = 0; i < numberOfDays; i++) {
        const option = _$("option");
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
        $("phone").value =
          this.options[this.selectedIndex].getAttribute("data-dial-code") + " ";
      });

    /**
     * clicking the newsletter subscription checkboxes
     * toggle visibility of the check mark
     */
    Array.prototype.forEach.call(_("checkbox"), function(
      element,
      index,
      allElements
    ) {
      element.querySelector("input").addEventListener("change", function() {
        if (this.checked) {
          element.classList.add("checked");
        } else {
          element.classList.remove("checked");
        }
      });
    });

    /**
     * clicking the submit button
     */
    $("submit-button").addEventListener("click", function(event) {
      event.preventDefault();

      const submitButton = this;

      /** get data values */
      const firstName = $("first-name").value;
      const lastName = $("last-name").value;
      const email = $("email").value;
      const phone = $("phone").value;
      const month = $("md-select-month").querySelector("select").value;
      const day = $("md-select-day").querySelector("select").value;
      const year = $("md-select-year").querySelector("select").value;
      const dateOfBirth = month + " - " + day + " - " + year;
      const country = $("md-select-country").querySelector("select").value;
      const cafeSubscription = $("cafe-subscription").checked ? 1 : 0;
      const sportsSubscription = $("sports-subscription").checked ? 1 : 0;

      /** validate and send data */
      if (isValid(firstName) && isValid(lastName) && isValid(email)) {
        const data = {
          formData: {
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            country,
            cafeSubscription,
            sportsSubscription
          }
        };

        /** spinner widget */
        const spinner = _$("div");
        spinner.classList.add("spinner");

        // button label is spinner
        submitButton.innerHTML = spinner.outerHTML;

        // send data
        ajaxRequest("POST", "./save-customer", data, function(res) {
          if (res == 1) {
            // success
            $("form-feedback").classList.add("success");
            $("form-feedback").innerHTML =
              "Congratulations! You are now our loyal VIP customer.";

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
        $("form-feedback").innerHTML = "Please provide the required details.";

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

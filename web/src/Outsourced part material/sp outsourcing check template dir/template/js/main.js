// Lib
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function outsideClickHide(queryString, el, className) {
  // Detect all clicks on the document
  document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(queryString)) return;

    // If user clicks outside the element, hide it!
    el.classList.remove(className);
  });
}

function toggleClass(el, className){
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.tripClassname.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.tripClassname = classes.join(' ');
  }
}

ready(function () {
  // Demo slider filters
  document.querySelector('[data-toggle="price-slider"]').addEventListener('input', function() {
    this.setAttribute('value', this.value);
  });

  var timeSliders = document.querySelectorAll('[data-toggle="time-slider"]');
  for (var i = 0; i < timeSliders.length; i++) {
    var timeSlider = timeSliders[i];
    timeSlider.addEventListener('input', function() {
      this.setAttribute('value', this.value);
    });
  };

  // Toggle class on specific elements
  var tripEls = document.querySelectorAll('[data-toggle="trip-favorite"]');

  for (var i = 0; i < tripEls.length; i++) {
    var tripEl = tripEls[i];
    tripEl.addEventListener('click', function (e) {
      e.preventDefault();

      var tripClassname = 'active';
      toggleClass(this, tripClassname);
    });
  }

  // Search elements
  var countriesByAbbreviation = [
    {
      country: "Afghanistan",
      abbreviation: "AF"
    },
    {
      country: "Albania",
      abbreviation: "AL"
    },
    {
      country: "Algeria",
      abbreviation: "DZ"
    },
    {
      country: "American Samoa",
      abbreviation: "AS"
    },
    {
      country: "Andorra",
      abbreviation: "AD"
    },
    {
      country: "Angola",
      abbreviation: "AO"
    },
    {
      country: "Anguilla",
      abbreviation: "AI"
    },
    {
      country: "Antarctica",
      abbreviation: "AQ"
    },
    {
      country: "Antigua and Barbuda",
      abbreviation: "AG"
    },
    {
      country: "Argentina",
      abbreviation: "AR"
    },
    {
      country: "Armenia",
      abbreviation: "AM"
    },
    {
      country: "Aruba",
      abbreviation: "AW"
    },
    {
      country: "Australia",
      abbreviation: "AU"
    },
    {
      country: "Austria",
      abbreviation: "AT"
    },
    {
      country: "Azerbaijan",
      abbreviation: "AZ"
    },
    {
      country: "Bahamas",
      abbreviation: "BS"
    },
    {
      country: "Bahrain",
      abbreviation: "BH"
    },
    {
      country: "Bangladesh",
      abbreviation: "BD"
    },
    {
      country: "Barbados",
      abbreviation: "BB"
    },
    {
      country: "Belarus",
      abbreviation: "BY"
    },
    {
      country: "Belgium",
      abbreviation: "BE"
    },
    {
      country: "Belize",
      abbreviation: "BZ"
    },
    {
      country: "Benin",
      abbreviation: "BJ"
    },
    {
      country: "Bermuda",
      abbreviation: "BM"
    },
    {
      country: "Bhutan",
      abbreviation: "BT"
    },
    {
      country: "Bolivia",
      abbreviation: "BO"
    },
    {
      country: "Bosnia and Herzegovina",
      abbreviation: "BA"
    },
    {
      country: "Botswana",
      abbreviation: "BW"
    },
    {
      country: "Bouvet Island",
      abbreviation: "BV"
    },
    {
      country: "Brazil",
      abbreviation: "BR"
    },
    {
      country: "British Indian Ocean Territory",
      abbreviation: "IO"
    },
    {
      country: "Brunei",
      abbreviation: "BN"
    },
    {
      country: "Bulgaria",
      abbreviation: "BG"
    },
    {
      country: "Burkina Faso",
      abbreviation: "BF"
    },
    {
      country: "Burundi",
      abbreviation: "BI"
    },
    {
      country: "Cambodia",
      abbreviation: "KH"
    },
    {
      country: "Cameroon",
      abbreviation: "CM"
    },
    {
      country: "Canada",
      abbreviation: "CA"
    },
    {
      country: "Cape Verde",
      abbreviation: "CV"
    },
    {
      country: "Cayman Islands",
      abbreviation: "KY"
    },
    {
      country: "Central African Republic",
      abbreviation: "CF"
    },
    {
      country: "Chad",
      abbreviation: "TD"
    },
    {
      country: "Chile",
      abbreviation: "CL"
    },
    {
      country: "China",
      abbreviation: "CN"
    },
    {
      country: "Christmas Island",
      abbreviation: "CX"
    },
    {
      country: "Cocos (Keeling) Islands",
      abbreviation: "CC"
    },
    {
      country: "Colombia",
      abbreviation: "CO"
    },
    {
      country: "Comoros",
      abbreviation: "KM"
    },
    {
      country: "Congo",
      abbreviation: "CG"
    },
    {
      country: "Cook Islands",
      abbreviation: "CK"
    },
    {
      country: "Costa Rica",
      abbreviation: "CR"
    },
    {
      country: "Croatia",
      abbreviation: "HR"
    },
    {
      country: "Cuba",
      abbreviation: "CU"
    },
    {
      country: "Cyprus",
      abbreviation: "CY"
    },
    {
      country: "Czech Republic",
      abbreviation: "CZ"
    },
    {
      country: "Denmark",
      abbreviation: "DK"
    },
    {
      country: "Djibouti",
      abbreviation: "DJ"
    },
    {
      country: "Dominica",
      abbreviation: "DM"
    },
    {
      country: "Dominican Republic",
      abbreviation: "DO"
    },
    {
      country: "East Timor",
      abbreviation: "TP"
    },
    {
      country: "Ecuador",
      abbreviation: "EC"
    },
    {
      country: "Egypt",
      abbreviation: "EG"
    }
  ];
  var demoInputs = document.querySelectorAll('[data-toggle="autocomplete-input"]'), i;
  var inputActiveClassName = 'is-focused';

  // Calendar
  flatpickr("[data-toggle=\"autocomplete-calendar\"] input", {
    'dateFormat': 'd-m-Y',
    onOpen:function () {
      this.input.parentNode.parentNode.classList.add(inputActiveClassName)
    },
    onClose: function(){
      this.input.parentNode.parentNode.classList.remove(inputActiveClassName)
    }
  });

  function generateList(data){
    var list = document.createElement('ul');
    list.setAttribute("class", "menu has-scrollbar");
    list.setAttribute("data-simplebar", "");
    for (var i = 0; i < data.length; i++) {
      var item = document.createElement('li');
      item.setAttribute('class', 'menu-item');
      var link = document.createElement('a');
      link.setAttribute('href', '#autocomplete');
      link.setAttribute('data-value', data[i].country);

      // This not Recommended, need properly generate list/bind stuff (will be converted to react code?)
      link.innerHTML =
        '                      <div class="tile tile-centered">\n' +
        '                        <div class="tile-icon"><svg class="icon icon-globe"><use xlink:href="icomoon/symbol-defs.svg#icon-globe"></use></svg>\n' +
        '                        </div>\n' +
        '                        <div class="tile-content">\n' +
        data[i].abbreviation +
        ': ' + data[i].country + // use <mark> if needed
        '                        </div>\n' +
        '                      </div>';


      link.addEventListener('click', function() {
        list.parentNode.querySelector('input').value = this.dataset.value;
      }, false);

      item.appendChild(link);
      list.appendChild(item);
    }

    return list;
  }

  for (i = 0; i < demoInputs.length; ++i) {
    var input = demoInputs[i].querySelector('input');
    demoInputs[i].parentNode.appendChild(generateList(countriesByAbbreviation));

    input.addEventListener('focus', function () {
      var parent = this.parentNode.parentNode;
      parent.classList.add(inputActiveClassName);
    });

    input.addEventListener('blur', function (e) {
      var parent = this.parentNode.parentNode;

      // Delay to allow click to execute
      setTimeout(function () {
        if (e.type == 'blur') {
          // Do stuff here
          parent.classList.remove(inputActiveClassName);
        }
      }, 250);
    });
  }

  var classInputParent = document.querySelector('[data-toggle="autocomplete-class"]');
  var classInput = classInputParent.querySelector('input');

  classInput.addEventListener('click', function () {
    classInputParent.classList.add(inputActiveClassName);
  });

  // Outside clicking elements hide
  outsideClickHide('[data-toggle="autocomplete-class-wrapper"]', classInputParent, inputActiveClassName);

  // window.addEventListener('click', function(e){
  //   if (classInputParent.parentNode.contains(e.target)){
  //     // Clicked in box
  //   } else{
  //     classInputParent.classList.remove(inputActiveClassName);
  //   }
  // });

  // document.onkeydown = function(evt) {
  //   evt = evt || window.event;
  //   var isEscape = false;
  //   if ("key" in evt) {
  //     isEscape = (evt.key == "Escape" || evt.key == "Esc");
  //   } else {
  //     isEscape = (evt.keyCode == 27);
  //   }
  //   if (isEscape) {
  //     classInputParent.classList.remove(inputActiveClassName);
  //   }
  // };

});

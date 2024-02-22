$(document).ready(function(){
  $("#cu-web-types").hide(); // Initially hide the website types
  $("#cu-filter-dropdown").click(function(){
      $("#cu-web-types").slideToggle(); // Show/hide the website types on click
  });
});

// Get the close icon image and initially hide it
var closeIconImg = document.querySelector('.cu-close-icon img');
closeIconImg.style.visibility = 'hidden';

// Function to perform the search
function performSearch() {
    var searchVal = document.getElementById('cu-projectSearch').value.toLowerCase();
    var projects = document.getElementsByClassName('cu-project-container');

    for (var i = 0; i < projects.length; i++) {
        var projectName = projects[i].getElementsByTagName('p')[0].innerText.toLowerCase();

        if (projectName.includes(searchVal)) {
            projects[i].style.display = '';
        } else {
            projects[i].style.display = 'none';
        }
    }
}

// Function to clear the search
function clearSearch() {
    document.getElementById('cu-projectSearch').value = '';
    var projects = document.getElementsByClassName('cu-project-container');

    for (var i = 0; i < projects.length; i++) {
        projects[i].style.display = '';
    }

    closeIconImg.style.visibility = 'hidden';
}

// Attach event listener to the search icon
document.querySelector('.cu-search-icon').addEventListener('click', performSearch);

// Attach event listener to the search input field
var searchInput = document.getElementById('cu-projectSearch');
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }

    if (searchInput.value.length > 0) {
        closeIconImg.style.visibility = '';
    } else {
        closeIconImg.style.visibility = 'hidden';
    }
});

// Attach event listener to the close icon
document.querySelector('.cu-close-icon').addEventListener('click', clearSearch);

var selectedTypes = new Set();

document.querySelectorAll('.cu-tickbox').forEach(function(tickbox) {
  tickbox.addEventListener('click', function() {
    var projectType = this.querySelector('p').textContent.replace(' (Campaigns)', '').replace(' Website', '');

    if (selectedTypes.has(projectType)) {
      selectedTypes.delete(projectType);
    } else {
      selectedTypes.add(projectType);
    }

    // Show or hide projects
    document.querySelectorAll('.cu-project-container').forEach(function(project) {
      if (selectedTypes.size === 0 || selectedTypes.has(project.querySelector('.cu-project-type').textContent.trim())) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });

    var img = this.querySelector('.tickbox-image img');
    if (img.src.endsWith('cu-tickbox.png')) {
      img.src = 'images/cu-tickbox-active.png';
    } else {
      img.src = 'images/cu-tickbox.png';
    }
  });
});

document.querySelector('#cu-filter-dropdown').addEventListener('click', function() {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
  } else {
    this.classList.add('active');
  }
});



// Get all the cu-link-btn elements
var cuLinkBtns = document.querySelectorAll('[id^="cu-link-btn-"]');

cuLinkBtns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    event.preventDefault();

    // Get the corresponding cu-link element
    var idNum = this.id.split('-')[3];
    var url = document.querySelector('#cu-link-' + idNum).innerText;

    var tempInput = document.createElement('input');
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show the alert modal
    $('#alert-modal').modal('show');

    // Hide the alert modal after 3 seconds
    setTimeout(function() {
      $('#alert-modal').modal('hide');
    }, 3000);
  });
});

document.querySelector('#close-button').addEventListener('click', function() {
  // Your custom function here
  $('#alert-modal').modal('hide');
});







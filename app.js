// calling nodes from html
const search_form = document.getElementById('search_form');
const users_list = document.getElementById('users_list');
const user_detail = document.getElementById('user_detail');
const user_login = document.getElementById('user_login');
const user_name = document.getElementById('user_name');
const user_avatar = document.getElementById('user_avatar_url');
const user_github = document.getElementById('user_github_html_url');
const user_address = document.getElementById('user_address');
const search_bar = document.getElementById('search_bar');
const search_button = document.getElementById('search_button');
const error_message = document.getElementById('error_message');
const user_public_repos = document.getElementById('user_public_repos');
const api_calling = document.getElementById('api_calling');


// function to remove the value of search bar on page load
window.addEventListener('load', () => {
  search_bar.value = '';
});

user_detail.style.display = 'none';
error_message.style.display = 'none';


// fetching the limit of the pull request from github api
axios.get('https://api.github.com/rate_limit')
  .then(response => {
    const rateLimitData = response.data;
    const remainingRequests = rateLimitData.rate.remaining;
    const limit = rateLimitData.rate.limit;

    api_calling.innerHTML = `API calls remaining on <i class="fa-brands fa-github fa-xl"></i>:<br><b>${remainingRequests} of ${limit}</b>`;
  })
  .catch(error => {
    console.error('Error fetching rate limit:', error);
  });

// base url for github api
const base_url = 'https://api.github.com/users';

// search the user based in the input in search bar
function searchUser() {
  const search_value = search_bar.value;
  if (search_value.trim() !== '') {
    axios.get(`${base_url}/${search_value}`)
      .then(response => {
        const user = response.data;
        user_detail.style.display = 'flex';
        user_login.textContent = user.login;
        user_name.textContent = user.name === null ? "User name not set." : user.name;
        user_avatar.src = user.avatar_url;
        user_avatar.alt = user.name;
        user_github.href = user.html_url;
        user_github.textContent = user.html_url;
        user_public_repos.textContent = user.public_repos;
        user_address.textContent = user.location === null ? "User location not set." : user.location;

      })
      .catch(function (error) {
        user_detail.style.display = 'none';
        console.log("Error while fetching.\n", error);
        pop_error()
        error_message.innerHTML = "Please enter a valid username or user does not exist. " + error;
      })
  }
  else {
    pop_error()
    user_detail.style.display = 'none';
    error_message.innerHTML = "Please enter username";
  }
}

// popup of error message and it closes after 3 seconds with a timeout counter
function pop_error() {
  error_message.style.display = 'flex';
  setTimeout(function () {
    error_message.style.display = 'none';
  }, 3000);
}


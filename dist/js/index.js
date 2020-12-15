document.querySelector('#pills-home-tab').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.message').classList.add('d-none')
  document.querySelector('.profile').classList.remove('d-block')
  document.querySelector('.contacts').classList.add('d-block')
  if (document.querySelector('.contacts').classList.contains('d-block')) {
    document.querySelector('.contacts').classList.remove('d-block')
  }
  if (document.querySelector('.contacts').classList.contains('d-none')) {
    document.querySelector('.contacts').classList.remove('d-none')
  }
  });

document.querySelector('#pills-profile-tab').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.contacts').classList.add('d-none')
  document.querySelector('.message').classList.add('d-block')
  document.querySelector('.profile').classList.remove('d-block')
  if (document.querySelector('.message').classList.contains('d-block')) {
    document.querySelector('.message').classList.remove('d-block')
  }
  if (document.querySelector('.message').classList.contains('d-none')) {
    document.querySelector('.message').classList.remove('d-none')
  }
}); 

document.querySelector('#pills-contact-tab').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.contacts').classList.add('d-none')
  document.querySelector('.message').classList.add('d-none')
  document.querySelector('.profile').classList.add('d-block')});
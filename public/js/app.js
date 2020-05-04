'use strict'


$('#show-update-form').click(function(){
  $('#update-form').toggle();
  $('#show-update-form').toggle();
  $('#delete-button').toggle();
});

$('#delete-button').click(function(){
  alert('Your book has been deleted!')
})
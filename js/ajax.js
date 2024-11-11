
function dm_tw_preview() {
    const block = document.getElementById('style-block-id');
    const blockID = block.getAttribute("data-block-id");
    let colourValues = document.querySelectorAll('.colour-picker');
   
    //alert(blockID);
    let primary = "--primary-colour: " + colourValues[0].value +";";
    let primaryContrast = "--primary-contrast: " + colourValues[1].value +";";
    let secondary = "--secondary-colour: " + colourValues[2].value +";";
    let secondaryContrast = "--secondary-contrast: " + colourValues[3].value +";";
    let accent = "--accent-colour: " + colourValues[4].value +";";
    let light = "--light-colour: " + colourValues[5].value +";";
    let dark = "--dark-colour: " + colourValues[6].value +";";
    let ui = "--ui-colour: " + colourValues[7].value +";";
    // alert(primary + ' ' + secondary + ' ' + accent + ' ' + light);
    const preview = document.getElementById("preview");
    preview.innerText = ':root {' + primary + ' ' + primaryContrast + ' ' + secondary + ' ' + secondaryContrast + ' ' + accent + ' ' + light + ' ' + dark + ' ' + ui + '}';
        
//     saveTheme.removeAttribute('disabled', '');
// //alert(primary + ', ' + secondary);
    var data = {
        'block_id': blockID,
        'field_primary_colour': colourValues[0].value,
        'field_primary_contrast': colourValues[1].value,
        'field_secondary_colour': colourValues[2].value,
        'field_secondary_contrast': colourValues[3].value,
        'field_accent_colour': colourValues[4].value,
        'field_light_colour': colourValues[5].value,
        'field_dark_colour': colourValues[6].value,
        'field_ui_colour': colourValues[7].value
        
    }
    Drupal.customAjaxPost(data);

};

(function ($, Drupal) {
    Drupal.behaviors.customAjaxPost = {
      attach: function () {
        Drupal.customAjaxPost = function (dataToSend) {

          $.ajax({
            url: Drupal.url('callajax'),
            type: 'POST',
            data: JSON.stringify(dataToSend),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
              $("div#palette_message_success").removeClass('hidden');
              $("div#palette_message_success").addClass('inline-block');
              $("div#palette_message_success").html('Colour palette updated <i class="fa-regular fa-circle-check"></i>');
              setTimeout(function() {
                $("div#palette_message_success").removeClass('inline-block');
                $("div#palette_message_success").addClass('hidden');
              }, 2000);
              console.log('Success:', response);
            },
            error: function (error) {
              $("div#palette_message_error").removeClass('hidden');
              $("div#palette_message_error").addClass('inline-block');
              $("div#palette_message_error").html('Error, could not update colour palette <i class="fa-solid fa-xmark"></i>');
              console.error('Error:', error);
            }
          });
        }
      }
    };
  })(jQuery, Drupal);